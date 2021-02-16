import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorsMainPage } from './vendors-main.page';

describe('VendorsMainPage', () => {
  let component: VendorsMainPage;
  let fixture: ComponentFixture<VendorsMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
