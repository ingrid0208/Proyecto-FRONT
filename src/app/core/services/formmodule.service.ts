import { Injectable } from '@angular/core';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

export interface FormModule {
  id?: number;
  formid: number;
  moduleid: number;
  formName: string;
  moduleName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormModuleService {
  readonly endpoint = 'FormModule';

  constructor(public genericService: ServiceGenericService) {}
}

