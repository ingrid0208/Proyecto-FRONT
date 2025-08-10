import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/service/layout.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    AvatarModule,
    InputTextModule,
    FileUploadModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'] // Usa el archivo de estilos del perfil
})
export class ProfileComponent {
      @ViewChild('op') overlayPanel: any;
  user = {
    gender: 'female',
    firstName: 'Ingrid',
    lastName: 'Medina',
    email: 'ingrid@example.com',
    address: '3605 Parker Rd.',
    phone: '(405) 555-0128',
    birth: '1995-02-01',
    location: 'Atlanta, USA',
    postalCode: '30301',
    role: 'Inspectora',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
  };


  roles = [
    { label: 'Inspectora', value: 'Inspectora' },
    { label: 'Finanzas', value: 'Finanzas' },
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Operaciones', value: 'Operaciones' }
  ];

    locations = ['Colombia', 'México', 'Argentina', 'España', 'USA'];
    genders = ['Femenino', 'Masculino', 'Otro'];

    constructor(public layoutService: LayoutService, private router: Router) {}


  onImageUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    goToProfile() {
        this.router.navigate(['/profile']);
        this.overlayPanel?.hide();
    }

    openSettings() {
        alert('Aquí iría configuración');
        this.overlayPanel?.hide();
    }

   logout() {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        this.overlayPanel?.hide();
    }

}
