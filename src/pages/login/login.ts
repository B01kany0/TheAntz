import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ModalController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { ProfilePage } from '../profile/profile';
import { ForgotPasswordPage } from '../forgot-password/forgot-password'
import { EulaPage } from '../eula/eula';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { UploadedPage } from '../uploaded/uploaded';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: any;
  password: any;
  obj = {} as obj;
  errMsg;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public art: StreetartzProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {
    this.navCtrl.setRoot(EulaPage);
  }

  login(obj: obj) {
    if (this.obj.email == null || this.obj.email == undefined) {
      const alert = this.alertCtrl.create({
        subTitle: 'Please enter your details',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.art.login(this.obj.email, this.obj.password).then(() => {
        this.presentLoading();
        this.navCtrl.setRoot(CategoryPage);
        this.presentLoading1();
      }, (error) => {
        console.log(error.message);
      })
    }
  }
  presentLoading() {
    const toast = this.toastCtrl.create({
      message: this.obj.email + 'You have logged in',
      duration: 2000
    });
    toast.present();
  }
  presentLoading1() {
    const loader = this.loadingCtrl.create({
      content: "loading....",
      duration: 5000
    });
    loader.present();
  }
  forgotpassword() {
    this.navCtrl.push(ForgotPasswordPage)
  }



}