import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPage } from '../../pages/login/login';
import { obj } from '../../app/class';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
import { empty } from 'rxjs/Observer';
/*
  Generated class for the StreetartzProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StreetartzProvider {
  key: string;
  obj = {} as obj;
  arr = [];
  category;
  keyArr = [];
  arr2 = [];
  data = [];
  list = [];
  PicUrl;
  ProfilePic: any
  countComment;
  name;
  url;
  username;
  selectCategoryArr = [];
  emailComposer;
  email;
  password
  condition;
  likeArr = [];
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log('Hello StreetartzProvider Provider');
  }
  checkstate() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.condition = 1
        } else {
          this.condition = 0
        }
        resolve(this.condition)
      })
    })
  }
  logout() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve()
      }, (error) => {
        reject(error)

      });
    });

  }
  register(email, password, name) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Sign in....',
        duration: 4000
      });
      loading.present();
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("profiles/" + user.uid).set({
          name: name,
          email: email,
          contact: "",
          downloadurl: '../../assets/download.png',
          bio: "You have not yet inserted a description about your skills and abilities, update profile to get started.",
        })
        resolve();
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
        console.log(error);
      })
    })
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      // if(this.email == undefined || this.password == undefined){
      //   const alert = this.alertCtrl.create({
      //     subTitle: "This email is not registered, please sign up to continue.",
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // }
      // else{
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Sign in....',
        duration: 4000
      });
      loading.present();
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve();
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: [
            {
              text: 'ok',
              handler: data => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        alert.present();
      })
      // }
    })
  }
  retrieve() {
    let userID = firebase.auth().currentUser;
    return firebase.database().ref("profiles/" + userID.uid)
  }
  profile() {
    this.arr.length = 0;
    return new Promise((pass, fail) => {
      let userID = firebase.auth().currentUser;
      firebase.database().ref("profiles/" + userID.uid).on('value', (data: any) => {
        let details = data.val();
        this.arr.push(details);
        console.log(this.arr);
      })
      pass(this.arr);
    })
  }
  forgotpassword(email) {
    return new Promise((resolve, reject) => {
      if (email == null || email == undefined) {
        const alert = this.alertCtrl.create({
          subTitle: 'Please enter your Email.',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (email != null || email != undefined) {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
          const alert = this.alertCtrl.create({
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK']

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            subTitle: Error.message,
            buttons: ['OK']
          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        subTitle: error.message,
        buttons: [
          {
            text: 'ok',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    })
  }
  uploadPic(pic) {
    var name = Date.now();
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      firebase.storage().ref(name + "jpg").putString(pic, 'data_url').then(() => {
        accpt(name);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  storeToDB(name, category, picName, description, location, price) {
    var d = Date.now();
    return new Promise((accpt, rejc) => {
      var storageRef = firebase.storage().ref(name + "jpg");
      storageRef.getDownloadURL().then(url => {
        var user = firebase.auth().currentUser;
        var link = url;
        firebase.database().ref('uploads/').push({
          downloadurl: link,
          name: picName,
          category: category,
          uid: user.uid,
          description: description,
          location: location,
          price: price,
          likes: 0,
          comments: 0
        });
        accpt('success');
      }, Error => {
        rejc(Error.message);
        console.log(Error.message);
      });
    })
  }
  viewPicGallery() {
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads").on("value", (data: any) => {
        var DisplayData = data.val();
        accpt(DisplayData);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  getUserID() {
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("uploads").on("value", (data: any) => {
        var a = data.val();
        if (a !== null) {
        }
        accpt(user.uid);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  uploadProfilePic(pic, name) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    return new Promise((accpt, rejc) => {
      loading.present();
      firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
        accpt(name);
      }, Error => {
        rejc(Error.message)
      })
    })
  }

  storeToDB1(name) {
    return new Promise((accpt, rejc) => {
      this.arr.length = 0;
      var storageRef = firebase.storage().ref(name);
      storageRef.getDownloadURL().then(url => {
        console.log(url)
        var user = firebase.auth().currentUser;
        var link = url;
        firebase.database().ref('profiles/' + user.uid).update({
          downloadurl: link,
        });
        accpt('success');
      }, Error => {
        rejc(Error.message);
        console.log(Error.message);
      });
    })
  }
  storeImgur(url) {
    this.url = url;
  }


  storeName(name) {
    this.obj.name = name;
    console.log(this.obj.name);
  }
  viewPicGallery1() {
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("profiles").on("value", (data: any) => {
        var b = data.val();
        var keys = Object.keys(b);
        if (b !== null) {
        }
        this.storeImgur(b[keys[0]].downloadurl);
        console.log(b[keys[0]].downloadurl);
        accpt(b);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  getUserID1() {
    return new Promise((accpt, rejc) => {
      var userID = firebase.auth().currentUser
      firebase.database().ref("profiles").on("value", (data: any) => {
        var b = data.val();
        if (b !== null) {

        }
        console.log(b);
        accpt(userID.uid);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  selectCategory(category) {
    return new Promise((pass, fail) => {
      firebase.database().ref("uploads").on('value', (data: any) => {
        let uploads = data.val();
        if (data== null || data == undefined && this.arr2 == null ||  this.arr2 == undefined) {
          this.selectCategoryArr = null;
          console.log('empty');
        }
        else {
          this.selectCategoryArr.length = 0;
          var keys2: any = Object.keys(uploads);
          for (var i = 0; i < keys2.length; i++) {
            var k = keys2[i];
            var chckId = uploads[k].uid;
            if (category == uploads[k].category) {
              let obj = {
                uid: uploads[k].uid,
                name: uploads[k].name,
                category: uploads[k].category,
                comments: uploads[k].comments,
                downloadurl: uploads[k].downloadurl,
                location: uploads[k].location,
                price: uploads[k].price,
                likes: uploads[k].likes,
                url: this.url,
                username: "",
                email: uploads[k].email
              }
              this.selectCategoryArr.push(obj);
              this.viewProfileMain(chckId).then((profileData: any) => {
                obj.username = profileData.name
                obj.url = profileData.downloadurl
                obj.email = profileData.email
              });
            }
            else if (uploads[k].category == undefined || uploads[k].category == null) {
             console.log('nex');
            }
          }
        }
      }), pass(this.selectCategoryArr);
    })
  }
  update(name, email, contact, bio, downloadurl) {
    this.arr.length = 0;
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 3000
    });
    const toast = this.toastCtrl.create({
      message: 'data has been updated!',
      duration: 3000
    });
    loading.present();
    return new Promise((pass, fail) => {
      var user = firebase.auth().currentUser
      firebase.database().ref('profiles/' + user.uid).update({
        name: name,
        email: email,
        contact: contact,
        bio: bio,
        downloadurl: downloadurl,
      });
      toast.present();
    })
  }

  push(obj: obj) {
    return new Promise((pass, fail) => {
      firebase.database().ref("uploads").on('value', (data: any) => {
        let uploads = data.val();
        console.log(uploads);
        if (data == null) {
          this.arr = null;
        }
        else {
          var keys: any = Object.keys(uploads);
          for (var j = 0; j < keys.length; j++) {
            firebase.database().ref("uploads").on('value', (data2: any) => {
              let uploads2 = data2.val();
              console.log(uploads2);
              var keys2: any = Object.keys(uploads2);
              for (var i = 0; i < keys2.length; i++) {
                var k = keys2[i];
                var chckId = uploads[k].uid;
                if (this.arr == uploads[k].arr) {
                  let obj = {
                    name: uploads[k].name,
                    key: keys2,
                    downloadurl: uploads[k].downloadurl,
                    url: uploads[k].downloadurl,
                    comments: uploads[k].comments,
                    description: uploads[k].description,
                    location: uploads[k].location,
                    price: uploads[k].price,
                    email: uploads[k].email,
                    likes: data[k].likes,
                    username: uploads[k].username
                  }
                  this.arr.push(obj);
                  console.log(this.arr);
                  this.viewProfileMain(chckId).then((profileData: any) => {
                    obj.email = profileData.email
                    obj.username = profileData.name
                  });
                }
                pass(this.arr);
              }
              this.storeImgur(data[keys2[0]].downloadurl);
              console.log(data[keys2[0]].downloadurl);
            }), pass(this.arr);
          }
        }
      })
    })
  }
  viewPicMain(name, username) {
   
    return new Promise((accpt, rejc) => {
      firebase.database().ref("uploads").on("value", (data: any) => {
        var data = data.val();
        if (data == null ||data == undefined &&   this.arr2 == null ||  this.arr2 == undefined) {
          this.arr2 = null;
        } 
        else {
          this.arr2.length = 0;
          var keys1: any = Object.keys(data);
          for (var i = 0; i < keys1.length; i++) {
            var keys1: any = Object.keys(data);
            for (var i = 0; i < keys1.length; i++) {
              var keys1: any = Object.keys(data);
              var k = keys1[i];
              var chckId = data[k].uid;
              let obj = {
                uid: data[k].uid,
                category: data[k].category,
                comments: data[k].comments,
                downloadurl: data[k].downloadurl,
                description: data[k].description,
                location: data[k].location,
                price: data[k].price,
                likes: data[k].likes,
                name: data[k].name,
                username: "",
                email: "",
                key: k,
                url: this.url,
              }
              this.arr2.push(obj);
              console.log(this.arr2);
              this.viewProfileMain(chckId).then((profileData: any) => {
                obj.username = profileData.name
                obj.email = profileData.email
                obj.url = profileData.downloadurl
              });
              accpt(this.arr2);
              this.storeImgur(data[keys1[0]].downloadurl);
            }
          }
        }
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  viewProfileMain(userid: string) {
    return new Promise((accpt, rejc) => {
      firebase.database().ref("profiles/" + userid).on("value", (data: any) => {
        var a = data.val();
        accpt(a);
      }, Error => {
        rejc(Error.message)
      })
    })
  }
  comments(key: any, comment: any) {
    var user = firebase.auth().currentUser;
    return new Promise((accpt, rejc) => {
      var day = moment().format('MMMM Do YYYY, h:mm:ss a');
      firebase.database().ref('comments/' + key).push({
        comment: comment,
        uid: user.uid,
        date: day,
        url: this.url
      })
      accpt('success');
    });

  }
  viewComments(key: any, comment: string) {
    this.keyArr.length = 0;
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("comments/" + key).on("value", (data: any) => {
        var CommentDetails = data.val();
        if (data.val() == null) {
          this.arr2 = null;
        }
        else {
          var keys1: any = Object.keys(CommentDetails);
          console.log(keys1);
          for (var i = 0; i < keys1.length; i++) {
            var key = keys1[i];
            var chckId = CommentDetails[key].uid;
            let obj = {
              comment: CommentDetails[key].comment,
              uid: user.uid,
              url: this.url,
              date: moment(CommentDetails[key].date, 'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
              username: ""
            }
            accpt(this.keyArr);
            this.viewProfileMain(chckId).then((profileData: any) => {
              obj.url = profileData.downloadurl
              obj.username = profileData.name
              this.keyArr.push(obj);
              console.log(this.keyArr);
            });
          }
        }
      }, Error => {
        rejc(Error.message)
      })

    })
  }
  addNumOfComments(key, numComments) {
    numComments = numComments + 1;
    return new Promise((accpt, rej) => {
      firebase.database().ref('uploads/' + key).update({ comments: numComments });
      accpt('comment added')
    })
  }
  likePic(key) {
    console.log(key);
    var user = firebase.auth().currentUser
    return new Promise((accpt, rejc) => {
      firebase.database().ref('likes/' + key).push({
        uid: user.uid
      })
      accpt('success');
    })
  }
  viewLikes(key) {
    this.keyArr.length = 0;
    return new Promise((accpt, rejc) => {
      var user = firebase.auth().currentUser
      firebase.database().ref("likes/" + key).on("value", (data: any) => {
        if (data.val() != undefined) {
          var likes = data.val();
          var results = ""
          var keys = Object.keys(likes);
          for (var x = 0; x < keys.length; x++) {
            firebase.database().ref("likes/" + key + '/' + keys[x]).on("value", (data2: any) => {
              if (data2.val() != undefined) {
                if (user.uid == data2.val().uid) {
                  results = keys[x];
                  accpt(results);
                }
                else {
                  results = "not found";
                }
              }
            })
          }
          accpt(results)
        }
        else {
          accpt("not found")
        }
      }, Error => {
        rejc(Error.message)
      })

    })
  }
  addNumOfLikes(key, num) {
    console.log(key)
    num = num + 1;
    return new Promise((accpt, rej) => {
      firebase.database().ref('uploads/' + key).update({ likes: num });
      accpt('like added')
    })
  }
  removeLike(key: any, num, key1) {
    console.log(key1)
    num = num - 1;
    var user = firebase.auth().currentUser
    console.log(user.uid)
    return new Promise((accpt, rej) => {
      firebase.database().ref('uploads/' + key).update({ likes: num });
      firebase.database().ref('likes/' + key + '/' + key1).remove();
      accpt('like removed')
    })
  }


  RemoveUploadedPicture(key) {
    return new Promise((accpt, rej) => {
      this.arr.length = 0;
      firebase.database().ref('uploads/' + key).remove();
      accpt('image deleted')
    })
  }
  LicenceContract() {
    var user = firebase.auth().currentUser
    firebase.database().ref('contract/').set({

    })
  }

  returnUID() {
    var user = firebase.auth().currentUser;
    return user.uid;
  }

}
