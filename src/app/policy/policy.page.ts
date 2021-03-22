import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})

export class PolicyPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(private location: Location,) { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  
  scrollToBot() {
    this.content.scrollToBottom(1000);
  }


  ionViewWillEnter() {
    window.location.href = "policy#Disclaimer";
    this.content.scrollToTop(400);
  }

}
