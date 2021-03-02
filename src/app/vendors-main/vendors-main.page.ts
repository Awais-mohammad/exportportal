import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-vendors-main',
  templateUrl: './vendors-main.page.html',
  styleUrls: ['./vendors-main.page.scss'],
})
export class VendorsMainPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  constructor(
    private firestore: AngularFirestore,
    private firebaseauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    public loadingController: LoadingController,
    public toastControll: ToastController,

  ) { }


  width = window.innerWidth;
  signup: boolean = false;
  email: string;
  password: string;
  username: string;
  showLogin: boolean = false;
  companyAdress: string;
  companyPhone: number;
  registersection: boolean = false;
  webURL: string;
  loadermsg: string;
  loaderID: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  showHideLoginForm() {
    this.registersection = !this.registersection
    this.scrollTo('form')
  }

  //loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: this.loadermsg,
      spinner: 'dots',
      id: this.loaderID,
      mode: "ios",

    });
    await loading.present();
  }
  //show toast
  async presentToast() {
    const toast = await this.toastControll.create({
      //  message: this.msg,
      duration: 2000,
      position: 'bottom',
      mode: 'ios',
      color: 'dark',
    });
    toast.present();
  }

  currentUserID: string;
  generateDocID() {
    const ID = firebase.firestore().collection('vendors').doc().id;
    return ID;
  }

  scrollTo(elementId: string) {
    let yOffset = document.getElementById(elementId).offsetTop;
    this.content.scrollToPoint(0, yOffset, 5000)
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
    else if (!this.webURL) {
      alert('website cannot be ledt blank')
    }
    else {

      this.email = this.email.toLocaleLowerCase()

      this.firebaseauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
          const authsub = this.firebaseauth.authState.subscribe(cuser => {
            this.currentUserID = cuser.uid;
            const userID = this.currentUserID;
            const timestamp = new Date()
            const name = this.username.toLocaleLowerCase()
            const phone = this.companyPhone
            const adress = this.companyAdress.toLocaleLowerCase()
            const accountstatus = 'approved'
            const category = this.cates;
            const companyEmail = this.email.toLocaleLowerCase()
            const imageURL = this.imageURL
            const websiteURL = this.webURL
            this.firestore.collection('vendors').doc(this.currentUserID).set({
              userID,
              timestamp,
              name,
              phone,
              adress,
              accountstatus,
              category,
              companyEmail,
              imageURL,
              websiteURL
            }).then(() => {
              alert('user created')
              this.restoperation()
            }).catch(err => {
              alert(JSON.stringify(err.message))
            })
          })
        })
      })
    }
  }
  cateegories: any;
  selectedcat;
  cates: any = [];


  restoperation() {
    alert('ok lets see')
    const userID = this.currentUserID;
    const timestamp = new Date()
    const name = this.username.toLocaleLowerCase()
    const phone = this.companyPhone
    const adress = this.companyAdress.toLocaleLowerCase()
    const accountstatus = 'approved'
    const category = this.cates;
    const companyEmail = this.email.toLocaleLowerCase()
    const imageURL = this.imageURL
    const websiteURL = this.webURL
    for (var i = 0; i < this.cates.length; i++) {

      this.firestore.collection('products').doc(this.cates[i]).get().subscribe(res => {
        if (res.exists) {

          this.yesexists()
        }
        else {
          this.notexists()
        }
      })

    }
  }
  yesexists() {

    for (var i = 0; i < this.cates[i].length; i++) {
      const userID = this.currentUserID;
      const timestamp = new Date()
      const name = this.username.toLocaleLowerCase()
      const phone = this.companyPhone
      const adress = this.companyAdress.toLocaleLowerCase()
      const accountstatus = 'approved'
      const category = this.cates;
      const companyEmail = this.email.toLocaleLowerCase()
      const imageURL = this.imageURL
      const websiteURL = this.webURL
      this.firestore.collection('products').doc(this.cates[i]).update({
        vendors: firebase.firestore.FieldValue.arrayUnion(
          {
            userID,
            timestamp,
            name,
            phone,
            adress,
            accountstatus,
            category,
            companyEmail,
            imageURL,
            websiteURL
          }
        )
      }).then(() => {
        alert('vendor regisetered')
      }).catch(err => {
        alert(JSON.stringify(err.message))

      })
    }
  }

  notexists() {
    for (var i = 0; i < this.cates.length; i++) {

      const userID = this.currentUserID;
      const timestamp = new Date()
      const name = this.username.toLocaleLowerCase()
      const phone = this.companyPhone
      const adress = this.companyAdress.toLocaleLowerCase()
      const accountstatus = 'approved'
      const category = this.cates;
      const companyEmail = this.email.toLocaleLowerCase()
      const imageURL = this.imageURL
      const websiteURL = this.webURL
      this.firestore.collection('products').doc(this.cates[i]).set({
        vendors: firebase.firestore.FieldValue.arrayUnion(
          {
            userID,
            timestamp,
            name,
            phone,
            adress,
            accountstatus,
            category,
            companyEmail,
            imageURL,
            websiteURL
          }
        )
      }).then(() => {
        alert('vendor regisetered')
      }).catch(err => {
        alert(JSON.stringify(err.message))

      })
    }
  }

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

      cats.unsubscribe();
    })
  }

  login() {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
      this.firebaseauth.authState.subscribe(res => {
        this.currentUserID = res.uid
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
    this.loaderID = 'upimg'
    this.loadermsg = 'FETCHING!!!!!'
    this.presentLoading()
    this.imageURL = 'https://134.122.2.23/vendors/' + this.selectedFiles[0].name;
    this.upload()
  }

  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile,).subscribe(response => {
      if (response instanceof HttpResponse) {
        alert(response.body);
        this.loadingController.dismiss('upimg')
      }
    });
    return;
  }


  ngOnInit() {
    this.getCategories()
  }

}
