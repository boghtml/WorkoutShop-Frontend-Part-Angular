// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:5276/api';
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      const currentUserJson = this.storageService.getItem('currentUser');
      if (currentUserJson && currentUserJson !== 'undefined') {
        try {
          currentUser = JSON.parse(currentUserJson);
        } catch (e) {
          console.error('Помилка при парсингу currentUser з localStorage', e);
        }
      }
    }
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token?.result;
        console.log('Token received from login response:', token);
        if (token) {
          this.storageService.setItem('token', token);
          console.log('Token saved in localStorage:', token);
        } else {
          console.error('Токен не знайдено у відповіді');
        }
        
        if (response.user) {
          this.storageService.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        } else {
          this.storageService.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
      })
    );
  }
    

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/register`, userData);
  }

  logout() {
    this.storageService.removeItem('token');
    this.storageService.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    const user = this.currentUserValue;
    return user ? user.username : '';
  }
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/profile`);
  }
  

  getToken(): string | null {
    const token = this.storageService.getItem('token');
    console.log('Token in getToken:', token);
    return token;
  }
  
}
