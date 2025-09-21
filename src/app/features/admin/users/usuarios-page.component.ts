import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService, Usuario, UserInfraction } from './usuarios.service';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [UsuariosService]
})
export class UsuariosPageComponent implements OnInit {
  
  constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {}

  usuarios: Usuario[] = [];
  
  // Modal y formulario
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  showUpdateConfirm: boolean = false;
  usuarioSeleccionado: Usuario | null = null;
  usuarioAActualizar: Usuario | null = null;
  
  nuevoUsuario: {
    name: string;
    email: string;
    password: string;
    personId: number;
  } = {
    name: '',
    email: '',
    password: '',
    personId: 1 // Valor por defecto
  };

  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  usuarioAEliminar: Usuario | null = null;

  ngOnInit() {
    this.mostrarAlerta('¡Bienvenido a la gestión de usuarios!', 'bienvenida');
    this.cargarUsuarios();
    
    // Datos de prueba (comentar cuando la API funcione)
    setTimeout(() => {
      if (this.usuarios.length === 0) {
        console.log('No se cargaron usuarios de la API, agregando datos de prueba');
        this.usuarios = [
          { 
            id: 1, 
            name: 'Administrador Sistema',
            email: 'admin@ejemplo.com', 
            password: '********',
            personId: 1,
            userInfractions: []
          },
          { 
            id: 2, 
            name: 'Usuario Normal',
            email: 'usuario@ejemplo.com', 
            password: '********',
            personId: 2,
            userInfractions: []
          }
        ];
      }
    }, 2000);
  }

