import { MenuItem } from 'primeng/api';
import { BackendMenuItem, BackendSubMenuItem } from '../../shared/components/sidebar.config';

export function mapBackendMenuToPrimeNG(menu: BackendMenuItem[]): MenuItem[] {
  return menu.map((section: BackendMenuItem) => ({
    label: section.name,
    icon: section.icon || 'pi pi-fw pi-folder',
    items: section.forms.map((form: BackendSubMenuItem) => ({
      label: form.name,
      icon: 'pi pi-fw pi-file',
      routerLink: ['/' + form.route],
      disabled: !form.state
    }))
  }));
}

