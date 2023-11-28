import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroMesaComponent } from './centro-mesa.component';

describe('CentroMesaComponent', () => {
  let component: CentroMesaComponent;
  let fixture: ComponentFixture<CentroMesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CentroMesaComponent]
    });
    fixture = TestBed.createComponent(CentroMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
