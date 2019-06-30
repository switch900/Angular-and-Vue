import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AboutPage }        from './app.about';
import { MainPage } from './app.main';


const appRoutes: Routes = [  
    { path: 'main', component: MainPage },  
    { path: 'about', component: AboutPage },  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);