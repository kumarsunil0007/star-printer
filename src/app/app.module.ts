import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { PrinterService } from './services/printer/printer.service'
import { ReceiptService } from './services/receipt/receipt.service'
import { AlertService } from './services/alert/alert.service'
import { Camera } from '@ionic-native/camera/ngx'
import { StarPRNT } from '@ionic-native/star-prnt/ngx'
import { File } from '@ionic-native/file/ngx'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PrinterService,
    ReceiptService,
    AlertService,
    StarPRNT,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }
