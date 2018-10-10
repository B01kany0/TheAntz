import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { obj } from '../../app/class';
import { ProfilePage } from '../profile/profile';
import { ViewPage } from '../view/view';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
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
  username;
  comments;
  name;
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
  }

  ionViewDidLoad() {
    this.retreivePics();
  }

  profile(obj: obj) {
    this.art.profile(this.obj).then((data) => {
      this.navCtrl.push(ViewPage, { obj: data });
    })
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
            likes : data[k].likes
          }
          this.arr2.push(obj);
          console.log(this.category);
          console.log(obj);
        }

      }
    })

  }
  retreivePics() {
    this.arr2.length = 0;
    this.art.viewPicMain(this.name,this.username).then((data: any) => {
      this.arr2 = data;
      console.log(this.arr2)
    });
  }

  pushArtistDetails(pic, name, key,url,comments,email, likes) {

    console.log(key)


    let obj = {
      name: name,
      pic: pic,
      key: key,
      url:url,
      comments:comments,
      email:email,
      likes : likes
    }
    this.navCtrl.push(ViewPage, { obj: obj });
  }
}

// }
// //  likePic=function(keyIndex){
// //   var user = firebase.auth().currentUser;
// //    this.uid.likePic('likes' + this.art).then(() =>{
// //      if (this.art[keyIndex].color == 'grey'){
// //        this.art.addNumOfLikes(this.art[keyIndex].name, this.art[keyIndex].key, this.art[keyIndex].likes).then (data =>{
// //          this.ionViewDidLoad();
// //          console.log(data);
// //        })
// //      }
// //    else if (this.arr2[keyIndex].color == 'primary'){
// //           this.art.removeLike(this.art[keyIndex].name, this.art[keyIndex].key, this.art[keyIndex].likes).then (data =>{
// //            this.ionViewDidLoad();
// //           })
// //        }
// //  else{
// //   this.art.addNumOfLikes(this.art[keyIndex].name, this.art[keyIndex].key, this.art[keyIndex].likes).then (data =>{
// //   this.ionViewDidLoad();

// //   })
// //  }
// //   })
// //  }

// likePic(key){

//   let 
//  user = firebase.auth().currentUser;
//  console.log(key)
//   this.art.likePic(key).then((data: any) =>{
//     if (this.art[key]){
//              this.art.addNumOfLikes(this.art[key].name, this.art[key].key, this.art[key].likes).then (data =>{
//                this.ionViewDidLoad();
//                console.log(data);
//              })
    
    
//     console.log(data);
//             }
//             else{
//                 this.art.addNumOfLikes(this.art[key], this.art[key].key, this.art[key].likes).then (data =>{
//                 this.ionViewDidLoad();
              
//                 })
//                }
            
// })
// }

