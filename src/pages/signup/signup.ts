import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ToastController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('input') myInput: ElementRef

  obj = {} as obj;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    this.art.register(this.obj).then(() => {
      this.presentLoading();
      this.navCtrl.setRoot(CategoryPage);
      this.presentLoading1();
    }, (error) => {
      console.log(error.message);
    })
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
