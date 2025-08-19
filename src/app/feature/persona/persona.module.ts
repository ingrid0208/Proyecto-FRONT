// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PersonaListComponent } from './pages/persona-list/persona-list.component';

const PERSONA_ROUTES: Routes = [
  {
    path: '',
    component: PersonaListComponent
  }
];

@NgModule({
  declarations: [
    PersonaListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PERSONA_ROUTES),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PersonaModule { }
