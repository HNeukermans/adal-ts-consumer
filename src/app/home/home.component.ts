import { Component } from '@angular/core';
import { Authentication, AdalConfig } from 'adal-ts';
import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {

  user: any;
  disableLogout: boolean = false;
  disableLogin: boolean = false;

  constructor(public appState: AppState, public title: Title) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    
  }

 
  login() {
    console.log('login');
    
    let context = Authentication.getContext(this.createConfig());
    this.disableLogin = context.getUser() != null;
    
    if(this.disableLogin == false)  context.login();

  }

  logout() {
    console.log('logout');
    
    let context = Authentication.getContext(this.createConfig());
    let loggedInUser = context.getUser(); 
    this.disableLogout = loggedInUser == null;

    if(this.disableLogout == false)  context.logout();

  }

  getUser() :void {
    console.log('logout');
    
    let context = Authentication.getContext(this.createConfig());
    this.user = context.getUser();

  }

  private createConfig() :AdalConfig {
    let config: AdalConfig = {
      tenant: 'hneu70532.onmicrosoft.com',
      clientId: '61bdbb45-a004-48e3-98d9-e4f1740661c8',
      postLogoutRedirectUrl: window.location.origin + '/',
      //postLogoutRedirectUri: window.location.origin + '/',
      redirectUri: window.location.origin + '/'
    };
    return config;
  }
}
