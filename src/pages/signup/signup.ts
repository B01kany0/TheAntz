import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ToastController } from 'ionic-angular';
import { CategoryPage } from '../category/category';

import { UploadedPage } from '../uploaded/uploaded';

import { LoadingController } from 'ionic-angular';
import { EulaPage } from '../eula/eula';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('input') myInput: ElementRef

  name: string;
  email: string;
  password: string;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    if (this.name == undefined || this.name == null &&
      this.email == undefined || this.email == null,
      this.password == undefined || this.password == null) {
      const alert = this.alertCtrl.create({
        title: "Oops! ",
        subTitle: "Please enter your name,email and password to login.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.name == undefined || this.name == null) {
      const alert = this.alertCtrl.create({
        title: "No Name",
        subTitle: "It looks like you didn't enter your Name.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.email == undefined || this.email == null) {
      const alert = this.alertCtrl.create({
        title: "No Email",
        subTitle: "It looks like you didn't enter your email address.",
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.password == undefined || this.password == null) {
      const alert = this.alertCtrl.create({
        title: "No Password",
        subTitle: "You have not entered your password. Please enter your password",
        buttons: ['OK']
      });
      alert.present();
    }
    //if (this.password.length < 6 ) {
    //  const alert = this.alertCtrl.create({
    //    title: "Lacking Password",
    //    subTitle: "Your password should atleat contain a minimum of 6 characters",
    //    buttons: ['OK']
    //  });
    //  alert.present();
    //}
    else {
      this.art.register(this.email, this.password, this.name).then(() => {
        this.presentLoading();
        this.navCtrl.setRoot(CategoryPage);
        this.presentLoading1();
      }, (error) => {
        console.log(error.message);
      })
    }
  }
  dismiss() {
    this.navCtrl.setRoot(LoginPage);
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "signing in....",
      duration: 4000
    });
    loader.present();
  }
  presentLoading1() {
    const loader = this.loadingCtrl.create({
      content: "loading....",
      duration: 5000
    });
    loader.present();
  }
  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32 || event.keyCode == 46) {
      return true
    }
    else {
      const toast = this.toastCtrl.create({
        message: event.keyCode - 48 + ' is not allowed as a name',
        duration: 2000
      });
      toast.present();
      return false;
    }
  }
}
