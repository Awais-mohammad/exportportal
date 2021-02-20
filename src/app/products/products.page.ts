import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
  ) {
    this.getCats();
    setTimeout(() => {
      this.getProds("automotive");
      this.changeProds();
      this.catIndex++;
    }, 2000);
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  width = window.innerWidth;
  categories: any;
  showCats: string[] = [];
  products: any[] = [];
  cat: string = "automotive";
  subCat: string;
  catIndex: number = 0;

  changeProds() {
    for (var i = 0; i < this.categories['cats'].arrayValue.values.length;i++){
      this.getProds2(this.categories['cats'].arrayValue.values[i].stringValue);
    }
  }

  getProds2(cat:string) {
    console.log(cat);
    for (var i = 0; i < this.categories[cat].arrayValue.values.length; i++) {
      const subCat = this.categories[cat].arrayValue.values[i].stringValue;
      console.log("Checking >>> ", subCat);
      const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
        if (data.empty == false) {
          for (var k = 0; k < data.docs.length; k++) {
            if (data.docs[k].Df.sn.proto.mapValue.fields != undefined) {
              console.log(data.docs[k].ref.path);
              console.log(data.docs[k].Df.sn.proto.mapValue.fields.uploadedBy.stringValue);
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

  addProduct(){

  }

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.categories = data.Df.sn.proto.mapValue.fields;
      console.log(this.categories);
      cats.unsubscribe();
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  changeCat(cat: string) {
    this.products = [];
    this.cat = cat;
    this.getProds(cat);
  }

  showMore() {
    if (this.catIndex < this.categories.cats.arrayValue.values.length) {
      this.catIndex = this.catIndex + 1;
      this.getProds(this.categories.cats.arrayValue.values[this.catIndex].stringValue);
    }
  }

  getProds(cat: string) {
    console.log(cat);
    for (var i = 0; i < this.categories[cat].arrayValue.values.length; i++) {
      const subCat = this.categories[cat].arrayValue.values[i].stringValue;
      console.log("Checking >>> ", subCat);
      const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
        if (data.empty == false) {
          for (var k = 0; k < data.docs.length; k++) {
            if (data.docs[k].Df.sn.proto.mapValue.fields != undefined) {
              this.products.push(data.docs[k].Df.sn.proto.mapValue.fields);
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

}
