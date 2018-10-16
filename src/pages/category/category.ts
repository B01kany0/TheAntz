import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ProfilePage } from '../profile/profile';
import { ViewPage } from '../view/view';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  obj = {} as obj
  category: any;
  arr2 = [];
  uid: any;
  list = [];
  name;
  username;
  comments;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.retreivePics();
    
    // this.reload()
  }

  ionViewDidLoad() {

  }



  reload(){
    setTimeout(() => {
      this.retreivePics();
    
        console.log('reloading');
        
    }, 50000);
  
  }

  nextpage() {

    this.navCtrl.push(ProfilePage);

  }
  typeOfArt() {
    this.arr2.length = 0;
    this.art.selectCategory(this.category).then((data) => {
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.category == data[k].category) {
          let obj = {
            category: data[k].category,
            downloadurl: data[k].downloadurl,
            name: data[k].name,
            key: k,
            url: data[k].url,
            username: data[k].username,
            email:data[k].email,
            location: data[k].location,
            price: data[k].price,
          }
          this.arr2.push(obj);
        }
      }
      if(this.category == 'All'){
        this.retreivePics()
     
      }
    })

  }
  retreivePics() {
    this.arr2.length = 0;
    this.art.viewPicMain(this.name,this.username).then((data: any) => {
      this.arr2 = data;
    
    });
    this.reload();
  }

  pushArtistDetails(pic, name, key,url,comments,email,username,description,location,price,likes) {
    let obj = {
      name: name,
      pic: pic,
      key: key,
      url:url,
      comments:comments,
      email:email,
      username:username,
      description:description,
      location:location,
      price:price,
      likes:likes
    }
    this.navCtrl.push(ViewPage, { obj: obj });

    }

  
}