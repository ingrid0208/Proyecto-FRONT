// Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    // ...otros componentes principales de la app...
    // NO incluyas PersonaListComponent aquí
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    // No agregues componentes standalone aquí
  ],
  providers: [],
  bootstrap: [/* tu componente principal */]
})
export class AppModule { }