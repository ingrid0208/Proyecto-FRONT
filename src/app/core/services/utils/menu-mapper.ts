import { MenuItem } from 'primeng/api';
import { BackendMenuItem, BackendSubMenuItem } from '../../../shared/components/sidebar.config';

export function mapBackendMenuToPrimeNG(menu: BackendMenuItem[]): MenuItem[] {
  console.log('🔍 Menu del backend:', menu);
  
  return menu.map((section: BackendMenuItem) => ({
    label: section.name,
    icon: section.icon || 'pi pi-fw pi-folder',
    items: section.forms.map((form: BackendSubMenuItem) => {
      // Manejo especial para el perfil
      let route = form.route;

      // Si el nombre contiene "perfil", forzar la ruta a /perfil
      if (form.name.toLowerCase().includes('perfil')) {
        route = 'perfil';
        console.log(`👤 Ruta de perfil detectada: ${form.name} -> /perfil`);
      } else {
        console.log(`📝 Mapeando: ${form.name} -> /${route}`);
      }

      return {
        label: form.name,
        icon: form.name.toLowerCase().includes('perfil') ? 'pi pi-fw pi-user' : 'pi pi-fw pi-file',
        routerLink: ['/' + route],
        disabled: !form.state
      };
    })
  }));
}