  // Cargar usuarios desde la API
  cargarUsuarios(esDespuesDeOperacion: boolean = false): void {
    console.log('Cargando usuarios desde la API...'); // Para depuración
    
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        console.log('Usuarios cargados:', usuarios); // Para depuración
        this.usuarios = usuarios || []; // Asegurar que usuarios sea un array
        // Forzar detección de cambios para asegurar que la vista se actualice
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar usuarios:', error);
        this.mostrarAlerta('Error al cargar los usuarios: ' + (error.error?.message || error.message), 'error');
        
        // Solo agregar datos de prueba si no es después de una operación y no hay usuarios
        if (!esDespuesDeOperacion && this.usuarios.length === 0) {
          console.log('Agregando datos de prueba debido a error de API');
          this.usuarios = [
            { 
              id: 1, 
              name: 'Administrador Sistema',
              email: 'admin@ejemplo.com', 
              password: '********',
              personId: 1,
              userInfractions: []
            },
            { 
              id: 2, 
              name: 'Usuario Normal',
              email: 'usuario@ejemplo.com', 
              password: '********',
              personId: 2,
              userInfractions: []
            }
          ];
        }
      }
    });
  }

  abrirModal() {
    this.showModal = true;
    this.nuevoUsuario = {
      name: '',
      email: '',
      password: '',
      personId: 1 // Valor por defecto
    };
  }

  cerrarModal() {
    this.showModal = false;
    // Limpiar el formulario al cerrar
    this.nuevoUsuario = {
      name: '',
      email: '',
      password: '',
      personId: 1
    };
  }

  confirmarActualizacion(usuario: Usuario) {
    this.usuarioAActualizar = usuario;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion() {
    this.usuarioAActualizar = null;
    this.showUpdateConfirm = false;
  }

  abrirModalActualizar() {
    if (this.usuarioAActualizar) {
      this.usuarioSeleccionado = {
        ...this.usuarioAActualizar,
        // Asegurar que los campos tengan valores válidos
        name: this.usuarioAActualizar.name || '',
        password: this.usuarioAActualizar.password || '',
        email: this.usuarioAActualizar.email || '',
        personId: this.usuarioAActualizar.personId || 1
      };
      this.showUpdateModal = true;
      this.showUpdateConfirm = false;
      this.usuarioAActualizar = null;
    }
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.usuarioSeleccionado = null;
  }

  crearUsuario() {
    // Validar que los campos no estén vacíos
    if (!this.nuevoUsuario.name || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.mostrarAlerta('Por favor, complete todos los campos', 'error');
      return;
    }

    // Validar que no estén solo con espacios en blanco
    if (this.nuevoUsuario.name.trim() === '' || this.nuevoUsuario.email.trim() === '' || this.nuevoUsuario.password.trim() === '') {
      this.mostrarAlerta('Los campos no pueden estar vacíos', 'error');
      return;
    }

    // Validar formato de email básico
    if (!this.nuevoUsuario.email.includes('@') || !this.nuevoUsuario.email.includes('.')) {
      this.mostrarAlerta('Por favor, ingrese un email válido', 'error');
      return;
    }

    // Validar longitud de contraseña
    if (this.nuevoUsuario.password.length < 6 || this.nuevoUsuario.password.length > 50) {
      this.mostrarAlerta('La contraseña debe tener entre 6 y 50 caracteres', 'error');
      return;
    }

    // Validar longitud de nombre
    if (this.nuevoUsuario.name.length < 2 || this.nuevoUsuario.name.length > 100) {
      this.mostrarAlerta('El nombre debe tener entre 2 y 100 caracteres', 'error');
      return;
    }

    // Validar longitud de email
    if (this.nuevoUsuario.email.length > 150) {
      this.mostrarAlerta('El email no puede exceder 150 caracteres', 'error');
      return;
    }

    console.log('Creando usuario:', this.nuevoUsuario); // Para depuración

    this.usuariosService.createUsuario(this.nuevoUsuario).subscribe({
      next: (usuarioCreado: Usuario) => {
        console.log('Usuario creado exitosamente:', usuarioCreado); // Para depuración
        this.cerrarModal();
        this.mostrarAlerta('Usuario creado exitosamente.', 'creado');
        // Recargar la lista completa desde la API para asegurar sincronización
        this.cargarUsuarios(true);
      },
      error: (error: any) => {
        console.error('Error al crear usuario:', error);
        this.mostrarAlerta('Error al crear el usuario: ' + (error.error?.message || error.message), 'error');
      }
    });
  }

  actualizarUsuario() {
    if (this.usuarioSeleccionado && this.usuarioSeleccionado.id) {
      // Validar límites para actualización
      if (this.usuarioSeleccionado.name.length < 2 || this.usuarioSeleccionado.name.length > 100) {
        this.mostrarAlerta('El nombre debe tener entre 2 y 100 caracteres', 'error');
        return;
      }

      if (this.usuarioSeleccionado.email.length > 150) {
        this.mostrarAlerta('El email no puede exceder 150 caracteres', 'error');
        return;
      }

      if (this.usuarioSeleccionado.password && (this.usuarioSeleccionado.password.length < 6 || this.usuarioSeleccionado.password.length > 50)) {
        this.mostrarAlerta('La contraseña debe tener entre 6 y 50 caracteres', 'error');
        return;
      }

      console.log('Actualizando usuario:', this.usuarioSeleccionado);
      
      this.usuariosService.updateUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado).subscribe({
        next: (usuarioActualizado: Usuario) => {
          console.log('Usuario actualizado exitosamente:', usuarioActualizado);
          this.cerrarModalActualizar();
          this.mostrarAlerta('Usuario actualizado exitosamente.', 'creado');
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarUsuarios(true);
        },
        error: (error: any) => {
          console.error('Error al actualizar usuario:', error);
          this.mostrarAlerta('Error al actualizar el usuario: ' + (error.error?.message || error.message), 'error');
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

  pedirConfirmacionEliminar(usuario: Usuario) {
    this.usuarioAEliminar = usuario;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.usuarioAEliminar && this.usuarioAEliminar.id) {
      console.log('Eliminando usuario:', this.usuarioAEliminar); // Para depuración
      
      this.usuariosService.deleteUsuario(this.usuarioAEliminar.id).subscribe({
        next: () => {
          console.log('Usuario eliminado exitosamente'); // Para depuración
          this.mostrarAlerta('Usuario eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.usuarioAEliminar = null;
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarUsuarios(true);
        },
        error: (error: any) => {
          console.error('Error al eliminar usuario:', error);
          this.mostrarAlerta('Error al eliminar el usuario: ' + (error.error?.message || error.message), 'error');
          this.showConfirm = false;
          this.usuarioAEliminar = null;
        }
      });
    } else {
      console.error('No se puede eliminar: usuario sin ID válido');
      this.mostrarAlerta('Error: No se puede eliminar el usuario', 'error');
      this.showConfirm = false;
      this.usuarioAEliminar = null;
    }
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.usuarioAEliminar = null;
  }
}
