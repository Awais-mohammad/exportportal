import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  constructor() { }

  //variables
  signup: boolean = false;

  showHideSignup() {
    this.signup = !this.signup
  }

  ngOnInit() {
  }

}
