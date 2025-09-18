import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RolUser {
  id: number;
  userId: number;
  rolId: number;
  userName?: string | null;
  rolName?: string | null;
}

@Injectable({ providedIn: 'root' })
export class RolUserService {
  private apiUrl = 'https://localhost:7286/api/RolUser';

  constructor(private http: HttpClient) {}

  getRolUsers(): Observable<RolUser[]> {
    return this.http.get<RolUser[]>(this.apiUrl);
  }

  createRolUser(rolUser: Omit<RolUser, 'id' | 'userName' | 'rolName'>): Observable<RolUser> {
    return this.http.post<RolUser>(this.apiUrl, rolUser);
  }

  updateRolUser(rolUser: RolUser): Observable<RolUser> {
    return this.http.put<RolUser>(`${this.apiUrl}/${rolUser.id}`, rolUser);
  }

  deleteRolUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
