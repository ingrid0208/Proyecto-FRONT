import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFrequencyComponent } from './payment-frequency.component';

describe('PaymentFrequencyComponent', () => {
  let component: PaymentFrequencyComponent;
  let fixture: ComponentFixture<PaymentFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFrequencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
