import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEY  = '46908d88d3f05e05db58d76f527cc2b8'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY;              
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';

@Component({
    selector: 'app-root',
    templateUrl: './app.main.html',
})
  
export class MainPage {

    _movieArray: Array<any>;
    _genreArray: Array<any>;
    _http:HttpClient;
    page=1;
    totalPages:number;
    url=BASE_URL;
    genreId='';
    defaultSelectBox ='Choose a genre';

    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {      
        this.getGenres();
        this.buildURL();
        this.getMovies();
    }

    //get date range to search by
    getDateRange() {
        let today = new Date();
        this.url+='&primary_release_date.lte=' + this.getFormattedDate(today);
        let thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate( thirtyDaysAgo.getDate() - 30 );
        this.url += '&primary_release_date.gte='+ this.getFormattedDate(thirtyDaysAgo);    
    }

    //return formatted date
    getFormattedDate(dt:Date) {
        let formattedMonth = '';
        if(dt.getMonth()<10){
            formattedMonth = '0'+(Number(dt.getMonth()) + 1);
        }
        else{
            formattedMonth = (Number(dt.getMonth()) + 1).toString();
        }       
        return dt.getFullYear() + '-'+ formattedMonth + '-'+ dt.getDate(); 
    }

    //build URL to search
    buildURL(){
        this.getDateRange();
        this.url += '&page='+this.page+'&with_genres='+this.genreId;
    }

    getMovies() {
        this._http.get<any>(this.url)
          // Get data and wait for result.
          .subscribe(data => {
              this.page          = data.page;
              this.totalPages     = data.total_pages;
              this._movieArray  = data.results;
          }, 
          error =>{
            // Let user know about the error.
            alert(error);
            console.error(error)
          })
    }

    getGenres() {
        this._http.get<any>(GENRE_URL)
        // Get data and wait for result.
        .subscribe(data => {
            this._genreArray = data.genres;
        }, 

        error =>{
          // Let user know about the error.
          alert(error);
          console.error(error)
        })
    }

    //increase pagination when plus button is pushed
    pageIncrement(){
        if(this.page<(this.totalPages)){
            this.page++;
        }
        this.ngOnInit();
    }

    //decrease pagination when minus button is pushed
    pageDecrement(){
        if(this.page>1){
            this.page--;
        }
        this.ngOnInit();
    }

    //select Genre to filter search results by
    selectGenre(value: any) {
        for(var x=0; x<this._genreArray.length;x++){
            if(this._genreArray[x].name==value){
                this.genreId=this._genreArray[x].id;
                this.page=1;
            }
        } 
        this.ngOnInit();
    }
}

