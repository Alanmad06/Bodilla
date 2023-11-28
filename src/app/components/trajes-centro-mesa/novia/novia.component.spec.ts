import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviaComponent } from './novia.component';

describe('NoviaComponent', () => {
  let component: NoviaComponent;
  let fixture: ComponentFixture<NoviaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoviaComponent]
    });
    fixture = TestBed.createComponent(NoviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
