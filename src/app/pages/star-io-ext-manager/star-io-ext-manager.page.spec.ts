import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StarIoExtManagerPage } from './star-io-ext-manager.page';

describe('StarIoExtManagerPage', () => {
  let component: StarIoExtManagerPage;
  let fixture: ComponentFixture<StarIoExtManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarIoExtManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarIoExtManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
