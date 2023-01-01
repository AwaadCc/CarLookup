import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: string = "";
  decodeVINUrl: string = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/";
  fmt: string = "?format=json";
  decodeURL: string = "https://auto.dev/api/vin/";
  apikey: string = "?apikey=ZrQEPSkKYXdhYWRjODM4QGdtYWlsLmNvbQ==";
  list: any;
  mydata: any;
  carinfo: any;
  carbody: any;
  carengine: any;
  cardeets: any;
  mylist: any;
  carinoptions: any;
  carexoptions: any;
  constructor(private loadingCtrl: LoadingController, private alertController: AlertController, private dataService: DataService) {}
  
  getVIN() {
    if(this.name.length != 17) {
      console.log("ERROR!");
      this.invalidVINAlert();
    } else {
      
      var temp = this.decodeVINUrl + this.name + this.fmt;
      var temp2 = this.decodeURL + this.name + this.apikey;
      this.dataService.findVIN(temp).subscribe(data => {
        this.list = data;
      });
      this.dataService.findVIN(temp2).subscribe(data => {
        this.mylist = data;
      });
      this.showVINLoading();
      
    }
    
  }

  loadData() {
    this.mydata = this.list.Results;
    this.carinfo = this.mydata.splice(7,20);
    this.carbody = this.mydata.splice(7,40);
    this.carengine = this.mydata.splice(7,23);
    this.cardeets = this.mydata.splice(7);
    var temp = this.mylist['options'];
    this.carinoptions = temp[0];
    this.carinoptions = this.carinoptions['options'];
    this.carexoptions = temp[1];
    this.carexoptions = this.carexoptions['options'];
    console.log(this.carexoptions);
  }

  async invalidVINAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid VIN',
      message: 'Please input a valid vin',
      buttons: [{
        text: 'OK',
      }], 
    });

    await alert.present();
  }

  async showVINLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Finding VIN',
      duration: 2000,
    });
    loading.present();
    setTimeout(() => {
      this.loadData();
    }, 2000)
  }

}
