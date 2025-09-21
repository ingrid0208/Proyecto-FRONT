import { Injectable } from '@angular/core';
import { ServiceGenericService } from '../utils/generic/service-generic.service';

export interface Rol {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  readonly endpoint = 'Rol';

  constructor(public genericService: ServiceGenericService) {}
}