import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';
import { obj } from '../../app/class';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the PopOverProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-profile',
  templateUrl: 'pop-over-profile.html',
})
export class PopOverProfilePage{
// obj;
  constructor(public viewCrtl: ViewController,public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverProfilePage');
  }
  nextpage(){
    this.navCtrl.push(EditProfilePage);
    this.viewCrtl.dismiss();
  }
  logout() {
    this.art.logout().then(() => {
      this.navCtrl.push(LoginPage);
    }, (error) => {
      console.log(error.message);
     })
  }

}