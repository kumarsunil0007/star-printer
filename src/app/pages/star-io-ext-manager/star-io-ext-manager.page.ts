import { Component, NgZone, OnInit } from '@angular/core'
import { PrinterService } from '../../services/printer/printer.service'
import { ReceiptService } from '../../services/receipt/receipt.service'
import { AlertService } from '../../services/alert/alert.service'
import { PrintObj, ImageObj, RasterObj, CommandsArray, CutPaperAction } from '@ionic-native/star-prnt'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { AlertController, Platform } from '@ionic/angular'
@Component({
  selector: 'app-star-io-ext-manager',
  templateUrl: './star-io-ext-manager.page.html',
  styleUrls: ['./star-io-ext-manager.page.scss'],
})
export class StarIoExtManagerPage implements OnInit {
  defaultPrinter: any
  printerStatusSuscription: any
  status = ''
  paperStatus = ''
  coverStatus = ''
  drawerStatus = ''
  constructor(
    private printerService: PrinterService,
    private alertService: AlertService,
    private zone: NgZone,
    private platform: Platform,
    public alertCtrl: AlertController,
    private camera: Camera,
    private receiptService: ReceiptService
  ) {
    this.printerStatusSuscription = this.printerService.getStatus()
      .subscribe(printerStatus => {
        this.zone.run(() => {
          this.updateStatus(printerStatus.dataType)
        })
      })

    this.platform.pause.subscribe(() => {
      console.log('[INFO] App paused, closing the connection')
      this.disconnect()
    })

    this.platform.resume.subscribe(() => {
      console.log('[INFO] App resumed, re-connecting to the printer')
      this.connect()
    })
  }

  ngOnInit() {
  }

  updateStatus(printerStatus: string) {
    switch (printerStatus) {
      case 'printerOnline':
        this.status = 'Online'
        break

      case 'printerOffline':
        this.status = 'Offline'
        break

      case 'printerImpossible':
        this.status = 'Impossible'
        break

      case 'printerPaperEmpty':
        this.paperStatus = 'Empty'
        break

      case 'printerPaperNearEmpty':
        this.paperStatus = 'Near Empty'
        break

      case 'printerPaperReady':
        this.paperStatus = 'Ready'
        break

      case 'printerCoverOpen':
        this.coverStatus = 'Open'
        break

      case 'printerCoverClose':
        this.coverStatus = 'Closed'
        break

      case 'cashDrawerOpen':
        this.drawerStatus = 'Open'
        break

      case 'cashDrawerClose':
        this.drawerStatus = 'Closed'
        break

      default:
        break
    }
  }

  async connect() {
    console.log('Connect')
    const loading = await this.alertService.createLoading('Communicating...')
    await loading.present()
    const hasBarcodeReader = false
    this.printerService.connect(this.defaultPrinter.portName, this.defaultPrinter.emulation, hasBarcodeReader)
      .subscribe(async (result) => {
        await loading.dismiss()
        console.log(result)
      }, async (error) => {
        await loading.dismiss()
        this.alertService.createAlert(error, 'Communication Error: ')
      })
  }

  async disconnect() {
    console.log('Disconnect')
    const loading = await this.alertService.createLoading('Communicating...')
    await loading.present()
    this.printerService.disconnect()
      .then(async (result) => {
        await loading.dismiss()
        // tslint:disable-next-line:no-unused-expression
        if (this.printerStatusSuscription) { this.printerStatusSuscription.unsuscribe }
        console.log(result)
      })
      .catch(async (error) => {
        await loading.dismiss()
        // tslint:disable-next-line:no-unused-expression
        if (this.printerStatusSuscription) { this.printerStatusSuscription.unsuscribe }
        this.alertService.createAlert(error, 'Communication Error: ')
      })
  }

  async printRawText() {
    const loading = await this.alertService.createLoading('Communicating...')
    loading.present()

    const printObj: PrintObj = {
      text: 'Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n',
      cutReceipt: true,
      openCashDrawer: false
    }
    /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
    this.printerService.printRawText(null, this.defaultPrinter.emulation, printObj)
      .then(result => {
        loading.dismiss()
        this.alertService.createAlert('Success!', 'Communication Result: ')
      })
      .catch(error => {
        loading.dismiss()
        this.alertService.createAlert(error)
      })
  }

