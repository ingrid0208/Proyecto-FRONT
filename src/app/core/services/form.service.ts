import { Injectable } from '@angular/core';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

export interface Form {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  readonly endpoint = 'Form';

  constructor(public genericService: ServiceGenericService) {}
}
