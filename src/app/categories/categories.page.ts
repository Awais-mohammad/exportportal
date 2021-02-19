import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
  ) {
    this.getCats();
  }

  categories: any;
  showCats: string[] = [];
  products: any[] = [];
  cat: string = "automotive";
  subCat: string;

  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.categories = data.Df.sn.proto.mapValue.fields;
      console.log(this.categories);
      this.showMore();
      cats.unsubscribe();
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  showMore() {
    if (!this.showCats) {
      var currDex = 0;
    } else {
      currDex = this.showCats.length;
    }
    for (var i = currDex; i < currDex + 5; i++) {
      console.log(this.categories.cats.arrayValue.values[i].stringValue);
      this.showCats.push(this.categories.cats.arrayValue.values[i].stringValue);
    }
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
    });
  }

  ngOnInit() {
  }

}
