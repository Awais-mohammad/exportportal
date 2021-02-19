import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-exporters-list',
  templateUrl: './exporters-list.page.html',
  styleUrls: ['./exporters-list.page.scss'],
})
export class ExportersListPage implements OnInit {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
  ) {
    this.getVendors();
  }

  vendors: any[] = []

  getVendors() {
    const cats = this.fireStore.collection('vendors').get().subscribe((data: any) => {
      for (var i = 0; i < data.docs.length; i++) {
        this.vendors.push(data.docs[i].Df.sn.proto.mapValue.fields);
      }
      console.log(this.vendors);
      cats.unsubscribe();
    })
  }

  ngOnInit() {
  }

}
