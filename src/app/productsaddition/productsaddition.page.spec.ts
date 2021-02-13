import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsadditionPage } from './productsaddition.page';

describe('ProductsadditionPage', () => {
  let component: ProductsadditionPage;
  let fixture: ComponentFixture<ProductsadditionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsadditionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsadditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
