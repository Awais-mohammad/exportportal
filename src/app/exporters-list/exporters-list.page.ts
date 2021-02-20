import { Component, OnInit } from '@angular/core';
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
    this.getVendors();
  }

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
