import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private afs: AngularFireAuth,
    private firestore: AngularFirestore,
    private menu: MenuController,
  ) { }

  width = window.innerWidth;
  activePath: string;
  menuOpen: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  
  openFirst() {
    this.menu.open();
  }

  closeFirst() {
    this.menu.close('first');
  }

  async checkRoute() {
    setInterval(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
    }, 100)
  }
  loggedIn: boolean = false;
  currentUID: string;
  currentUserData: any;

  getcurrentUserData() {
    this.firestore.collection('vendors').doc(this.currentUID).valueChanges().subscribe(data => {
      this.currentUserData = data;
      console.log(this.currentUserData);

    })
  }

  ngOnInit() {
    this.checkRoute();
    const authsub = this.afs.authState.subscribe(user => {
      if (user && user.uid) {
        this.currentUID = user.uid
        this.loggedIn = true
        this.getcurrentUserData()
      }
      else {
        this.loggedIn = false;
      }
    })
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
      this.activePath = this.router.url.slice(1, this.router.url.length);
      console.log(this.activePath);
    });
  }

}
