import { ModuleWithProviders } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './login/home.component';

const appRoutes: Routes = [

    {path: '', component: AppComponent},
    {path: 'login', component: AppComponent},
    {path: 'home', component: HomeComponent},


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
