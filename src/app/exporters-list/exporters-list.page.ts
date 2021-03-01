import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular';
import { ExporterPage } from '../exporter/exporter.page';

@Component({
  selector: 'app-exporters-list',
  templateUrl: './exporters-list.page.html',
  styleUrls: ['./exporters-list.page.scss'],
})
export class ExportersListPage implements OnInit {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    public modalController: ModalController,
  ) {
    this.getCats();
    setTimeout(() => {
      this.getVendors();
    }, 2000);
    this.getTopVendors()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }
  temp: any;

  getexporter(category: string) {
    console.log('category for exporter:', category);
    this.fireStore.collection('products').doc(category).valueChanges().subscribe((data: any) => {

      if (data) {
        if (data.vendors) {
          console.log(data.vendors);
          this.temp = data.vendors
        }
        else {

        }
      }
      else {

      }
    })
  }

  searchFound: any[] = [];
  width = window.innerWidth;



  vendors: any[] = []
  categories: any;

  getVendors() {
    const vendors = this.fireStore.collection('vendors').get().subscribe((data: any) => {
      for (var i = 0; i < data.docs.length; i++) {
        this.vendors.push(data.docs[i].Df.sn.proto.mapValue.fields);
      }
      console.log(this.vendors);
      vendors.unsubscribe();
    })
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

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  cat;
  showMore() {

  }

  topvendors: any;

  getTopVendors() {
    this.fireStore.collection('vendors', querry => querry.where('top', '==', true).orderBy('timestamp', 'asc')).get().subscribe(res => {
      if (res.empty) {


      }
      else {

        this.topvendors = res.docs
        console.log('vendors on top', this.topvendors);
      }
    })
  }
  products: any[]
  async openProfilePage(profileID: string) {

    console.log('current userID', profileID);

    const model = await this.modalController.create({
      component: ExporterPage,
      cssClass: "my-custom-modal-css",
      id: "displayshop",
      componentProps: {
        ExporterID: profileID
      },
    });
    return await model.present();
  }

  changeCat(cat: string) {
    this.products = [];
    this.cat = cat;
    this.getexporter(cat);
  }
  search(event) {
    console.log(event.detail.value);
    this.searchFound = [];
    var found = 0;
    if (event.detail.value != undefined && event.detail.value != "") {
      for (var i = 0; i < this.vendors.length; i++) {
        const currentCat = this.vendors[i].Name.stringValue;
        if (currentCat.toLowerCase().includes(event.detail.value.toLowerCase())) {
          found = found + 1;
          if (found < 7) {
            this.searchFound.push({
              name: currentCat,
              type: "exporter",
              ID: this.vendors[i].userID.stringValue,
            })
          }
        }
      }
    }
  }

  ngOnInit() {
  }

}
