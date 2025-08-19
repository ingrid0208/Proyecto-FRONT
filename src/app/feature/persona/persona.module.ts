import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaListComponent } from './pages/persona-list/persona-list.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonaListComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PersonaModule { }
