import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Title } from '@angular/platform-browser';

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
    private firestore: AngularFirestore,
    private titleService: Title,

  ) { }

  notification: boolean = false;

  getValue() {
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
        this.name.nativeElement.value = ''
        this.email.nativeElement.value = ''
        this.website.nativeElement.value = ''
        this.phone.nativeElement.value = ''
        this.message.nativeElement.value = ''
        this.notification = true
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.titleService.setTitle("Contact us - Export Portal");
    try {
      document.querySelector("meta[name='description']").remove();
    } catch (e) {
    }
    try {
      document.querySelector("meta[name='keywords']").remove();
    } catch (e) {

    }

    var keywords = document.createElement('meta');
    keywords.name = "keywords";
    keywords.content = "export portal, export portal pakistan, exportportal contact, exporters list pakistan, pakistan exporters ";
    document.getElementsByTagName('head')[0].appendChild(keywords);
  }

}
