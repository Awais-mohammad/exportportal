import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,

  ) { }

  //variables
  signup: boolean = false;
  email: string;
  password: string;
  username: string;

  showHideSignup() {
    this.signup = !this.signup
    this.email = ''
    this.password = ''
  }

  currentUserID: string;
  generateDocID() {
    const ID = firebase.firestore().collection('users').doc().id;
    return ID;
  }

  register() {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
      this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        const authsub = this.firebaseauth.authState.subscribe(cuser => {
          this.currentUserID = cuser.uid;
          const docID = this.generateDocID()
          const userID = this.currentUserID;
          const timestamp = new Date()
          const userName = this.username

          this.firestore.collection('usersdata').doc(docID).set({
            docID,
            userID,
            timestamp,
            userName,
          }).then(() => {
            alert('user created sucessfully')

          }).catch(e => {
            alert(e.message)
          })

        })
      })
    })
  }

  login() {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
      console.log('user logged in')
      this.firebaseauth.authState.subscribe(res => {
        this.currentUserID = res.uid
        console.log('user id is' + this.currentUserID);
        this.router.navigate(['productsaddition'])
      })
    })
  }



  ngOnInit() {
  }

}
