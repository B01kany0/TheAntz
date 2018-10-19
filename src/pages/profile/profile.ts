import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { CategoryPage } from '../category/category';
import { UploadImagePage } from '../upload-image/upload-image';
import { ModalController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopOverProfilePage } from '../pop-over-profile/pop-over-profile';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  list = [];
  arr = [];
  uid: any;
  uid1: any;
  obj;
  name;
  details;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.retreivePics1();
    this.retreivePics();
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    this.art.profile(this.details).then((data) => {
      this.arr.length = 0
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        let obj = {
          downloadurl: data[k].downloadurl,
          name: data[k].name,
          key: k,
          email: data[k].email,
          bio: data[k].bio,
          contact: data[k].contact
        }
        this.arr.push(obj)
        console.log(this.arr);
      }
    })

  }

  EditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  upload() {
    
    var loader = this.loadingCtrl.create({
      content: "please wait...",
      duration: 1000

    });

    loader.present();
    this.navCtrl.push(UploadImagePage);
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopOverProfilePage);
    popover.present();
  }

  GoBackToCategory() {
    this.navCtrl.setRoot(CategoryPage);
  }
  getUid() {
    this.art.getUserID().then(data => {
      this.uid = data
    })
  }

  retreivePics() {
    this.list.length = 0;
    this.getUid();
    this.art.viewPicGallery().then(data => {
      var loader = this.loadingCtrl.create({
        content: "please wait...",
        duration: 6000
      });
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let obj = {
            uid: data[k].uid,
            category: data[k].category,
            downloadurl: data[k].downloadurl,
            location: data[k].location,
            price: data[k].price,
            name: data[k].name,
            key: k
          }
          this.list.push(obj);
          console.log(this.list)
        }
      }
      loader.dismiss();
    }, Error => {
      console.log(Error)
    });
  }
  getUid1() {
    this.art.getUserID().then(data => {
      this.uid1 = data
    })
  }

  retreivePics1() {
    this.arr.length = 0;
    this.getUid1();
    this.art.viewPicGallery1().then(data => {
      var loader = this.loadingCtrl.create({
        content: "please wait...",
        duration: 6000
      });
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let objt = {
            downloadurl: data[k].downloadurl
          }
          this.arr.push(objt);
          console.log(this.arr)
        }
      }
      loader.dismiss();
    }, Error => {
      console.log(Error)
    });
  }


  nextpage() {
    this.navCtrl.push(EditProfilePage);
  }

  dismissPage() {
    this.navCtrl.pop();
  }

  removeImage(key) {
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to delete image?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Disagree clicked');
            this.art.RemoveUploadedPicture(key);
            console.log(key);
            this.retreivePics();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();

  }

}
