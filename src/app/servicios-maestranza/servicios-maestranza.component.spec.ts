import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosMaestranzaComponent } from './servicios-maestranza.component';

describe('ServiciosMaestranzaComponent', () => {
  let component: ServiciosMaestranzaComponent;
  let fixture: ComponentFixture<ServiciosMaestranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosMaestranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosMaestranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
