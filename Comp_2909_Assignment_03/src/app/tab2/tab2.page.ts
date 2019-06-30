import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    title = 'My Laundry List';
    newarray:Array<any>;    
    items: string[] = [];
    item: string;
    totalItems = this.items.length;

    constructor(public storage : Storage, public loadingController: LoadingController) {
      this.presentLoading();
      this.storage.get('listitems').then((val)=>{
        console.log(val);
        this.items = val;
        this.totalItems = this.items.length;
      });   
    }
      
    addItem() {
      this.items.push(this.item);
      let jsonString = JSON.stringify(this.items);
      this.newarray = JSON.parse(jsonString);
        
      this.storage.set('listitems',this.newarray).then(data => {        
        this.item = "";
        this.displayData();
      });   
      this.totalItems = this.items.length;
    }

    deleteItem(item) {
      this.storage.remove(item);
        var index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        let jsonString = JSON.stringify(this.items);
        this.newarray = JSON.parse(jsonString);
        this.storage.set('listitems',this.newarray);
        this.totalItems = this.items.length;
    }

    sortItems(){
      this.items.sort();
    }

    displayData(){       
      for(var i=0; i<this.newarray.length; i++) {   
      alert(i + " " + this.newarray[i]);    
      }
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Loading your grocery list',
        duration: 2000
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
}
