import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HotlineInfoPage } from '../hotline-info/hotline-info';
import { DataDisplayPage } from '../data-display/data-display';
import { SocialSharingPage } from '../social-sharing/social-sharing';
import { EvacuationSystemPage } from '../evacuation-system/evacuation-system';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public latitude:any;
  public longitude:any;

  constructor(public alerCtrl: AlertController, public navCtrl: NavController, private sms: SMS, private geolocation: Geolocation, private sharingVar: SocialSharing) {
  }
  goToHotlineInfo(params){
    if (!params) params = {};
    this.navCtrl.push(HotlineInfoPage);
  }goToDataDisplay(params){
    if (!params) params = {};
    this.navCtrl.push(DataDisplayPage);
  }goToSocialSharing(params){
    if (!params) params = {};
    this.navCtrl.push(SocialSharingPage);
  }goToEvacuationSystem(params){
    if (!params) params = {};
    this.navCtrl.push(EvacuationSystemPage);
  }

  getLocation()
  {
   this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
   }).catch((error) => {
     console.log('Error getting location'+JSON.stringify(error));
   });
  }

  whatsappShare(){
    this.sharingVar.shareViaWhatsAppToReceiver('+60149073870','Flood Aid Needed at this location! '+this.latitude+', '+this.longitude, null /*Image*/,  null /* url */)
      .then(()=>{
      },
      ()=>{
         alert("SOS message sent failed")
      })
    }

  sendTextMessage(){
      this.sharingVar.shareViaSMS('Flood Aid Needed at this location! '+this.latitude+', '+this.longitude,'+60149073870')
      .then(()=>{
      },
      ()=>{
         alert("SOS message sent failed")
      })
      }

  // sendTextMessage(){
  //   this.sms.send('+60149073870','Flood Aid Needed at this location! '+this.latitude+', '+this.longitude)
  //   .then(()=>{
  //   },
  //   ()=>{
  //      alert("SOS message sent failed")
  //   })
  //   }

  todo()
  {
    this.getLocation();
    this.whatsappShare();
    this.sendTextMessage()
  }

  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Confirm send SOS Message?',
      message: 'Click Agree to Send.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.todo();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }
}
