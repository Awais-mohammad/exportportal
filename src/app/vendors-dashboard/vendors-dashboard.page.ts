import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  ) { }

  categories: any;
  selectedcat: string = "automotive";
  temp: any;
  cats: any[];
  subCats: string;
  width = window.innerWidth;
  prodName: string;
  prodDescription: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  getCats() {
    this.fireStore.collection('appData').doc('categories').valueChanges().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
      this.temp = data
      this.cats = this.categories.cats;

    })
  }

  choosecat(selested: string) {
    this.selectedcat = selested
    alert(this.selectedcat)

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
    const req = new HttpRequest('POST', 'http://134.122.2.23/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  imageURL: string;
  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0].name);
    this.imageURL = 'http://134.122.2.23/vendors/' + this.selectedFiles[0].name
    console.log(this.imageURL);
    //  this.upload()
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
    else if (!this.selectedFiles) {
      alert('choose an image')
    }
    else {
      this.upload()
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
        this.changeProds()
        alert('added')
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
    console.log('method 1 called');

    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.cateegories = data.Df.sn.proto.mapValue.fields;
      console.log(this.cateegories);
      this.amethod()
      cats.unsubscribe();
    })

  }
  amethod() {

    console.log('method 2 called');
    for (var i = 0; i < this.cateegories['cats'].arrayValue.values.length; i++) {
      this.getProds2(this.cateegories['cats'].arrayValue.values[i].stringValue);
    }
  }
  getProds2(cat: string) {

    console.log('method 3 called');
    console.log(cat);
    for (var i = 0; i < this.cateegories[cat].arrayValue.values.length; i++) {
      const subCat = this.cateegories[cat].arrayValue.values[i].stringValue;
      console.log("Checking >>> ", subCat);
      const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
        if (data.empty == false) {
          for (var k = 0; k < data.docs.length; k++) {
            if (data.docs[k].Df.sn.proto.mapValue.fields != undefined) {
              console.log(data.docs[k].ref.path);
              console.log(data.docs[k].Df.sn.proto.mapValue.fields.uploadedBy.stringValue);
              this.push(data.docs[k].Df.sn.proto.mapValue.fields.uploadedBy.stringValue, data.docs[k].ref.path)
            }
            if (k == data.docs.length - 1) {
              getDocs.unsubscribe();
            }
          }
        }
      })
    }
    console.log(this.products);
  }

  push(docID, path) {
    const subcolPath = path
    this.fireStore.collection('vendors').doc(docID).update({
      products: firebase.firestore.FieldValue.arrayUnion(
        subcolPath
      )
    }).then(() => {
      console.log('done!!!');

    })
  }
  currentUID: string;

  ngOnInit() {
    this.getCats()

    const authsub = this.auth.authState.subscribe(user => {
      if (user && user.uid) {
        this.currentUID = user.uid
        console.log('user logged in with id' + this.currentUID);

      }
      else {
        console.log('no user loogged in');
        this.Router.navigate(['home'])
      }
    })

  }

}
