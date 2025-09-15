import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../shared/Models/tipo-documento.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TipoDocumentoService {
  private apiUrl = `${environment.apiURL}/documentType`;

  constructor(private http: HttpClient) {}

  getTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }
}