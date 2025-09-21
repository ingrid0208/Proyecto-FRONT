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
}