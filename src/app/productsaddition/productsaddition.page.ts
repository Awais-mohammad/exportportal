import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { runInThisContext } from 'vm';

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
  selectedcat: string = "baby";

  temp: any;
  cats: any[];
  subCats: any;

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').valueChanges().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
      this.temp = data
      this.cats = this.categories.cats;
      console.log("THERE YOU GO AWAISSS!!!!!!!!!!!!!!", this.categories[this.selectedcat]);
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
