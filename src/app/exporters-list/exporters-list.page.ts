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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  searchFound: any[] = [];
  width = window.innerWidth;

  async presentModal(option) {
    const modal = await this.modalController.create({
      component: ExporterPage,
      swipeToClose: true,
      mode: "ios",
      componentProps: {
        option: option,
      }
    })
    modal.onDidDismiss().then(() => {

    })
    return await modal.present();
  }

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
