import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExporterPage } from './exporter.page';

describe('ExporterPage', () => {
  let component: ExporterPage;
  let fixture: ComponentFixture<ExporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExporterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
