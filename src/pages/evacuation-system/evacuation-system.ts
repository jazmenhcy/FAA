import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-evacuation-system',
  templateUrl: 'evacuation-system.html'
})
export class EvacuationSystemPage {

  Destination: any = '';
  MyLocation: any;
  latitude:any;
  longitude:any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
       this.latitude=resp.coords.latitude;
       this.longitude=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location'+JSON.stringify(error));
    });
  }

  calculateAndDisplayRoute() {
      let that = this;
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: this.latitude, lng: this.longitude}
      });
      directionsDisplay.setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          that.MyLocation = new google.maps.LatLng(pos);

        }, function() {

        });
      } else {
        // Browser doesn't support Geolocation
      }

      directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  }
