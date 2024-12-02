import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:5276/api';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Token in getAuthHeaders:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  
  
  createOrder(): Observable<boolean> {
    return this.http.post(`${API_URL}/orders`, {}, { headers: this.getAuthHeaders(), responseType: 'text' }).pipe(
      map((response) => {
        
        return response === 'Order created successfully.';
      }),
      catchError((error) => {
        console.error('Error creating order:', error);
        return of(false);
      })
    );
  }
  

  getOrders(statusFilter: string = '', sortOrder: string = ''): Observable<any[]> {
    let params = {};
  
    if (statusFilter) {
      params = { ...params, statusFilter };
    }
  
    if (sortOrder) {
      params = { ...params, sortOrder };
    }
  
    return this.http.get<any>(`${API_URL}/orders`, {
      headers: this.getAuthHeaders(),
      params: params,
    }).pipe(
      map((response) => {
        if (response && response['$values']) {
          return response['$values'];
        } else {
          return Array.isArray(response) ? response : [response];
        }
      }),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return of([]);
      })
    );
  }
  
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/orders/${orderId}`).pipe(
      map((response) => {
        if (response && response.orderItems && response.orderItems['$values']) {
          response.orderItems = response.orderItems['$values'];
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching order details:', error);
        return of(null);
      })
    );
  }
  
  
  
  
}
