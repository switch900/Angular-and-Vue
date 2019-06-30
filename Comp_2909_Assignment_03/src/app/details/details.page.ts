import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage{

  items: string[] = [];
  source: any;
  id: any;

  constructor(private route: ActivatedRoute,private storage: Storage) { 
  }

  ionViewWillEnter(){

    this.id = this.route.snapshot.paramMap.get('id');
    this.storage.get('newsItem').then((val) => {
      this.items = val;
    });    
  }
}
