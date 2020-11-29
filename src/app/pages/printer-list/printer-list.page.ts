import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AlertService } from '../../services/alert/alert.service';
import { PrinterService } from '../../services/printer/printer.service';
import { Printers } from '@ionic-native/star-prnt/ngx';


@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.page.html',
  styleUrls: ['./printer-list.page.scss'],
})

export class PrinterListPage implements OnInit {
  portType: string;
  printerList: Printers = [];
  selectedPrinter: any = {};

   constructor(
     public router: Router,
     public alertCtrl: AlertController,
     private printerService: PrinterService,
     private alertService: AlertService,
     private activatedRoute: ActivatedRoute,
     private navCtrl: NavController
     ) {

  }



  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.portType){
          this.portType = params.portType;
      }
      if (this.portType != null){
      this.portDiscovery(this.portType);
    }else{
      this.portDiscovery('All');
    }
    });

  }

  async portDiscovery(portType: string){
    const loading = await this.alertService.createLoading('Communicating');
    loading.present();
    this.printerService.portDiscovery(portType)
    // tslint:disable-next-line:no-shadowed-variable
    .then(Printers => {
      loading.dismiss();
      this.printerList = [];
      this.printerList = Printers;
      console.log(this.printerList);
    })
    .catch(error => {
      loading.dismiss();
      alert('Error finding printers ' + error);
    });
  }

    /**
     * Get the emulation type for a particular printer model.
     */
  async selected(){
    const alert = await this.alertCtrl.create({
    header : 'Confirm. What is your printer?',
    inputs : [
      { type: 'radio', name: 'emulation', label: 'mPOP', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'FVP10', value: 'StarLine' },
      { type: 'radio', name: 'emulation', label: 'TSP100', value: 'StarGraphic' },
      { type: 'radio', name: 'emulation', label: 'TSP650II', value: 'StarLine' },
      { type: 'radio', name: 'emulation', label: 'TSP650II', value: 'StarLine' },
      { type: 'radio', name: 'emulation', label: 'TSP700II', value: 'StarLine' },
      { type: 'radio', name: 'emulation', label: 'TSP800II', value: 'StarLine' },
      { type: 'radio', name: 'emulation', label: 'SP700', value: 'StarDotImpact' },
      { type: 'radio', name: 'emulation', label: 'SM-S210i', value: 'EscPosMobile' },
      { type: 'radio', name: 'emulation', label: 'SM-S220i', value: 'EscPosMobile' },
      { type: 'radio', name: 'emulation', label: 'SM-S230i', value: 'EscPosMobile' },
      { type: 'radio', name: 'emulation', label: 'SM-T300i/T300', value: 'EscPosMobile' },
      { type: 'radio', name: 'emulation', label: 'SM-T400i', value: 'EscPosMobile' },
      { type: 'radio', name: 'emulation', label: 'SM-L200', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'SM-L300', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'BSC10', value: 'EscPos' },
      { type: 'radio', name: 'emulation', label: 'SM-S210i StarPRNT', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'SM-S220i StarPRNT', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'SM-S230i StarPRNT', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'SM-T300i/T300 StarPRNT', value: 'StarPRNT' },
      { type: 'radio', name: 'emulation', label: 'SM-T400i StarPRNT', value: 'StarPRNT' }
    ],
    buttons: [
   'Cancel',
  {
      text: 'OK',
      handler: emulation => {
        this.savePrinter(emulation);
      }
    }]});
    await alert.present();
  }

  savePrinter(emulation){
    if (this.selectedPrinter.printer){
    this.printerService.saveDefaultPrinter(this.selectedPrinter.printer, emulation);
    this.navCtrl.back();
    }else{
      alert('Please select the printer ');
    }
  }
}
