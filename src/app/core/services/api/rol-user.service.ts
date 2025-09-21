import { Injectable } from '@angular/core';
import { ServiceGenericService } from '../utils/generic/service-generic.service';
export interface RolUser {
  id: number;
  userId: number;
  rolId: number;
  userName?: string | null;
  rolName?: string | null;
}

@Injectable({ providedIn: 'root' })
export class RolUserService {
readonly endpoint = 'RolUser';

  constructor(public genericService: ServiceGenericService) {}


}
