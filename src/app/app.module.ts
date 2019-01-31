import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from './login/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {appRoutingProviders, routing} from './app.routing';
import {CookieService} from 'ngx-cookie-service';
import {ChartsModule} from 'ng2-charts';

const config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Facebook-App-Id")
    }
]);
export function provideConfig() {
    return config;
}
@NgModule({
  declarations: [
    AppComponent,
      HomeComponent
  ],
  imports: [
    BrowserModule,
      routing,
      NgbModule,
      SocialLoginModule,
      ChartsModule
  ],
  providers: [
      {
    provide: AuthServiceConfig,
    useFactory: provideConfig
      },
      appRoutingProviders,
      CookieService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
