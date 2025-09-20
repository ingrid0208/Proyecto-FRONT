import { Injectable, inject } from '@angular/core';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentFrequencyService {
  readonly endpoint = 'paymentFrequency';

  public genericService = inject(ServiceGenericService);

  constructor() { }
}