import { MenuItem } from "primeng/api";
import { BackendMenuItem, BackendSubMenuItem } from "../../shared/components/sidebar.config";

export function mapBackendMenuToPrimeNG(menu: BackendMenuItem[]): MenuItem[] {
  return menu.map((item: BackendMenuItem) => {
    const mapped: MenuItem = {
      label: item.name,
      icon: item.icon || 'pi pi-circle', // usa el icono que viene del backend, si no trae pon uno default
      items: item.forms?.map((sub: BackendSubMenuItem) => ({
        label: sub.name,
        routerLink: sub.route,
        visible: sub.state,
        icon: sub?.['icon'] ?? undefined // si algún subitem tiene icono
      })) ?? []
    };
    return mapped;
  });
}
