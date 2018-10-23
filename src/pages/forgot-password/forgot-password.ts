import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  obj = {} as obj;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController,public art: StreetartzProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgotpassword(obj: obj) {
    this.art.forgotpassword(this.obj.email).then(() => {
    }, (error)=>{
      alert(error)
    })         
  }

}
