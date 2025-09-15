// Eliminado ngOnInit duplicado fuera de la clase
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RolesService, Rol } from './roles.service';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class RolesPageComponent implements OnInit {
  
  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.mostrarAlerta('¡Bienvenido a la gestión de roles!', 'bienvenida');
    // Agregar algunos datos de prueba si la API no está disponible
    this.cargarRoles();
    
    // Datos de prueba (comentar cuando la API funcione)
    setTimeout(() => {
      if (this.roles.length === 0) {
        console.log('No se cargaron roles de la API, agregando datos de prueba');
        this.roles = [
          { id: 1, name: 'Administrador', description: 'Rol con todos los permisos del sistema' },
          { id: 2, name: 'Usuario', description: 'Rol básico con permisos limitados' }
        ];
      }
    }, 2000);
  }

  roles: Rol[] = [];
  
  // Modal y formulario
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  rolSeleccionado: Rol | null = null;
  
  nuevoRol: Omit<Rol, 'id'> = {
    name: '',
    description: ''
  };

  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  rolAEliminar: Rol | null = null;
  
  // Cargar roles desde la API
  cargarRoles(): void {
    console.log('Cargando roles desde la API...'); // Para depuración
    
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        console.log('Roles cargados:', roles); // Para depuración
        this.roles = roles || []; // Asegurar que roles sea un array
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
        this.mostrarAlerta('Error al cargar los roles: ' + (error.error?.message || error.message), 'error');
        this.roles = []; // Asegurar que roles sea un array vacío en caso de error
      }
    });
  }

  abrirModal() {
    this.showModal = true;
    this.nuevoRol = {
      name: '',
      description: ''
    };
  }

  cerrarModal() {
    this.showModal = false;
  }

  abrirModalActualizar(rol: Rol) {
    this.rolSeleccionado = { ...rol };
    this.showUpdateModal = true;
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.rolSeleccionado = null;
  }

  crearRol() {
    // Validar que los campos no estén vacíos
    if (!this.nuevoRol.name || !this.nuevoRol.description) {
      this.mostrarAlerta('Por favor, complete todos los campos', 'error');
      return;
    }

    // Validar que no estén solo con espacios en blanco
    if (this.nuevoRol.name.trim() === '' || this.nuevoRol.description.trim() === '') {
      this.mostrarAlerta('Los campos no pueden estar vacíos', 'error');
      return;
    }

    console.log('Creando rol:', this.nuevoRol); // Para depuración

    this.rolesService.createRol(this.nuevoRol).subscribe({
      next: (rolCreado) => {
        console.log('Rol creado exitosamente:', rolCreado); // Para depuración
        this.roles.push(rolCreado);
        this.cerrarModal();
        this.mostrarAlerta('Rol creado exitosamente.', 'creado');
      },
      error: (error) => {
        console.error('Error al crear rol:', error);
        this.mostrarAlerta('Error al crear el rol: ' + (error.error?.message || error.message), 'error');
      }
    });
  }

  actualizarRol() {
    if (this.rolSeleccionado && this.rolSeleccionado.id) {
      this.rolesService.updateRol(this.rolSeleccionado.id, this.rolSeleccionado).subscribe({
        next: (rolActualizado) => {
          const index = this.roles.findIndex(r => r.id === rolActualizado.id);
          if (index !== -1) {
            this.roles[index] = rolActualizado;
          }
          this.cerrarModalActualizar();
          this.mostrarAlerta('Rol actualizado exitosamente.', 'creado');
        },
        error: (error) => {
          console.error('Error al actualizar rol:', error);
          this.mostrarAlerta('Error al actualizar el rol', 'error');
        }
      });
    }
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(rol: Rol) {
    this.rolAEliminar = rol;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.rolAEliminar && this.rolAEliminar.id) {
      console.log('Eliminando rol:', this.rolAEliminar); // Para depuración
      
      this.rolesService.deleteRol(this.rolAEliminar.id).subscribe({
        next: () => {
          console.log('Rol eliminado exitosamente'); // Para depuración
          this.roles = this.roles.filter(r => r.id !== this.rolAEliminar!.id);
          this.mostrarAlerta('Rol eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.rolAEliminar = null;
        },
        error: (error) => {
          console.error('Error al eliminar rol:', error);
          this.mostrarAlerta('Error al eliminar el rol: ' + (error.error?.message || error.message), 'error');
          this.showConfirm = false;
          this.rolAEliminar = null;
        }
      });
    } else {
      console.error('No se puede eliminar: rol sin ID válido');
      this.mostrarAlerta('Error: No se puede eliminar el rol', 'error');
      this.showConfirm = false;
      this.rolAEliminar = null;
    }
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.rolAEliminar = null;
  }
}
