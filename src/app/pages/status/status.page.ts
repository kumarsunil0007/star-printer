import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert/alert.service';
import {PrinterService} from '../../services/printer/printer.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ReceiptService } from 'src/app/services/receipt/receipt.service';
@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  printerStatus: any;
  portName: string;
  emulation: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private printerService: PrinterService,
    private receiptService: ReceiptService,
    private alertService: AlertService) { }

  ngOnInit() {
     this.activatedRoute.queryParams.subscribe(params => {
      if (params.portName){
         this.portName = params.portName;
      }
      if (params.emulation){
         this.emulation = params.emulation;
      }

    });
  }

 async checkStatus(){
    if (this.portName != null && this.emulation != null){
      const loading = await this.alertService.createLoading('Communicating...');
      loading.present();
      this.printerService.checkStatus(this.portName, this.emulation)
      .then(PrinterStatus => {
        loading.dismiss();
        this.printerStatus = PrinterStatus;
        console.log(PrinterStatus);
      })
      .catch(error => {
        loading.dismiss();
        this.alertService.createAlert(error);
      });
    }else{
      this.alertService.createAlert('No printer selected');
    }
  }

  ionViewDidEnter() {
    this.checkStatus();
  }
}
