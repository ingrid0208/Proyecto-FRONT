// ===============================
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../base/api.service';

type getAllType = 'GetAll' | 'GetAllDeletes';
type DeleteType = 'Persistent' | 'Logical';

// ===============================
// 📌 Servicio genérico
// ===============================
@Injectable({ providedIn: 'root' })
export class ServiceGenericService extends ApiService {

  // ===============================
  // 📌 CRUD genéricos (JWT)
  // ===============================
  getAll<T>(controller: string, getAllType: getAllType = 'GetAll') {
    const params = this.buildParams({ getAllType: 0 });
    return this.http.get<T[]>(this.url(controller), { ...this.optsJwt(), params });
  }

  getById<T>(controller: string, id: number | string): Observable<T> {
    return this.http.get<T>(this.url(controller, id), this.optsJwt());
  }

  create<T>(controller: string, data: any): Observable<T> {
    return this.http.post<T>(this.url(controller), data, this.optsJwt());
  }

  update<T>(controller: string, id: number | string, data: any): Observable<T> {
    return this.http.put<T>(this.url(controller, id), data, this.optsJwt());
  }

  delete(controller: string, id: number | string, deleteType: DeleteType = 'Persistent') {
    const params = this.buildParams({ deleteType });
    return this.http.delete(this.url(controller, id), { ...this.optsJwt(), params });
  }

  restore(controller: string, id: number | string) {
    return this.http.patch<void>(this.url(controller, 'logical-restore', id), {}, this.optsJwt());
  }
}

