import { Router } from '@angular/router';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.page.html',
  styleUrls: ['./exporter.page.scss'],
})
export class ExporterPage implements OnInit {

  @Input() ExporterID;
  constructor(
    private fireStore: AngularFirestore,
    public modalController: ModalController,
    private router: Router,
  ) {

  }

  vendor: any;
  products: any[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  width = window.innerWidth;
  categories: any;
  showCats: string[] = [];
  cat: string = "automotive";
  subCat: string;
  catIndex: number = 0;



  ngOnInit() {
    this.fireStore.collection('vendors').doc(this.ExporterID).get().subscribe((data: any) => {
      this.vendor = data.Df.sn.proto.mapValue.fields;
      console.log('vendors data', this.vendor);
      if (this.vendor.products) {
        for (var i = 0; i < this.vendor.products.arrayValue.values.length; i++) {
          this.fireStore.doc(this.vendor.products.arrayValue.values[i].stringValue).get().subscribe((data: any) => {
            this.products.push(data.Df.sn.proto.mapValue.fields);
          })
        }
        console.log(this.products);
      }
      console.log('cechk in', this.ExporterID);

      this.getCats();
      setTimeout(() => {

        this.getProducts()
        this.catIndex++;
      }, 2000);

    })
  }


  addProduct() {

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


  getProducts() {
    this.fireStore.collection('vendors').doc(this.ExporterID).collection('products').valueChanges().subscribe(data => {
      console.log('vendor data=>', data);
      this.products = data;
    })
  }

  goToPage(path: string) {
    this.router.navigate([path])
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
