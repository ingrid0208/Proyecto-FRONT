// Eliminado ngOnInit duplicado fuera de la clase
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rol {
  nombre: string;
  color: string;
  acciones: { label: string; color: string; }[];
}

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RolesPageComponent implements OnInit {
  ngOnInit(): void {
    this.mostrarAlerta('¡Bienvenido a la gestión de roles!', 'bienvenida');
  }
  roles: Rol[] = [
    {
      nombre: 'Administrador',
      color: '#e53935',
      acciones: [
        { label: 'Crear', color: 'green' },
        { label: 'Editar', color: 'green' },
        { label: 'Configurar', color: 'green' }
      ]
    },
    {
      nombre: 'Supervisor',
      color: '#fb8c00',
      acciones: [
        { label: 'Crear', color: 'green' },
        { label: 'Editar', color: 'green' },
        { label: 'Aprobar', color: 'green' }
      ]
    },
    {
      nombre: 'usuario',
      color: '#43a047',
      acciones: [
        { label: 'Ver', color: 'green' },
        { label: 'Reportes', color: 'green' }
      ]
    }
  ];
  // Modal y formulario
  showModal: boolean = false;
  nuevoRol = {
    nombre: '',
    color: '#43a047',
    acciones: [] as { label: string; color: string }[]
  };
  permisosDisponibles = [
    { label: 'Crear', color: 'green' },
    { label: 'Editar', color: 'green' },
    { label: 'Configurar', color: 'green' },
    { label: 'Aprobar', color: 'green' },
    { label: 'Ver', color: 'green' },
    { label: 'Reportes', color: 'green' }
  ];

  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  rolAEliminar: number | null = null;

  abrirModal() {
    this.showModal = true;
    this.nuevoRol = {
      nombre: '',
      color: '#43a047',
      acciones: []
    };
  }

  cerrarModal() {
    this.showModal = false;
  }

  togglePermiso(permiso: { label: string; color: string }) {
    const idx = this.nuevoRol.acciones.findIndex(a => a.label === permiso.label);
    if (idx > -1) {
      this.nuevoRol.acciones.splice(idx, 1);
    } else {
      this.nuevoRol.acciones.push(permiso);
    }
  }

  crearRol() {
    if (this.nuevoRol.nombre && this.nuevoRol.acciones.length > 0) {
      this.roles.push({
        nombre: this.nuevoRol.nombre,
        color: this.nuevoRol.color,
        acciones: [...this.nuevoRol.acciones]
      });
      this.cerrarModal();
      this.mostrarAlerta('Rol creado exitosamente.', 'creado');
    }
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(idx: number) {
    this.rolAEliminar = idx;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.rolAEliminar !== null) {
      this.roles.splice(this.rolAEliminar, 1);
      this.mostrarAlerta('Rol eliminado correctamente.', 'eliminado');
    }
    this.showConfirm = false;
    this.rolAEliminar = null;
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.rolAEliminar = null;
  }
  isPermisoSeleccionado(permiso: { label: string; color: string }) {
    return this.nuevoRol.acciones.find(a => a.label === permiso.label) !== undefined;
  }
}
