import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMaestranzaComponent } from './home-maestranza.component';

describe('HomeMaestranzaComponent', () => {
  let component: HomeMaestranzaComponent;
  let fixture: ComponentFixture<HomeMaestranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMaestranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMaestranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
