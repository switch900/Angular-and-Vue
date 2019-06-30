import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailsPage } from '../details/details.page';
import { Storage } from '@ionic/storage';


const API_KEY = '7481abe2266a4540a2110aa5d1a86934';

const BASE_URL = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=7481abe2266a4540a2110aa5d1a86934';// + API_KEY;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    date = new Date();
    _newsArray: Array<any>;
    _selectedItem: any;
    page=1;
    totalPages:number;
    _http:HttpClient;
    url=BASE_URL;
    // var req = new Request(url);
    // fetch(req)
    //     .then(function(response) {
    //         console.log(response.json());
    //     })

  constructor(private http: HttpClient,private storage: Storage) {
    this._http = http;
}

ngOnInit(){
  this._selectedItem = null;
  this.getNews();

}

  getNews() {
       this._http.get<any>(this.url)
          .subscribe(data => {
              this.page          = data.page;
              this.totalPages     = data.total_pages;
              this._newsArray  = data.articles;          
          }, 
          error =>{
            alert(error);
            console.error(error)
          })
    }

    onSelect(item: DetailsPage): void {
      this._selectedItem  = item;
      this.storage.set('newsItem', item);
    }

}
