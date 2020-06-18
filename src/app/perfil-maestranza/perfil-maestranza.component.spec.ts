import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMaestranzaComponent } from './perfil-maestranza.component';

describe('PerfilMaestranzaComponent', () => {
  let component: PerfilMaestranzaComponent;
  let fixture: ComponentFixture<PerfilMaestranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilMaestranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMaestranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
