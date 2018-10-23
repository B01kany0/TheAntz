import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ToastController } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { LoadingController } from 'ionic-angular';
import { EulaPage } from '../eula/eula';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('input') myInput: ElementRef
  name;
  email;
  password;
  obj = {} as obj;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp() {
    if (this.name == null || this.name == undefined,
      this.email == null || this.email == undefined,
      this.password == null || this.password == undefined
    ) {
      const alert = this.alertCtrl.create({
        title: "Oh no! ",
        subTitle: "Please enter your email and password to login.",
        buttons: ['OK']
      });
      alert.present();
    } else if (this.password.length < 6) {
      const alert = this.alertCtrl.create({
        subTitle: 'Password must be 6 characters or more.',
        buttons: ['OK']
      });
      alert.present();
    } else {
      if (this.password.length < 6) {
        const alert = this.alertCtrl.create({
          subTitle: 'Password must be 6 characters or more.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        if (this.name == "") {
          const alert = this.alertCtrl.create({
            subTitle: 'Please complete your details.',
            buttons: ['OK']
          });
          alert.present()
          return  
        }
        if (this.email == "") {
          const alert = this.alertCtrl.create({
            subTitle: 'Please complete your details.',
            buttons: ['OK']
          });
          alert.present()
          return
        }
        this.art.register(this.email, this.password, this.name).then(() => {
          this.presentLoading();
          this.navCtrl.setRoot(CategoryPage);
          this.presentLoading1();
        }, (error) => {
          console.log(error.message);
        })

      }

    }
  }
  dismiss() {
    this.navCtrl.setRoot(LoginPage);
  }
  presentLoading() {
    const toast = this.toastCtrl.create({
      message: this.email + 'You have succesfflly registered',
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

}
