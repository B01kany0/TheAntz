import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { CategoryPage } from '../category/category';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
/**
 * Generated class for the EulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eula',
  templateUrl: 'eula.html',
})
export class EulaPage {
key;
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EulaPage');
  }
contract(){
  this.art.LicenceContract();
    this.navCtrl.setRoot(SignupPage); 
}
goBack(){
  this.navCtrl.setRoot(LoginPage)
}
}