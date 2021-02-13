import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-productsaddition',
  templateUrl: './productsaddition.page.html',
  styleUrls: ['./productsaddition.page.scss'],
})
export class ProductsadditionPage implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
  ) { }

  categories: any;
  selectedcat: string;

  temp: any;
  subtypes: any[];

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').valueChanges().subscribe((data: any) => {
      this.categories = data;
      this.temp = data
      this.subtypes = this.categories.cats;
      console.log('ksghoiw', this.subtypes);

    })
  }

  choosecat(selested: string) {
    this.selectedcat = selested
    alert(this.selectedcat)
    console.log(this.temp);
    for (var i = 0; i < this.temp[selested].length; i++) {
      console.log('in loop');

    }

  }



  ngOnInit() {
    this.getCats()
  }

}
