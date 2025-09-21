import { Injectable } from '@angular/core';
import { ServiceGenericService } from './utils/generic/service-generic.service';

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
