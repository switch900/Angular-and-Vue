import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { AboutPage } from './app.about';
import { MainPage } from './app.main';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { routing } from './app.routing';
import { ChildComponent } from './app.child';



@NgModule({
  declarations: [
    AppComponent, AboutPage,MainPage, ChildComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, FlexLayoutModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

