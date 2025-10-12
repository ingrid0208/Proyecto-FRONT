import { MenuItem } from 'primeng/api';
import { BackendMenuItem, BackendSubMenuItem } from '../../../shared/components/sidebar.config';

export function mapBackendMenuToPrimeNG(menu: BackendMenuItem[]): MenuItem[] {
  console.log('🔍 Menu del backend:', menu);
  
  return menu.map((section: BackendMenuItem) => ({
    label: section.name,
    icon: section.icon || getIconForSection(section.name),
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
        icon: getIconForMenuItem(form.name),
        routerLink: ['/' + route],
        disabled: !form.state
      };
    })
  }));
}

// Función para determinar el icono de la sección basado en el nombre
function getIconForSection(sectionName: string): string {
  const name = sectionName.toLowerCase();
  
  if (name.includes('contenido')) return 'pi pi-fw pi-folder-open';
  if (name.includes('gestión') || name.includes('gestion')) return 'pi pi-fw pi-cog';
  if (name.includes('perfil')) return 'pi pi-fw pi-user-edit';
  if (name.includes('admin')) return 'pi pi-fw pi-shield';
  if (name.includes('reporte')) return 'pi pi-fw pi-chart-bar';
  
  return 'pi pi-fw pi-th-large'; // Icono por defecto
}

// Función para determinar el icono del elemento del menú basado en el nombre
function getIconForMenuItem(itemName: string): string {
  const name = itemName.toLowerCase();
  
  // Perfil
  if (name.includes('perfil')) return 'pi pi-fw pi-user';
  
  // Formularios y tipos
  if (name.includes('formulario') && name.includes('creacion')) return 'pi pi-fw pi-plus-circle';
  if (name.includes('formulario') && name.includes('tipo')) return 'pi pi-fw pi-tags';
  if (name.includes('formulario') && name.includes('notificacion')) return 'pi pi-fw pi-bell';
  
  // Módulos y administración
  if (name.includes('formulario') && !name.includes('tipo')) return 'pi pi-fw pi-file-edit';
  if (name.includes('form modules')) return 'pi pi-fw pi-clone';
  if (name.includes('módulo') || name.includes('modulos')) return 'pi pi-fw pi-box';
  if (name.includes('persona')) return 'pi pi-fw pi-users';
  if (name.includes('permiso')) return 'pi pi-fw pi-key';
  if (name.includes('rol')) return 'pi pi-fw pi-id-card';
  if (name.includes('usuario')) return 'pi pi-fw pi-user-plus';
  
  // Parámetros
  if (name.includes('departamento')) return 'pi pi-fw pi-map';
  if (name.includes('documento')) return 'pi pi-fw pi-file-o';
  
  return 'pi pi-fw pi-circle'; // Icono por defecto
}

