import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Usuario {
  email: string;
  contrasena: string;
}

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UsuariosPageComponent implements OnInit {
  usuarios: Usuario[] = [
    {
      email: 'daniel@correo.com',
      contrasena: '123456'
    },
    {
      email: 'ingrid@correo.com',
      contrasena: 'abcdef'
    }
  ];

  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';

  showConfirm = false;
  usuarioAEliminar: number | null = null;

  ngOnInit() {
    this.mostrarAlerta('¡Bienvenido a la gestión de usuarios!', 'bienvenida');
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }


  crearUsuario() {
    // Aquí iría la lógica real de creación
    this.mostrarAlerta('Usuario creado exitosamente.', 'creado');
  }

  pedirConfirmacionEliminar(idx: number) {
    this.usuarioAEliminar = idx;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.usuarioAEliminar !== null) {
      this.usuarios.splice(this.usuarioAEliminar, 1);
      this.mostrarAlerta('Usuario eliminado correctamente.', 'eliminado');
    }
    this.showConfirm = false;
    this.usuarioAEliminar = null;
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.usuarioAEliminar = null;
  }
}
