import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-vendors-main',
  templateUrl: './vendors-main.page.html',
  styleUrls: ['./vendors-main.page.scss'],
})
export class VendorsMainPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,
  ) { }


  width = window.innerWidth;
  signup: boolean = false;
  email: string;
  password: string;
  username: string;
  showLogin: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  showHideLoginForm() {
    this.showLogin = !this.showLogin;
  }

  currentUserID: string;
  generateDocID() {
    const ID = firebase.firestore().collection('vendors').doc().id;
    return ID;
  }

  register() {
    if (!this.username) {
      alert('empty field')
    }
    else if (!this.email) [
      alert('empty field')
    ]
    else if (!this.password) {
      alert('empty field')
    }
    else {
      this.firebaseauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
          const authsub = this.firebaseauth.authState.subscribe(cuser => {
            this.currentUserID = cuser.uid;
            const userID = this.currentUserID;
            const timestamp = new Date()
            const Name = this.username

            this.firestore.collection('vendors').doc(userID).set({

              userID,
              timestamp,
              Name,
            }).then(() => {
              alert('user created sucessfully')
              this.router.navigate(['vendors-dashboard'])

            }).catch(e => {
              alert(e.message)
            })

          })
        })
      })
    }
  }

  login() {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
      console.log('user logged in')
      this.firebaseauth.authState.subscribe(res => {
        this.currentUserID = res.uid
        console.log('user id is' + this.currentUserID);
        this.router.navigate(['vendors-dashboard'])
      })
    })
  }


  ngOnInit() {
  }

}
