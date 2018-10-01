import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    public geolocation: Geolocation,
    private platform: Platform
  ) {}

  async getToken() {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token)
  }

  async getLatLong(){
    let latitudeX;
    let longitudeY;

    this.geolocation.getCurrentPosition().then((resp) => {
       latitudeX=resp.coords.latitude;
       longitudeY=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location'+JSON.stringify(error));
    });

    return this.saveLatLongToFirestore(latitudeX, longitudeY)
  }

  private saveTokenToFirestore(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices')

    const docData = {
      token,
      userId: 'testUser',
    }

    return devicesRef.doc(token).set(docData)
  }

  private saveLatLongToFirestore(x, y) {
    if (!x && !y) return;

    const devicesRef = this.afs.collection('locations')

    const docData = {
      x,
      y,
      userId: 'testUser',
    }

    return devicesRef.doc(x).set(docData)
  }

  listenToNotifications() {
  return this.firebaseNative.onNotificationOpen()
  }
}
