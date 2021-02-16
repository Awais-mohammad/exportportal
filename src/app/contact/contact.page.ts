import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  @ViewChild("name") name: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("website") website: ElementRef;
  @ViewChild("phone") phone: ElementRef;
  @ViewChild("message") message: ElementRef;

  constructor(
    private firebaseauth: AngularFireAuth,
    private firestore: AngularFirestore

  ) { }

  ngOnInit() {

  }


  getValue() {

    console.log(this.email.nativeElement.value);
    console.log(this.name.nativeElement.value);
    console.log(this.phone.nativeElement.value);
    console.log(this.message.nativeElement.value);
    console.log(this.website.nativeElement.value);
    if (!this.email.nativeElement.value) {
      alert('invalid field........')
    }
    else if (!this.name.nativeElement.value) {
      alert('invalid field........')
    }
    else if (!this.phone.nativeElement.value) {
      alert('invalid field........')
    }
    else if (!this.message.nativeElement.value) {
      alert('invalid field........')
    }
    else if (!this.website.nativeElement.value) {
      alert('invalid field........')
    }
    else {
      const senderName = this.name.nativeElement.value
      const senderEmail = this.email.nativeElement.value
      const senderWebsite = this.website.nativeElement.value
      const senderPhone = this.phone.nativeElement.value
      const senderMessage = this.message.nativeElement.value
      const sentAt = new Date()
      const docID = firebase.firestore().collection('contactform').doc().id
      this.firestore.collection('contactform').doc(docID).set({
        senderName,
        senderEmail,
        senderWebsite,
        senderPhone,
        senderMessage,
      }).then(() => {
        alert('form sent')
        this.name.nativeElement.value = ''
        this.email.nativeElement.value = ''
        this.website.nativeElement.value = ''
        this.phone.nativeElement.value = ''
        this.message.nativeElement.value = ''

      }).catch(err => {
        alert(err.message)
      })
    }
  }

}
