import { Injectable, inject } from '@angular/core';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly endpoint = 'department';
  
  public genericService = inject(ServiceGenericService);
  
  constructor() { }
}