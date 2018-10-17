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
export class ProfilePage  {
  list = [];
  arr = [];
  uid: any;
  uid1: any;
  obj;
  name;
  details;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    // this.art.profile().then((data) => {
    //   this.arr.length = 0
    //   var keys: any = Object.keys(data);
    //   for (var i = 0; i < keys.length; i++) {
    //     var k = keys[i];
    //     let obj = {
    //       downloadurl: data[k].downloadurl,
    //       name: data[k].name,
    //       key: k,
    //       email: data[k].email,
    //       bio: data[k].bio,
    //       contact: data[k].contact
    //     }
    //     this.arr.push(obj)
    //     console.log(this.arr);
     
    //   }
    // })


  //  this.retreivePics1();
   this.retreivePics();

    let userID = firebase.auth().currentUser;
    firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
        this.arr.length = 0
      let details = data.val(); 
        this.arr.push(details);
        console.log(this.arr);
      })
  }




  ionViewDidLoad() {

  }
  ngOnInit() {
  }

  EditProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  upload() {
    this.navCtrl.push(UploadImagePage);
  }
  presentPopover() {
    const popover = this.popoverCtrl.create(PopOverProfilePage);
    popover.present();
  }

  GoBackToCategory() {
    this.navCtrl.pop();
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
       
        }
      }
 
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
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let objt = {
            downloadurl: data[k].downloadurl
          }
          this.arr.push(objt);
        }
      }
  
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
            this.art.RemoveUploadedPicture(key);
            this.retreivePics();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();

  }

}