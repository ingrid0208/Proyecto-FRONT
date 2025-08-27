import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Modulo {
  icono: string;
  nombre: string;
  acciones: string[];
}

@Component({
  selector: 'app-modulos-permisos-page',
  templateUrl: './modulos-permisos-page.component.html',
  styleUrls: ['./modulos-permisos-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModulosPermisosPageComponent {
  modulos: Modulo[] = [
    {
      icono: '🏠',
      nombre: 'Página Principal',
      acciones: ['Dashboard']
    },
    {
      icono: '📋',
      nombre: 'Gestión de Multas',
      acciones: ['Crear Multa', 'Editar Multa', 'Consultar Multa']
    },
    {
      icono: '🚗',
      nombre: 'Infracciones',
      acciones: ['Ver Infracciones', 'Registrar Observación']
    },
    {
      icono: '💳',
      nombre: 'Pagos',
      acciones: ['Procesar Pago', 'Consultar Pago']
    },
    {
      icono: '👤',
      nombre: 'Gestión de Usuarios',
      acciones: ['Ver Usuarios', 'Asignar Roles']
    }
  ];
  // Modal y formulario
  showModal: boolean = false;
  nuevoModulo: Modulo = { icono: '', nombre: '', acciones: [] };
  accionesDisponibles: string[] = [
    'Dashboard', 'Crear Multa', 'Editar Multa', 'Consultar Multa',
    'Ver Infracciones', 'Registrar Observación',
    'Procesar Pago', 'Consultar Pago',
    'Ver Usuarios', 'Asignar Roles'
  ];

  // Modales de alerta y confirmación
  showAlert: boolean = false;
  alertMsg: string = '';
  alertType: string = 'bienvenida';
  showConfirm: boolean = false;
  moduloAEliminar: number | null = null;

  abrirModal() {
    this.showModal = true;
    this.nuevoModulo = { icono: '', nombre: '', acciones: [] };
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(idx: number) {
    this.moduloAEliminar = idx;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.moduloAEliminar !== null) {
      this.modulos.splice(this.moduloAEliminar, 1);
      this.mostrarAlerta('Módulo eliminado correctamente.', 'eliminado');
    }
    this.showConfirm = false;
    this.moduloAEliminar = null;
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.moduloAEliminar = null;
  }

  cerrarModal() {
    this.showModal = false;
  }

  toggleAccion(accion: string) {
    const idx = this.nuevoModulo.acciones.indexOf(accion);
    if (idx > -1) {
      this.nuevoModulo.acciones.splice(idx, 1);
    } else {
      this.nuevoModulo.acciones.push(accion);
    }
  }

  crearModulo() {
    if (this.nuevoModulo.icono && this.nuevoModulo.nombre && this.nuevoModulo.acciones.length > 0) {
      this.modulos.push({
        icono: this.nuevoModulo.icono,
        nombre: this.nuevoModulo.nombre,
        acciones: [...this.nuevoModulo.acciones]
      });
      this.cerrarModal();
    }
  }
}
