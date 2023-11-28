import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovioComponent } from './novio.component';

describe('NovioComponent', () => {
  let component: NovioComponent;
  let fixture: ComponentFixture<NovioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NovioComponent]
    });
    fixture = TestBed.createComponent(NovioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
