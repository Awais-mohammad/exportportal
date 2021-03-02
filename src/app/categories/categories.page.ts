import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private titleService: Title,
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
      this.showCats.push(this.categories.cats.arrayValue.values[i].stringValue);
    }
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.titleService.setTitle("Categories - Export Portal");
    try {
      document.querySelector("meta[name='description']").remove();
    } catch (e) {
    }
    try {
      document.querySelector("meta[name='keywords']").remove();
    } catch (e) {

    }

    var keywords = document.createElement('meta');
    keywords.name = "keywords";
    keywords.content = "export portal, export portal pakistan, exportportal pk, exporters list pakistan, pakistan exporters ";
    document.getElementsByTagName('head')[0].appendChild(keywords);
  }

}
