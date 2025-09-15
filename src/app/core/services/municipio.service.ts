import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Municipio } from '../../shared/Models/municipio.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class MunicipioService {
  private apiUrl = `${environment.apiURL}/municipality`;
  private municipiosSubject = new BehaviorSubject<Municipio[]>([]);
  municipios$ = this.municipiosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMunicipios();
  }

  private loadMunicipios(): void {
    this.http.get<Municipio[]>(this.apiUrl, this.getHttpOptions()).subscribe({
      next: (municipios) => this.municipiosSubject.next(municipios),
      error: (error) => {
        console.error('Error al cargar municipios:', error);
        // No cargar datos de ejemplo, dejar vacío para mostrar mensaje de error
        this.municipiosSubject.next([]);
      }
    });
  }

  private getHttpOptions() {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser)?.token : undefined;
    
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return { headers };
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.municipios$;
  }

  getMunicipioById(id: number): Municipio | undefined {
    return this.municipiosSubject.value.find(m => m.id === id);
  }

  refreshMunicipios(): void {
    this.loadMunicipios();
  }
}