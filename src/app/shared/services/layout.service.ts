import { Injectable, InjectionToken } from '@angular/core';

export interface ILayoutService {
  // Agregar los métodos necesarios
}

export const LAYOUT_SERVICE_TOKEN = new InjectionToken<ILayoutService>('LayoutService');

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements ILayoutService {
  // Implementar los métodos necesarios
}
