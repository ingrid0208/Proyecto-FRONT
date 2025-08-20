import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

// Acepta nombre o número del enum del backend:
type getAllType = 'GetAll' | 'GetAllDeletes';
type DeleteType = 'Persistent' | 'Logical';

@Injectable({ providedIn: 'root' })
export class ServiceGenericService {
    private readonly baseUrl = environment.apiURL;

    constructor(private http: HttpClient) { }

    // ===== Helpers =====
    private getHeaders(): HttpHeaders {
        const currentUser = localStorage.getItem('currentUser');
        const token = currentUser ? JSON.parse(currentUser)?.token : undefined;

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return new HttpHeaders(headers);
    }

    private url(controller: string, ...segments: (string | number)[]) {
        // Limpia bordes de cada segmento
        const clean = [this.baseUrl, controller, ...segments]
            .map(s => String(s).replace(/^\/+|\/+$/g, ''));

        // Une respetando el esquema
        const path = clean.join('/');

        // (Opcional) Si quieres colapsar dobles slashes sin tocar "https://",
        // usa esta regex "scheme-safe":
        return path.replace(/([^:]\/)\/+/g, '$1');
    }


    private buildParams(obj?: Record<string, any>): HttpParams {
        let params = new HttpParams();
        if (!obj) return params;
        for (const [k, v] of Object.entries(obj)) {
            if (v === undefined || v === null) continue;
            if (Array.isArray(v)) {
                for (const item of v) params = params.append(k, String(item));
            } else if (v instanceof Date) {
                params = params.set(k, v.toISOString());
            } else {
                params = params.set(k, String(v));
            }
        }
        return params;
    }

    getAll<T>(controller: string, getAllType: getAllType = 'GetAll') {
        const params = this.buildParams({ getAllType: 0 });
        return this.http.get<T[]>(this.url(controller), { headers: this.getHeaders(), params });
    }

    getById<T>(controller: string, id: number | string): Observable<T> {
        return this.http.get<T>(this.url(controller, id), { headers: this.getHeaders() });
    }

    create<T>(controller: string, data: any): Observable<T> {
        return this.http.post<T>(this.url(controller), data, { headers: this.getHeaders() });
    }

    update<T>(controller: string, id: number | string, data: any): Observable<T> {
        return this.http.put<T>(this.url(controller, id), data, { headers: this.getHeaders() });
    }

    delete(controller: string, id: number | string, deleteType: DeleteType = 'Persistent') {
        const params = this.buildParams({ deleteType });
        return this.http.delete(this.url(controller, id), { headers: this.getHeaders(), params });
    }

    restore(controller: string, id: number | string) {
        return this.http.patch<void>(this.url(controller, 'logical-restore', id), {}, { headers: this.getHeaders() });
    }
}
