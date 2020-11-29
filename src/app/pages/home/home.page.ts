import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AlertService } from '../../services/alert/alert.service';
import { ReceiptService } from '../../services/receipt/receipt.service';
import { PrinterService } from '../../services/printer/printer.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { PrintObj, ImageObj, CommandsArray, RasterObj, CutPaperAction } from '@ionic-native/star-prnt/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
defaultPrinter: any;
  constructor(
    public router: Router,
    private storage: StorageService,
    private camera: Camera,
    public alertCtrl: AlertController,
    private printerService: PrinterService,
    private alertService: AlertService,
    private receiptService: ReceiptService
     ) { }

  ngOnInit() {
  }
  async printerTypePopup() {
    const alert = await this.alertCtrl.create({
      header: 'Select Interface',
      inputs: [
        {
          type: 'radio',
          label: 'LAN',
          value: 'LAN',
          name: 'portType',
          checked: true
        },
        {
          type: 'radio',
          label: 'Bluetooth',
          name: 'portType',
          value: 'Bluetooth'
        },
        {
          type: 'radio',
          label: 'USB',
          name: 'portType',
          value: 'USB'
        },
        {
          type: 'radio',
          label: 'All',
          name: 'portType',
          value: 'All'
        }
      ],
      buttons: ['Cancel', {
        text: 'OK',
        handler: portType => {
          this.router.navigate(['/printer-list', {
            portType
          }]);
        }
      }]
    });

    await alert.present();
  }

  async printRawText() {
    if (this.defaultPrinter) {
      const loading = await this.alertService.createLoading('Communicating...');
      await loading.present();

      const printObj: PrintObj = {
        text: 'Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n',
        cutReceipt: true,
        openCashDrawer: false
      };

      this.printerService.printRawText(this.defaultPrinter.portName, this.defaultPrinter.emulation, printObj)
        .then(result => {
          loading.dismiss();
          this.alertService.createAlert('Success!', 'Communication Result: ');
        })
        .catch(error => {
          loading.dismiss();
          this.alertService.createAlert(error);
        });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  async selectPaperSize(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
      header: 'Select Paper Size',
      inputs: [
        { type: 'radio', label: '2" (384dots)', value: '2', checked: true },
        { type: 'radio', label: '3" (576dots)', value: '3' },
        { type: 'radio', label: '4" (832dots)', value: '4' }],
      buttons: [ 'Cancel',
        {
            text: 'OK',
            handler: paperSize => {
              alert.dismiss().then(() => { resolve(paperSize); });
              return false;
            }
          }],
    });
      await alert.present();
    });
  }

 async printRasterReceipt() {
    if (this.defaultPrinter) {
      this.selectPaperSize().then(async paperSize => {
        const rasterObj: RasterObj = this.receiptService.rasterReceiptExample(paperSize);

        const loading = await this.alertService.createLoading('Communicating...');
        loading.present();

        this.printerService.printRasterReceipt(this.defaultPrinter.portName, this.defaultPrinter.emulation, rasterObj)
          .then(result => {
            loading.dismiss();
            this.alertService.createAlert('Success!', 'Communication Result: ');
          })
          .catch(error => {
            loading.dismiss();
            this.alertService.createAlert(error);
          });
      });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  async printImage(uri: string) {
    if (this.defaultPrinter) {
      const loading = await this.alertService.createLoading('Communicating...');
      loading.present();

      const imageObj: ImageObj = {
        uri,
        paperWidth: 576,
        cutReceipt: true,
        openCashDrawer: false
      };

      this.printerService.printImage(this.defaultPrinter.portName, this.defaultPrinter.emulation, imageObj)
        .then(result => {
          loading.dismiss();
          this.alertService.createAlert('Success!', 'Communication Result: ');
        })
        .catch(error => {
          loading.dismiss();
          this.alertService.createAlert(error);
        });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  printFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((uri) => {
      this.printImage(uri);
    }, (err) => {
      this.alertService.createAlert(err, 'Camera Error: ');
    });
  }

  printFromLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((uri) => {
      this.printImage(uri);
    }, (err) => {
      this.alertService.createAlert(err, 'Photo Library Error: ');
    });
  }

   print() {
    if (this.defaultPrinter) {

      this.selectPaperSize().then(async paperSize => {
        const commands: CommandsArray = await this.receiptService.getExampleReceipt(paperSize);

        const loading = await this.alertService.createLoading('Communicating...');
        loading.present();

        this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
          .then(result => {
            loading.dismiss();
            this.alertService.createAlert('Success!', 'Communication Result: ');
          })
          .catch(error => {
            loading.dismiss();
            this.alertService.createAlert(error);
          });
      });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  async printHorizontalTab() {
    if (this.defaultPrinter) {

      // generate Commands for a 3 inches receipt using horizontal tabs
      const commands: CommandsArray = this.receiptService.getExampleReceipt('3', true);

      const loading = await this.alertService.createLoading('Communicating...');
      loading.present();

      this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
        .then(result => {
          loading.dismiss();
          this.alertService.createAlert('Success!', 'Communication Result: ');
        })
        .catch(error => {
          loading.dismiss();
          this.alertService.createAlert(error);
        });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  printQRCode() {
    if (this.defaultPrinter) {

      this.selectPaperSize().then(async paperSize => {
        // generate Commands receipts using QrCodes
        const commands: CommandsArray = this.receiptService.getExampleReceipt(paperSize, false, true);

        const loading = await this.alertService.createLoading('Communicating...');
        loading.present();

        this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
          .then(result => {
            loading.dismiss();
            this.alertService.createAlert('Success!', 'Communication Result: ');
          })
          .catch(error => {
            loading.dismiss();
            this.alertService.createAlert(error);
          });
      });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }

  }

  appendBitmap() {
    if (this.defaultPrinter) {

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };

      this.selectPaperSize().then(paperSize => {
        let imageWidth = 576;
        if (paperSize === '2') { imageWidth = 384; }
        else if (paperSize === '3') { imageWidth = 576; }
        else if (paperSize === '4') { imageWidth = 832; }

        this.camera.getPicture(options).then(async (uri) => {

          const commands: CommandsArray = [];
          commands.push({ appendBitmap: uri, diffusion: true, width: imageWidth, bothScale: true });
          commands.push({ appendCutPaper: CutPaperAction.PartialCutWithFeed });

          const loading = this.alertService.createLoading('Communicating...');
          (await loading).present();

          this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
            .then(async result => {
              (await loading).dismiss();
              this.alertService.createAlert('Success!', 'Communication Result: ');
            }).catch(async error => {
              (await loading).dismiss();
              this.alertService.createAlert(error);
            });
        }).catch(err => {
          this.alertService.createAlert(err);
        });
      });

    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  showStarIOExtManagerPage() {
    this.router.navigate(['ext-manager']);
  }

  async openCashDrawer() {
    if (this.defaultPrinter) {

      const loading = this.alertService.createLoading('Communicating...');
      (await loading).present();

      this.printerService.openCashDrawer(this.defaultPrinter.portName, this.defaultPrinter.emulation)
        .then(async result => {
          (await loading).dismiss();
          this.alertService.createAlert('Success!', 'Communication Result: ');
        })
        .catch(async error => {
          (await loading).dismiss();
          this.alertService.createAlert(error);
        });
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  showPrinterStatus() {
    if (this.defaultPrinter) {
      this.router.navigate(['page-status', {
        portName: this.defaultPrinter.portName,
        emulation: this.defaultPrinter.emulation
      }]);
    } else {
      this.alertService.createAlert('Please select a printer!');
    }
  }

  ionViewDidEnter() {
    this.printerService.getDefaultPrinter()
      .then(printer => {
        console.log(printer);
        this.defaultPrinter = printer;
      });
  }


}
