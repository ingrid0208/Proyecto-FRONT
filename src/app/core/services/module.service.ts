import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

export interface Module {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
 readonly endpoint = 'Module';

  constructor(public genericService: ServiceGenericService) {}

}