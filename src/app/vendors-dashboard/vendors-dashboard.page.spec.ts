import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorsDashboardPage } from './vendors-dashboard.page';

describe('VendorsDashboardPage', () => {
  let component: VendorsDashboardPage;
  let fixture: ComponentFixture<VendorsDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
