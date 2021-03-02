import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

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
    private firebaseauth: AngularFireAuth,
  ) { }

  width = window.innerWidth;
  activePath: string;
  menuOpen: boolean;
  showOptions: boolean = false;
  pages: any[] = ['home', 'products', 'categories', 'exporters-list', 'about', 'contact'];
  openLoginForm: boolean = false;
  email: string;
  password: string;
  currentUserID: string;


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

  showOptions2() {
    this.showOptions = !this.showOptions;
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

  logout() {
    this.afs.auth.signOut();
    this.goToPage('home')

    this.showOptions = false;
  }

  toggleForm() {
    this.openLoginForm = !this.openLoginForm
    if (this.toggleForm) {
      this.menu.close()
    }
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
      this.menu.close();
    });
  }

  login() {

    if (!this.email) {
      alert('Field cannot be left blank')
    }
    else if (!this.password) {

      alert('Field cannot be left blank')
    }
    else {
      this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        console.log('user logged in')

        this.firebaseauth.authState.subscribe(res => {
          if (res) {
            if (res && res.uid) {
              this.currentUserID = res.uid
              console.log('user id is' + this.currentUserID);
              this.router.navigate(['vendors-dashboard'])
              this.openLoginForm = !this.openLoginForm;
            }
          }
        })

      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }

}
