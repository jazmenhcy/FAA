import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public latitude:any;
  public longitude:any;
  tabBarElement: any;

  constructor(public alerCtrl: AlertController, public navCtrl: NavController, public locationAccuracy: LocationAccuracy, private geolocation: Geolocation, private sharingVar: SocialSharing) {
    this.tabBarElement = document.querySelector('.tabbar');

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }

    });
    this.geolocation.getCurrentPosition().then((resp) => {
       this.latitude=resp.coords.latitude;
       this.longitude=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location'+JSON.stringify(error));
    });

  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  SwitchEvac(){
  this.navCtrl.parent.select(1); //Selects the first tab
  }
  SwitchData(){
  this.navCtrl.parent.select(2); //Selects the first tab
  }
  SwitchSocial(){
  this.navCtrl.parent.select(3); //Selects the first tab
  }
  SwitchHotline(){
  this.navCtrl.parent.select(4); //Selects the first tab
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

  todo()
  {
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