  async selectPaperSize(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: 'Select Paper Size',
        inputs: [{ type: 'radio', label: '2" (384dots)', value: '2', checked: true },
        { type: 'radio', label: '3" (576dots)', value: '3' },
        { type: 'radio', label: '4" (832dots)', value: '4' }],
        buttons: ['Cancel',
          {
            text: 'OK',
            handler: paperSize => {
              alert.dismiss().then(() => { resolve(paperSize) })
              return false
            }
          }]
      })
      alert.present()
    })
  }

  printRasterReceipt() {
    this.selectPaperSize().then(async paperSize => {
      const rasterObj: RasterObj = this.receiptService.rasterReceiptExample(paperSize)

      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()

      /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
      this.printerService.printRasterReceipt(null, this.defaultPrinter.emulation, rasterObj)
        .then(result => {
          loading.dismiss()
          this.alertService.createAlert('Success!', 'Communication Result: ')
        })
        .catch(error => {
          loading.dismiss()
          this.alertService.createAlert(error)
        })
    })
  }

  async printImage(uri: string) {
    if (this.defaultPrinter) {
      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()

      const imageObj: ImageObj = {
        uri,
        paperWidth: 576,
        cutReceipt: true,
        openCashDrawer: false
      }

      this.printerService.printImage(null, this.defaultPrinter.emulation, imageObj)
        .then(result => {
          loading.dismiss()
          this.alertService.createAlert('Success!', 'Communication Result: ')
        })
        .catch(error => {
          loading.dismiss()
          this.alertService.createAlert(error)
        })
    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  printFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((uri) => {
      this.printImage(uri)
    }, (err) => {
      this.alertService.createAlert(err, 'Camera Error: ')
    })
  }

  printFromLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((uri) => {
      this.printImage(uri)
    }, (err) => {
      this.alertService.createAlert(err, 'Photo Library Error: ')
    })
  }

  print() {

    this.selectPaperSize().then(async paperSize => {
      const commands: CommandsArray = this.receiptService.getExampleReceipt(paperSize)

      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()

      /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
      this.printerService.print(null, this.defaultPrinter.emulation, commands)
        .then(result => {
          loading.dismiss()
          this.alertService.createAlert('Success!', 'Communication Result: ')
        })
        .catch(error => {
          loading.dismiss()
          this.alertService.createAlert(error)
        })
    })
  }

  async printHorizontalTab() {

    // generate Commands for a 3 inches receipt using horizontal tabs
    const commands: CommandsArray = this.receiptService.getExampleReceipt('3', true)

    const loading = await this.alertService.createLoading('Communicating...')
    loading.present()

    /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
    this.printerService.print(null, this.defaultPrinter.emulation, commands)
      .then(result => {
        loading.dismiss()
        this.alertService.createAlert('Success!', 'Communication Result: ')
      })
      .catch(error => {
        loading.dismiss()
        this.alertService.createAlert(error)
      })
  }

  printQRCode() {

    this.selectPaperSize().then(async paperSize => {
      // generate Commands receipts using QrCodes
      const commands: CommandsArray = this.receiptService.getExampleReceipt(paperSize, false, true)

      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()

      /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
      this.printerService.print(null, this.defaultPrinter.emulation, commands)
        .then(result => {
          loading.dismiss()
          this.alertService.createAlert('Success!', 'Communication Result: ')
        })
        .catch(error => {
          loading.dismiss()
          this.alertService.createAlert(error)
        })
    })
  }

  appendBitmap() {
    if (this.defaultPrinter) {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.selectPaperSize().then(paperSize => {
        let imageWidth = 576
        if (paperSize === '2') { imageWidth = 384 }
        else if (paperSize === '3') { imageWidth = 576 }
        else if (paperSize === '4') { imageWidth = 832 }

        this.camera.getPicture(options).then(async (uri) => {

          const commands: CommandsArray = []
          commands.push({ appendBitmap: uri, diffusion: true, width: imageWidth, bothScale: true })
          commands.push({ appendCutPaper: CutPaperAction.PartialCutWithFeed })

          const loading = await this.alertService.createLoading('Communicating...')
          loading.present()

          /*Send portName null here to use the connected printer through StarIOExtManager instead of creating a new SMPort instance*/
          this.printerService.print(null, this.defaultPrinter.emulation, commands)
            .then(result => {
              loading.dismiss()
              this.alertService.createAlert('Success!', 'Communication Result: ')
            }).catch(error => {
              loading.dismiss()
              this.alertService.createAlert(error)
            })
        }).catch(err => {
          this.alertService.createAlert(err)
        })
      })

    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  async openCashDrawer() {
    if (this.defaultPrinter) {

      const loading = this.alertService.createLoading('Communicating...');
      (await loading).present()

      this.printerService.openCashDrawer(null, this.defaultPrinter.emulation)
        .then(async result => {
          (await loading).dismiss()
          this.alertService.createAlert('Success!', 'Communication Result: ')
        })
        .catch(async error => {
          (await loading).dismiss()
          this.alertService.createAlert(error)
        })
    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  ionViewDidEnter() {
    this.printerService.getDefaultPrinter()
      .then(printer => {
        if (printer) {
          this.defaultPrinter = printer
          this.connect()
        } else {
          this.alertService.createAlert('Please select a printer')
        }
      })
  }

  ionViewWillLeave() {
    this.disconnect()
  }

}
