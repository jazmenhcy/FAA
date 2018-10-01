import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EvacuationSystemPage } from '../pages/evacuation-system/evacuation-system';
import { SocialSharingPage } from '../pages/social-sharing/social-sharing';
import { DataDisplayPage } from '../pages/data-display/data-display';
import { HotlineInfoPage } from '../pages/hotline-info/hotline-info';
import { WaterLevelPage } from '../pages/water-level/water-level';
import { RainfallLevelPage } from '../pages/rainfall-level/rainfall-level';
import { MapViewPage } from '../pages/map-view/map-view';

import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

const firebase = {
 // your firebase web config
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EvacuationSystemPage,
    SocialSharingPage,
    DataDisplayPage,
    HotlineInfoPage,
    WaterLevelPage,
    RainfallLevelPage,
    MapViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EvacuationSystemPage,
    SocialSharingPage,
    DataDisplayPage,
    HotlineInfoPage,
    WaterLevelPage,
    RainfallLevelPage,
    MapViewPage
  ],
  providers: [
    Firebase,
    FcmProvider,
    AlertController,
    SMS,
    SocialSharing,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
