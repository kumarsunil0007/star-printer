import { Component, OnInit } from '@angular/core'
import { StorageService } from '../../services/storage/storage.service'
import { AlertService } from '../../services/alert/alert.service'
import { ReceiptService } from '../../services/receipt/receipt.service'
import { PrinterService } from '../../services/printer/printer.service'
import { AlertController } from '@ionic/angular'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { Router } from '@angular/router'
import { PrintObj, ImageObj, CommandsArray, RasterObj, CutPaperAction } from '@ionic-native/star-prnt/ngx'
import html2canvas from 'html2canvas'
import { File, IWriteOptions } from '@ionic-native/file/ngx'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  defaultPrinter: any
  printContent: any

  order: any = {
    created_at: {
      seconds: 1610343237,
      nanoseconds: 324000000
    },
    customer: {
      address: '',
      email: 'sunil.betasoft@gmail.com',
      phone: '9812345678',
      name: {
        last: 'Kumar',
        first: 'Sunil'
      }
    },
    total: 255.36,
    type: 'Pickup',
    id: 'ordr_XWw4mNZZ6',
    delivery_charge: 0,
    is_finished: false,
    is_confirmed: true,
    channelId: 'chnl_JwjXSvzmSLXLFf05vqki',
    sub_total: 192,
    restaurantSlug: '7numbersgRSKaGWK5',
    is_doing: true,
    is_paid: true,
    restaurant: {
      id: 'rest_I4cKXnxwiKUrCNeWG6Ue',
      formatted_address: '\n          516 \n          Eglinton Avenue West \n          Toronto Division \n          Ontario \n          M5N 1A5   \n        ',
      phone_number: '(416) 322-5183',
      business_name: '7Numbers'
    },
    tax_total: 24.96,
    delivery_address: '\n          516 \n          Eglinton Avenue West \n          Toronto Division \n          Ontario \n          M5N 1A5   \n        ',
    cart: [
      {
        total: 23,
        description: '',
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        order_selections: [
          {
            max_selections: 0,
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            title: 'Sauce Type',
            required: true,
            min_selections: 0,
            description: '',
            type: '',
            id: 'mod_6VeRKHWnjDKWetzCaDJv',
            selections: [
              {
                price: '',
                name: '',
                label: 'Tomato Sauce'
              },
              {
                label: 'White Sause',
                name: '',
                price: ''
              },
              {
                label: 'No Sauce',
                name: '',
                price: ''
              }
            ],
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            created_at: {
              seconds: 1606844636,
              nanoseconds: 7000000
            }
          },
          {
            selections: [
              {
                price: '',
                label: 'Regular',
                quantity: 1,
                name: ''
              },
              {
                quantity: 0,
                price: '2.00',
                label: 'Glutten Free',
                name: ''
              },
              {
                quantity: 0,
                price: '4.00',
                name: '',
                label: 'Multigrain'
              }
            ],
            id: 'mod_WA53jgu0Y2HqIV4BACmc',
            min_selections: 0,
            description: 'Choose your dough',
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            title: 'Dough Type',
            max_selections: 0,
            created_at: {
              nanoseconds: 7000000,
              seconds: 1606844636
            },
            required: true,
            type: 'radio'
          },
          {
            selections: [
              {
                price: '',
                name: '',
                quantity: 0,
                label: 'Regular Cheese'
              },
              {
                price: '',
                name: '',
                label: 'No Cheese',
                quantity: 0
              },
              {
                price: '2.00',
                name: '',
                quantity: 1,
                label: 'REALLY Cheesy'
              }
            ],
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            min_selections: 0,
            type: 'radio',
            title: 'Cheese Preferences',
            id: 'mod_lEoDT6r0zZ36ijcdErEN',
            created_at: {
              seconds: 1606844636,
              nanoseconds: 7000000
            },
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            required: false,
            max_selections: 0,
            description: ''
          }
        ],
        quantity: 1,
        updated_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        title: 'New Item',
        display_title: 'New Item',
        id: 'itm_uGYtN26J9HdRTD7yjJAg',
        display_description: '',
        updated_at: {
          nanoseconds: 504000000,
          seconds: 1604656137
        },
        type: 'item',
        price: [
          {
            id: 'prc_ViiKppJuFJHnBTTrXgqE',
            price: '23.00',
            label: ''
          }
        ],
        images: [
          {
            image_path: 'restaurants/rest_I4cKXnxwiKUrCNeWG6Ue/Mediterranean-Chopped-Salad_1607781037073',
            image_name: 'Mediterranean-Chopped-Salad_1607781037073'
          }
        ],
        isDetailed: true,
        created_at: {
          seconds: 1604656135,
          nanoseconds: 117000000
        },
        tags: []
      },
      {
        created_at: {
          nanoseconds: 117000000,
          seconds: 1604656135
        },
        display_description: '',
        price: [
          {
            label: '',
            price: '23.00',
            id: 'prc_ViiKppJuFJHnBTTrXgqE'
          }
        ],
        updated_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        isDetailed: true,
        display_title: 'New Item',
        description: '',
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        title: 'New Item',
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        quantity: 2,
        tags: [],
        images: [
          {
            image_name: 'Mediterranean-Chopped-Salad_1607781037073',
            image_path: 'restaurants/rest_I4cKXnxwiKUrCNeWG6Ue/Mediterranean-Chopped-Salad_1607781037073'
          }
        ],
        total: 23,
        order_selections: [
          {
            id: 'mod_6VeRKHWnjDKWetzCaDJv',
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            min_selections: 0,
            max_selections: 0,
            selections: [
              {
                label: 'Tomato Sauce',
                name: '',
                price: ''
              },
              {
                label: 'White Sause',
                name: '',
                price: ''
              },
              {
                price: '',
                name: '',
                label: 'No Sauce'
              }
            ],
            description: '',
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            created_at: {
              seconds: 1606844636,
              nanoseconds: 7000000
            },
            required: true,
            title: 'Sauce Type',
            type: ''
          },
          {
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            created_at: {
              nanoseconds: 7000000,
              seconds: 1606844636
            },
            required: true,
            min_selections: 0,
            description: 'Choose your dough',
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            id: 'mod_WA53jgu0Y2HqIV4BACmc',
            max_selections: 0,
            selections: [
              {
                label: 'Regular',
                quantity: 0,
                name: '',
                price: ''
              },
              {
                name: '',
                label: 'Glutten Free',
                quantity: 1,
                price: '2.00'
              },
              {
                quantity: 0,
                name: '',
                label: 'Multigrain',
                price: '4.00'
              }
            ],
            title: 'Dough Type',
            type: 'radio'
          },
          {
            id: 'mod_lEoDT6r0zZ36ijcdErEN',
            description: '',
            max_selections: 0,
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            required: false,
            type: 'radio',
            title: 'Cheese Preferences',
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            min_selections: 0,
            selections: [
              {
                label: 'Regular Cheese',
                quantity: 0,
                name: '',
                price: ''
              },
              {
                label: 'No Cheese',
                quantity: 0,
                price: '',
                name: ''
              },
              {
                label: 'REALLY Cheesy',
                name: '',
                quantity: 1,
                price: '2.00'
              }
            ],
            created_at: {
              nanoseconds: 7000000,
              seconds: 1606844636
            }
          }
        ],
        updated_at: {
          seconds: 1604656137,
          nanoseconds: 504000000
        },
        id: 'itm_uGYtN26J9HdRTD7yjJAg',
        type: 'item'
      },
      {
        description: '',
        created_at: {
          seconds: 1604656135,
          nanoseconds: 117000000
        },
        updated_at: {
          nanoseconds: 504000000,
          seconds: 1604656137
        },
        isDetailed: true,
        images: [
          {
            image_path: 'restaurants/rest_I4cKXnxwiKUrCNeWG6Ue/Mediterranean-Chopped-Salad_1607781037073',
            image_name: 'Mediterranean-Chopped-Salad_1607781037073'
          }
        ],
        tags: [],
        type: 'item',
        order_selections: [
          {
            description: '',
            required: true,
            selections: [
              {
                price: '',
                label: 'Tomato Sauce',
                name: ''
              },
              {
                name: '',
                label: 'White Sause',
                price: ''
              },
              {
                label: 'No Sauce',
                price: '',
                name: ''
              }
            ],
            max_selections: 0,
            id: 'mod_6VeRKHWnjDKWetzCaDJv',
            created_at: {
              seconds: 1606844636,
              nanoseconds: 7000000
            },
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            min_selections: 0,
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            title: 'Sauce Type',
            type: ''
          },
          {
            selections: [
              {
                price: '',
                name: '',
                quantity: 1,
                label: 'Regular'
              },
              {
                price: '2.00',
                name: '',
                label: 'Glutten Free',
                quantity: 0
              },
              {
                label: 'Multigrain',
                quantity: 0,
                name: '',
                price: '4.00'
              }
            ],
            required: true,
            min_selections: 0,
            id: 'mod_WA53jgu0Y2HqIV4BACmc',
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            type: 'radio',
            title: 'Dough Type',
            description: 'Choose your dough',
            created_at: {
              nanoseconds: 7000000,
              seconds: 1606844636
            },
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
            max_selections: 0
          },
          {
            id: 'mod_lEoDT6r0zZ36ijcdErEN',
            selections: [
              {
                price: '',
                name: '',
                quantity: 1,
                label: 'Regular Cheese'
              },
              {
                quantity: 0,
                label: 'No Cheese',
                name: '',
                price: ''
              },
              {
                label: 'REALLY Cheesy',
                name: '',
                quantity: 0,
                price: '2.00'
              }
            ],
            required: false,
            group_id: 'modgrp_xocpvWnqDWlFUVkH8WXU',
            max_selections: 0,
            created_at: {
              seconds: 1606844636,
              nanoseconds: 7000000
            },
            min_selections: 0,
            type: 'radio',
            title: 'Cheese Preferences',
            description: '',
            created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02'
          }
        ],
        updated_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        quantity: 1,
        price: [
          {
            label: '',
            price: '23.00',
            id: 'prc_ViiKppJuFJHnBTTrXgqE'
          }
        ],
        title: 'New Item',
        id: 'itm_uGYtN26J9HdRTD7yjJAg',
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        total: 23,
        display_description: '',
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        display_title: 'New Item'
      },
      {
        created_at: {
          nanoseconds: 670000000,
          seconds: 1607541402
        },
        display_description: 'This is a dish',
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        isDetailed: true,
        total: 23,
        quantity: 1,
        order_selections: [
          {
            type: 'checkbox',
            description: 'Select the wonderful cheese you\'d like to see on the dish',
            max_selections: '3',
            min_selections: '2',
            required: false,
            title: 'Choose your cheese',
            selections: [
              {
                quantity: 1,
                label: 'Good Cheese',
                price: '',
                name: ''
              },
              {
                label: 'Stinky Cheese',
                quantity: 1,
                name: '',
                price: ''
              },
              {
                price: '2.00',
                name: '',
                label: 'Brave Cheese (really bad)'
              }
            ]
          }
        ],
        display_title: 'New Dinner Plate',
        description: 'This is a dish',
        tags: [],
        title: 'New Dinner Plate',
        type: 'item',
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        id: 'itm_htPxAXRRqKns0nmvN93v',
        price: [
          {
            price: '23.00',
            id: 'prc_oKzwkdTjlHQfc4gOGK6g',
            label: ''
          }
        ]
      },
      {
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        tags: [],
        type: 'item',
        total: 23,
        description: 'This is a dish',
        display_title: 'New Dinner Plate',
        id: 'itm_htPxAXRRqKns0nmvN93v',
        created_at: {
          nanoseconds: 670000000,
          seconds: 1607541402
        },
        quantity: 1,
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        display_description: 'This is a dish',
        title: 'New Dinner Plate',
        price: [
          {
            price: '23.00',
            label: '',
            id: 'prc_oKzwkdTjlHQfc4gOGK6g'
          }
        ],
        order_selections: [
          {
            selections: [
              {
                price: '',
                name: '',
                quantity: 1,
                label: 'Good Cheese'
              },
              {
                name: '',
                label: 'Stinky Cheese',
                price: ''
              },
              {
                quantity: 1,
                label: 'Brave Cheese (really bad)',
                price: '2.00',
                name: ''
              }
            ],
            title: 'Choose your cheese',
            description: 'Select the wonderful cheese you\'d like to see on the dish',
            required: false,
            min_selections: '2',
            type: 'checkbox',
            max_selections: '3'
          }
        ],
        isDetailed: true
      },
      {
        id: 'itm_htPxAXRRqKns0nmvN93v',
        price: [
          {
            price: '23.00',
            id: 'prc_oKzwkdTjlHQfc4gOGK6g',
            label: ''
          }
        ],
        isDetailed: true,
        total: 46,
        created_at: {
          seconds: 1607541402,
          nanoseconds: 670000000
        },
        display_title: 'New Dinner Plate',
        created_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02',
        title: 'New Dinner Plate',
        order_selections: [
          {
            description: 'Select the wonderful cheese you\'d like to see on the dish',
            selections: [
              {
                label: 'Good Cheese',
                price: '',
                name: ''
              },
              {
                label: 'Stinky Cheese',
                price: '',
                name: '',
                quantity: 1
              },
              {
                name: '',
                price: '2.00',
                label: 'Brave Cheese (really bad)'
              }
            ],
            type: 'checkbox',
            title: 'Choose your cheese',
            max_selections: '3',
            required: false,
            min_selections: '2'
          }
        ],
        restaurantId: 'rest_I4cKXnxwiKUrCNeWG6Ue',
        display_description: 'This is a dish',
        type: 'item',
        quantity: 2,
        description: 'This is a dish',
        tags: []
      }
    ],
    updated_at: {
      seconds: 1610343346,
      nanoseconds: 436000000
    },
    grat_total: 38.4,
    is_refunded: false,
    promotion: null,
    order_time: {
      seconds: 1610477100,
      nanoseconds: 0
    },
    vendorId: 'vnd_jMQRGb1P1P1OMOnigcWL',
    updated_by: 'FiM444HWTYV9dRCxTg3xpZlQkz02'
  }
  constructor(
    public router: Router,
    private storage: StorageService,
    private camera: Camera,
    public alertCtrl: AlertController,
    private printerService: PrinterService,
    private alertService: AlertService,
    private receiptService: ReceiptService,
    private file: File
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
          }])
        }
      }]
    })

    await alert.present()
  }
  delay = ms => new Promise(res => setTimeout(res, ms))
  async printRawText() {
    if (this.defaultPrinter) {
      const loading = await this.alertService.createLoading('Communicating...')
      await loading.present()

      const printObj: PrintObj = {
        text: 'Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n',
        cutReceipt: true,
        openCashDrawer: false
      }

      this.printerService.printRawText(this.defaultPrinter.portName, this.defaultPrinter.emulation, printObj)
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

  async selectPaperSize(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: 'Select Paper Size',
        inputs: [
          { type: 'radio', label: '2" (384dots)', value: '2', checked: true },
          { type: 'radio', label: '3" (576dots)', value: '3' },
          { type: 'radio', label: '4" (832dots)', value: '4' }],
        buttons: ['Cancel',
          {
            text: 'OK',
            handler: paperSize => {
              alert.dismiss().then(() => { resolve(paperSize) })
              return false
            }
          }],
      })
      await alert.present()
    })
  }

  async printRasterReceipt() {
    if (this.defaultPrinter) {
      this.selectPaperSize().then(async paperSize => {
        const rasterObj: RasterObj = this.receiptService.rasterReceiptExample(paperSize)

        const loading = await this.alertService.createLoading('Communicating...')
        loading.present()

        this.printerService.printRasterReceipt(this.defaultPrinter.portName, this.defaultPrinter.emulation, rasterObj)
          .then(result => {
            loading.dismiss()
            this.alertService.createAlert('Success!', 'Communication Result: ')
          })
          .catch(error => {
            loading.dismiss()
            this.alertService.createAlert(error)
          })
      })
    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  async printImage(uri: string, cutReceipt: boolean) {
    if (this.defaultPrinter) {

      const loading = await this.alertService.createLoading('Communicating...')
      const cut = cutReceipt ? true : false
      if (cut) {
        loading.present()
      }

      const imageObj: ImageObj = {
        uri,
        paperWidth: 576,
        cutReceipt: cut,
        openCashDrawer: false
      }

      this.printerService.printImage(this.defaultPrinter.portName, this.defaultPrinter.emulation, imageObj)
        .then(result => {

          if (cut) {
            loading.dismiss()
            this.alertService.createAlert('Success!', 'Communication Result: ')
          }
        })
        .catch(error => {
          if (cut) {
            loading.dismiss()
          }
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
      this.printImage(uri, true)
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
      this.printImage(uri, true)
    }, (err) => {
      this.alertService.createAlert(err, 'Photo Library Error: ')
    })
  }

  print() {
    if (this.defaultPrinter) {

      this.selectPaperSize().then(async paperSize => {
        const commands: CommandsArray = await this.receiptService.getExampleReceipt(paperSize)

        const loading = await this.alertService.createLoading('Communicating...')
        loading.present()

        this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
          .then(result => {
            loading.dismiss()
            this.alertService.createAlert('Success!', 'Communication Result: ')
          })
          .catch(error => {
            loading.dismiss()
            this.alertService.createAlert(error)
          })
      })
    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  async printHorizontalTab() {
    if (this.defaultPrinter) {

      // generate Commands for a 3 inches receipt using horizontal tabs
      const commands: CommandsArray = this.receiptService.getExampleReceipt('3', true)

      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()

      this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
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

  printQRCode() {
    if (this.defaultPrinter) {

      this.selectPaperSize().then(async paperSize => {
        // generate Commands receipts using QrCodes
        const commands: CommandsArray = this.receiptService.getExampleReceipt(paperSize, false, true)

        const loading = await this.alertService.createLoading('Communicating...')
        loading.present()

        this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
          .then(result => {
            loading.dismiss()
            this.alertService.createAlert('Success!', 'Communication Result: ')
          })
          .catch(error => {
            loading.dismiss()
            this.alertService.createAlert(error)
          })
      })
    } else {
      this.alertService.createAlert('Please select a printer!')
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

          const loading = this.alertService.createLoading('Communicating...');
          (await loading).present()

          this.printerService.print(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
            .then(async result => {
              (await loading).dismiss()
              this.alertService.createAlert('Success!', 'Communication Result: ')
            }).catch(async error => {
              (await loading).dismiss()
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

  showStarIOExtManagerPage() {
    this.router.navigate(['ext-manager'])
  }

  async openCashDrawer() {
    if (this.defaultPrinter) {

      const loading = this.alertService.createLoading('Communicating...');
      (await loading).present()

      this.printerService.openCashDrawer(this.defaultPrinter.portName, this.defaultPrinter.emulation)
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

  showPrinterStatus() {
    if (this.defaultPrinter) {
      this.router.navigate(['page-status', {
        portName: this.defaultPrinter.portName,
        emulation: this.defaultPrinter.emulation
      }])
    } else {
      this.alertService.createAlert('Please select a printer!')
    }
  }

  ionViewDidEnter() {
    this.printerService.getDefaultPrinter()
      .then(printer => {
        console.log(printer)
        this.defaultPrinter = printer
      })
  }


  async printImageContent(uri: string, cutReceipt: boolean): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.defaultPrinter) {
        const cut = cutReceipt ? true : false
        const imageObj: ImageObj = {
          uri,
          paperWidth: 576,
          cutReceipt: cut,
          openCashDrawer: false
        }

        this.printerService.printImage(this.defaultPrinter.portName, this.defaultPrinter.emulation, imageObj)
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            this.showToast(error)
            resolve(false)
          })
      } else {
        this.showToast('Please select printer')
        resolve(false)
      }
    })
  }

  async showToast(message) {
    const loading = await this.alertService.createLoading(message)
    loading.present()
    setTimeout(() => {
      loading.dismiss()
    }, 5000)
  }


  /************** Test functions */
  async printCustomerReceipt() {
    // const commands: CommandsArray = this.receiptService.test(this.order)
    // const commands = this.receiptService.formatOrder(this.order)
    const commands = this.receiptService.htmlReceipt(this.order, true)
    // const commands: CommandsArray = this.receiptService.getExampleReceipt('3', true, true);
    // console.log('Receipt', commands)

    // const printEl = document.createElement('div')
    // printEl.innerHTML = commands
    // printEl.classList.add('print')
    // printEl.id = 'printPOS'
    // this.printContent = commands

    const firstElement = document.body.firstElementChild
    const logoURL = 'https://oosetup.s3-us-west-2.amazonaws.com/RoundTable/Web/logo.png'
    // document.body.insertAdjacentElement('afterbegin', printEl)
    // document.body.appendChild(printEl)(firstElement).style.display = 'none'

    const printElement = document.getElementById('printPOS')
    printElement.innerHTML = commands

    html2canvas(printElement, {
      scale: 2,
      width: 375,
      allowTaint: true,
      logging: true,
      useCORS: true,
      height: document.getElementById('printPOS').offsetHeight + 50,
      windowHeight: document.getElementById('printPOS').offsetHeight + 50,
      onclone(clonedDoc) {
        console.log('Printe Element')
        // printElement.style.display = 'block'
        // const el = printElement
        // el.style.opacity = '100'
        // el.style.zIndex = '99'
      }
    }).then(async (canvas) => {
      console.log('canvas', canvas, 'height :', canvas.height + 50)
      const dataUrl = canvas.toDataURL()
      const ctx = canvas.getContext('2d')
      console.log('Canvas width:', canvas.width)
      const imgWidth1 = (canvas.width * 25.4) / 190
      const imgHeight1 = (canvas.height * 25.4) / 190
      // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      console.log('height', imgHeight1, 'width', imgWidth1, 'height:', imgHeight1)
      const imgWidth = (canvas.width * 25.4) / 190
      const imgHeight = (canvas.height * 25.4) / 190
      ctx.clearRect(0, 0, imgWidth, imgHeight)


      const receiptData = dataUrl.split(',')[1]
      const contentBlob = this.b64toBlob(receiptData, 'image/png')
      console.log('Data\n\n', receiptData)
      // const logoContent = await this.getBase64Image(logoURL)
      // if (logoContent) {
      //   const logoBlob = this.b64toBlob(logoContent, 'image/png')
      //   const logoUri: string = await this.saveFile(logoBlob, 'logo.png')
      //   if (logoUri) {
      //     // await this.printImageContent(logoUri, false)
      //   }
      //   console.log('Time 1', new Date().getSeconds())
      //   console.log('logoContent', logoUri)

      // }
      const contentURI = await this.saveFile(contentBlob, 'receipt.png')
      console.log('Receipt Content:\n\n', receiptData)
      console.log('Receipt contentURI', contentURI)
      if (contentURI) {
        console.log('Time 2', new Date().getSeconds())
        await this.printImageContent(contentURI, true)
      }

      // this.getBase64Image(logoURL).then((logoData) => {
      //   const logoBlob = this.b64toBlob(logoData, 'image/png')
      //   this.saveFile(logoBlob, 'logo.png').then(async (logoUri) => {
      //     console.log('Logo URi', logoUri)
      //     if (logoUri) {
      //       console.log('Time 1', new Date().getSeconds())
      //       await this.delay(3000)

      //       this.saveFile(blob, 'receipt.png').then(contentURI => {
      //         console.log('contentURI', contentURI)

      //         this.printImage(contentURI, true)
      //       })

      //     }
      //   })
      // })
      // printElement.innerHTML = ''
      this.printContent = ''

    })

    return
    // console.log('Command\n\n', JSON.stringify(commands))
    if (this.defaultPrinter) {
      const loading = await this.alertService.createLoading('Communicating...')
      loading.present()
      // this.printerService.printRasterReceipt(this.defaultPrinter.portName, this.defaultPrinter.emulation, commands)
      //   .then(result => {
      //     loading.dismiss()
      //     this.alertService.createAlert('Success!', 'Communication Result: ')
      //   })
      //   .catch(error => {
      //     loading.dismiss()
      //     this.alertService.createAlert(error)
      //   })
    } else {
      this.alertService.createAlert('Please select a printer')
    }
  }

  getBase64Image(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        let canvasEle = document.createElement('CANVAS') as HTMLCanvasElement
        const ctx = canvasEle.getContext('2d')
        canvasEle.height = 100, // img.height
          canvasEle.width = 576 // img.width
        const xAxis = (canvasEle.height / 2) - (img.height / 2)
        const yAxis = (canvasEle.width / 2) - (img.width / 2)
        ctx.drawImage(img, yAxis, xAxis)
        const dataURL = canvasEle.toDataURL('image/png').split(',')[1]
        // callback(dataURL);

        canvasEle = null
        resolve(dataURL)
      }
      img.onerror = () => {
        resolve(null)
      }
      img.src = url
    })
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || ''
    const sliceSize = 512
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  saveFile(content, name?: string): Promise<string> {
    const fileName = name ? name : new Date().getTime() + '.png'
    const path = this.file.dataDirectory
    const options: IWriteOptions = { replace: true }
    return new Promise((resolve) => {
      this.file.writeFile(path, fileName, content, options).then(resp => {
        resolve(resp.nativeURL)
      }).catch(err => {
        console.log('File Save Error', JSON.stringify(err))
        resolve(null)
      })
    })
  }


}
