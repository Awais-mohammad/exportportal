import { ExporterPage } from './../exporter/exporter.page';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-vendors-dashboard',
  templateUrl: './vendors-dashboard.page.html',
  styleUrls: ['./vendors-dashboard.page.scss'],
})
export class VendorsDashboardPage implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
    private http: HttpClient,
    private auth: AngularFireAuth,
    private Router: Router,
    public loadingController: LoadingController,
    public toastControll: ToastController,
    private modal: ModalController,

  ) { }

  categories: any;
  selectedcat: string = "automotive";
  temp: any;
  cats: any[];
  subCats: string;
  width = window.innerWidth;
  prodName: string;
  prodDescription: string;
  showproductFrom: boolean = false;
  loadermsg: string;
  loaderID: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
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
  async openProfilePage() {


    const model = await this.modal.create({
      component: ExporterPage,
      cssClass: "my-custom-modal-css",
      id: "displayshop",
      componentProps: {
        ExporterID: this.currentUID
      },
    });
    return await model.present();
  }
  getCats() {
    this.fireStore.collection('appData').doc('categories').valueChanges().subscribe((data: any) => {
      this.categories = data;
      this.temp = data
      this.cats = this.categories.cats;

    })
  }

  choosecat(selested: string) {
    this.selectedcat = selested
    alert(this.selectedcat)

  }

  showHideProdcutsAdditionForm() {
    this.showproductFrom = !this.showproductFrom
  }
  choosesubcat(selested: string) {
    this.subCats = selested
    alert(this.subCats)
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
    this.imageURL = 'https://134.122.2.23/vendors/' + this.selectedFiles[0].name
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


  getDocID(doc, subcol) {
    const docID = firebase.firestore().collection('products').doc(doc).collection(subcol).doc().id
    return docID
  }

  addRecord() {

    if (!this.selectedcat) {
      alert('choose a category')
    }
    else if (!this.subCats) {
      alert('choose a sub category')

    }
    else if (!this.prodName) {
      alert('Add Product description')
    }
    else if (!this.prodName) {
      alert('add description of product')
    }
    else if (!this.imageURL) {
      alert('choose an image')
    }
    else {

      const docID = this.getDocID(this.selectedcat, this.subCats)
      const productName = this.prodName
      const productDescription = this.prodDescription
      const addedAt = new Date()
      const uploadedBy = this.currentUID
      const imageURL = this.imageURL
      const status = 'approved'
      this.fireStore.collection('products').doc(this.selectedcat).collection(this.subCats).doc(docID).set({
        docID,
        productName,
        productDescription,
        addedAt,
        uploadedBy,
        imageURL
      }).then(() => {

        const prodDocID = firebase.firestore().collection('vendors').doc(this.currentUID).collection('products').doc().id;
        const docID = prodDocID
        this.fireStore.collection('vendors').doc(this.currentUID).collection('products').doc(prodDocID).set({
          docID,
          productName,
          productDescription,
          addedAt,
          uploadedBy,
          imageURL
        }).then(hi => {
          alert('data added')
        })

      }).catch(err => {
        alert(err.message)
      })

    }
  }
  showCats: string[] = [];
  products: any[] = [];
  cat: string = "automotive";
  subCat: string;
  cateegories: any;
  acategory: any


  changeProds() {

    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.cateegories = data.Df.sn.proto.mapValue.fields;
      this.amethod()
      cats.unsubscribe();
    })

  }
  amethod() {

    for (var i = 0; i < this.cateegories['cats'].arrayValue.values.length; i++) {
      this.getProds2(this.cateegories['cats'].arrayValue.values[i].stringValue);
    }
  }
  getProds2(cat: string) {
    for (var i = 0; i < this.cateegories[cat].arrayValue.values.length; i++) {
      const subCat = this.cateegories[cat].arrayValue.values[i].stringValue;
      const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
        if (data.empty == false) {
          for (var k = 0; k < data.docs.length; k++) {
            if (data.docs[k].Df.sn.proto.mapValue.fields != undefined) {
              this.push(data.docs[k].Df.sn.proto.mapValue.fields.uploadedBy.stringValue, data.docs[k].ref.path)
            }
            if (k == data.docs.length - 1) {
              getDocs.unsubscribe();
            }
          }
        }
      })
    }
  }

  push(docID, path) {
    const subcolPath = path
    this.fireStore.collection('vendors').doc(docID).update({
      products: firebase.firestore.FieldValue.arrayUnion(
        subcolPath
      )
    }).then(() => {

    })
  }
  currentUID: string;
  document: any;
  getProducts() {
    this.fireStore.collection('vendors').doc(this.currentUID).collection('products').get().subscribe(dat => {
      if (dat.empty) {
        alert('ahmmm nothing found')
      }
      else {
        this.document = dat

      }
    })
  }

  ngOnInit() {
    this.getCats()

    const authsub = this.auth.authState.subscribe(user => {
      if (user && user.uid) {
        this.currentUID = user.uid
        this.getProducts()
      }
      else {
        this.Router.navigate(['home'])
      }
    })

  }

}
