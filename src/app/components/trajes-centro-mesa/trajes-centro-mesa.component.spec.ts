import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajesCentroMesaComponent } from './trajes-centro-mesa.component';

describe('TrajesCentroMesaComponent', () => {
  let component: TrajesCentroMesaComponent;
  let fixture: ComponentFixture<TrajesCentroMesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrajesCentroMesaComponent]
    });
    fixture = TestBed.createComponent(TrajesCentroMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
