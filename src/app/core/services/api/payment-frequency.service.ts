import { Injectable, inject } from '@angular/core';
import { ServiceGenericService } from '../utils/generic/service-generic.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentFrequencyService {
  readonly endpoint = 'paymentFrequency';

  public genericService = inject(ServiceGenericService);

  constructor() { }
}