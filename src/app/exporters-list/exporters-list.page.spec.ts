import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportersListPage } from './exporters-list.page';

describe('ExportersListPage', () => {
  let component: ExportersListPage;
  let fixture: ComponentFixture<ExportersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportersListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
