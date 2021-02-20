import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.page.html',
  styleUrls: ['./exporter.page.scss'],
})
export class ExporterPage implements OnInit {

  @Input() option;
  constructor(
    private fireStore: AngularFirestore,
    public modalController: ModalController,
  ) { }

  vendor: any;
  products:any[] = [];

  ngOnInit() {
    this.fireStore.collection('vendors').doc(this.option).get().subscribe((data: any) => {
      this.vendor = data.Df.sn.proto.mapValue.fields;
      console.log(this.vendor);
      if (this.vendor.products) {
        for (var i = 0; i < this.vendor.products.arrayValue.values.length; i++){
          this.fireStore.doc(this.vendor.products.arrayValue.values[i].stringValue).get().subscribe((data:any)=>{
            this.products.push(data.Df.sn.proto.mapValue.fields);
          })
        }
        console.log(this.products);
      }
    })
  }

}
