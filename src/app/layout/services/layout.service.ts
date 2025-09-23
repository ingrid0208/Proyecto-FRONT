import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

export interface LayoutConfig {
  menuMode: 'static' | 'overlay';
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private configSubject = new BehaviorSubject<LayoutConfig>({
    menuMode: 'static'
  });

  private stateSubject = new BehaviorSubject<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  });

  get state$() {
    return this.stateSubject.asObservable();
  }

  private overlayOpenSubject = new BehaviorSubject<any>(null);

  layoutConfig() {
    return this.configSubject.value;
  }

  layoutState() {
    return this.stateSubject.value;
  }

  get overlayOpen$() {
    return this.overlayOpenSubject.asObservable();
  }

  updateState(updates: Partial<LayoutState>) {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...updates });
  }

  onMenuToggle() {
    const currentState = this.stateSubject.value;
    const isDesktop = window.innerWidth > 991;

    console.log('LayoutService.onMenuToggle llamado');
    console.log('Ancho de pantalla:', window.innerWidth);
    console.log('Es desktop:', isDesktop);
    console.log('Estado actual:', currentState);

    if (isDesktop) {
      // En desktop, togglear el menú estático
      this.updateState({
        staticMenuDesktopInactive: !currentState.staticMenuDesktopInactive
      });
    } else {
      // En móvil, togglear el menú mobile
      const newMobileState = !currentState.staticMenuMobileActive;
      console.log('Cambiando staticMenuMobileActive de', currentState.staticMenuMobileActive, 'a', newMobileState);

      this.updateState({
        staticMenuMobileActive: newMobileState
      });

      // Emitir evento para overlay
      this.overlayOpenSubject.next({});
    }

    // Log del estado después del cambio
    setTimeout(() => {
      console.log('Nuevo estado:', this.stateSubject.value);
    }, 0);
  }
}