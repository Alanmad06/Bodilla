import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotPasswordComponent } from './fogot-password.component';

describe('FogotPasswordComponent', () => {
  let component: FogotPasswordComponent;
  let fixture: ComponentFixture<FogotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FogotPasswordComponent]
    });
    fixture = TestBed.createComponent(FogotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
