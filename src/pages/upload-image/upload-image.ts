import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { StreetartzProvider } from '../../providers/streetart-database/streetart-database';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {
  url='../../assets/default.jpg' ;
  name;
  category;
  imageUrl;
  arr=[];
  description;
  location;
  price;
  constructor(public navCtrl: NavController, public navParams: NavParams,public art: StreetartzProvider,public view :ViewController,public alertCtrl: AlertController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadModalPage');
  }

  insertvid(event:any){
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        console.log(reader.onload);
      } 
  }

  uploadPicture(){
    if(this.category !=null || this.description !=null || this.name !=null || this.location !=null || this.price !=null){
      this.art.uploadPic(this.url,this.name).then(data =>{
        this.art.storeToDB(data, this.category,this.name,this.description,this.location,this.price).then(() =>{
          console.log('added to db');
          this.navCtrl.setRoot(ProfilePage);
        },
       Error =>{
         console.log(Error)
       })
     }, Error =>{
       console.log(Error )
     })
   }
   else{
    const confirm = this.alertCtrl.create({
      message: 'Please enter all details to upload your image',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
      ]
    });
    confirm.present();
   }
  
    }
    

    dismiss(){
      this.view.dismiss();
    }
}
   
