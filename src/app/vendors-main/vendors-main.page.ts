import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    private http: HttpClient,

  ) { }


  width = window.innerWidth;
  signup: boolean = false;
  email: string;
  password: string;
  username: string;
  showLogin: boolean = false;
  companyAdress: string;
  companyPhone: number;


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
    else if (!this.companyAdress) {
      alert('empty field')
    }
    else if (!this.companyPhone) {
      alert('empty field')
    }
    else if (!this.selectedcat) {
      alert('select a category')
    }
    else if (!this.imageURL) {
      alert('bharway image daal')
    }
    else {
      alert('yu made it asshole')
      this.firebaseauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
          const authsub = this.firebaseauth.authState.subscribe(cuser => {
            this.currentUserID = cuser.uid;
            const userID = this.currentUserID;
            const timestamp = new Date()
            const name = this.username.toLocaleLowerCase()
            const phone = this.companyPhone
            const adress = this.companyAdress
            const accountstatus = 'approved'
            const category = this.cates;
            const imageURL = this.imageURL
            this.firestore.collection('vendors').doc(this.currentUserID).set({
              userID,
              timestamp,
              name,
              phone,
              adress,
              accountstatus,
              category,

            }).then(() => {
              alert('tadaa')
            })
          })
        })
      })
    }
  }
  cateegories: any;
  selectedcat;
  cates: any = [];

  choosecat(selected: string) {
    this.selectedcat = selected
    alert(this.selectedcat)
    if (this.selectedcat) {
      this.cates.push(this.selectedcat)
    }
    else {
      alert('lol')
    }
  }


  delete(index) {
    alert('cliecked' + index)
    this.cates.splice(index, 1)
  }

  getCategories() {
    const cats = this.firestore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.cateegories = data.Df.sn.proto.mapValue.fields;
      console.log('lylo', this.cateegories);
      console.log('dekho', this.cateegories.cats.arrayValue.values[0].stringValue);

      cats.unsubscribe();
    })
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
  selectedFiles: FileList;
  currentFile: File;
  msg;
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://134.122.2.23/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  imageURL: string;
  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0].name);
    this.imageURL = 'https://134.122.2.23/vendors/' + this.selectedFiles[0].name
    console.log(this.imageURL);
    this.upload()
  }

  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile,).subscribe(response => {
      if (response instanceof HttpResponse) {
        alert(response.body);
      }
    });
    return;
  }


  ngOnInit() {
    this.getCategories()
  }

}
