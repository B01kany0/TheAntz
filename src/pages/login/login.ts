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
  email;
  password;
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

  login() {
    if (this.email == null || this.email == undefined,this.password == null || this.password == undefined) {
      const alert = this.alertCtrl.create({
        title: "Oh no! ",
        subTitle: "Please enter your email and password to login.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.email == null || this.email == undefined) {
      const alert = this.alertCtrl.create({
        title: "No Email",
        subTitle: "It looks like you didn't enter your email address.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.password == null || this.password == undefined) {
      const alert = this.alertCtrl.create({
        title: "No Password",
        subTitle: "You have not entered your password. Please enter your password",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.art.login(this.email,this.password).then(() => {
        this.presentLoading1();
        this.navCtrl.setRoot(CategoryPage);
      }, (error) => {
        console.log(error.message);
      })
    }
  }
  presentLoading1() {
    const loader = this.loadingCtrl.create({
      content: "loading....",
      duration: 3000
    });
    loader.present();
  }
  forgotpassword() {
    this.navCtrl.push(ForgotPasswordPage)
  }



}