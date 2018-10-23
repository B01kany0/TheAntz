import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { obj } from '../../app/class';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { EmailComposer } from '@ionic-native/email-composer';
import { CategoryPage } from '../category/category';


/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})

export class ViewPage implements OnInit {
  comment: any;
  data: any;
  name;
  downloadurl;
  description;
  downloadurl1;
  downloadurl3;
  keys2;
  keyLike
  arr = [];
  arr2 = [];
  uid: any
  PicUrl: any;
  url;
  num;
  numComments;
  Comments = [];
  email;
  comments;
  likes;
  like;
  username;
  commentsLeng;
  LikesLeng;
  location;
  numlikes;
  viewComments;
  viewlike;
  price
  currentUserId;
  likeArr = [];
  CommentArr = [];
  obj = this.navParams.get("obj");
  constructor(public navCtrl: NavController, public navParams: NavParams, public art: StreetartzProvider, private emailComposer: EmailComposer, public alertCtrl: AlertController) {
    this.obj = this.navParams.get("obj");
    console.log("this is my index");
    console.log(this.email);

    this.username = this.obj.username;
    this.downloadurl = this.obj.pic;
    this.keys2 = this.obj.key;
    this.downloadurl1 = this.obj.url
    this.numComments = this.obj.comments;
    this.email = this.obj.email;
    this.name = this.obj.name;
    this.description = this.obj.description;
    this.location = this.obj.location;
    this.price = this.obj.price;
    this.numlikes = this.obj.likes;





  }
  ionViewDidEnter() {
    this.Retrivecomments();

  }
  ngOnInit() {
    this.Retrivecomments();
    this.currentUserId = this.art.returnUID();
  }


  BuyArt() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        console.log(available);
      }
    });
    let email = {
      to: this.obj.email,
      cc: 'theantz39@gmail.com',
      attachments: [
        this.downloadurl
      ],
      subject: this.obj.username,
      body: this.obj.pic,
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  GoBackToCategory() {
    this.navCtrl.setRoot(CategoryPage);
  }

  Retrivecomments() {
    this.art.viewComments(this.obj.key, this.comment).then((data) => {
      if (data == null || data == undefined) {

      }
      else {
        this.CommentArr.length = 0;
        console.log(data)
        var keys1: any = Object.keys(data);
        for (var i = 0; i < keys1.length; i++) {
          var key = keys1[i];
          let obj = {
            comment: data[key].comment,
            uid: data[key].uid,
            downloadurl: data[key].url,
            username: data[key].username,
            date: data[key].date
          }
          this.CommentArr.push(obj);
          console.log(this.CommentArr);
        }
        this.commentsLeng = this.CommentArr.length;
      }

    })

  }
  likePicture() {
    this.art.viewLikes(this.obj.key).then(data => {
      console.log(data)
      if (data == "not found") {
        this.art.likePic(this.obj.key);
        this.art.addNumOfLikes(this.obj.key, this.numlikes);
        this.numlikes++;
      }
      else {
        this.art.removeLike(this.obj.key, this.numlikes, data);
        this.numlikes--;
      }
    })


  }

  CommentPic(key) {
    if (this.comment == "" || this.comment == null) {
      const alert = this.alertCtrl.create({
        title: "Oops!",
        subTitle: "It looks like you didn't write anything on the comments, please check.",
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.art.comments(this.obj.key, this.comment).then((data: any) => {
        this.art.addNumOfComments(this.obj.key, this.numComments).then(data => {
          this.art.viewComments(this.obj.key, this.viewComments).then(data => {
            this.arr2.length = 0;
            this.Retrivecomments();
          })
        })
        this.numComments++;
      })
      this.comment = "";
    }
  }

}