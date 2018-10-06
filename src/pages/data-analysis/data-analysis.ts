import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoreInfoPage } from '../more-info/more-info';

@Component({
  selector: 'page-data-analysis',
  templateUrl: 'data-analysis.html'
})
export class DataAnalysisPage {

  constructor(public navCtrl: NavController) {
  }
  SwitchMoreInfo(params){
    if (!params) params = {};
    this.navCtrl.push(MoreInfoPage);
  }
}
