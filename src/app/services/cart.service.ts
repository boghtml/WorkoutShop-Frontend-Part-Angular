import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

const API_URL = 'http://localhost:5276/api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCart();
  }

  private loadCart(): void {
    if (this.authService.isAuthenticated()) {
      this.getCartItems().pipe(
        catchError(error => {
          console.error('Error loading cart:', error);
          return of([]);
        })
      ).subscribe(items => {
        this.cartItemsSubject.next(items);
      });
    }
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    const body = {
      productId: productId,
      quantity: quantity,
    };
    return this.http.post(`${API_URL}/cart`, body).pipe(
      tap(response => this.loadCart()),
      catchError(error => {
        console.error('Error adding to cart:', error);
        return of(null);
      })
    );
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any>(`${API_URL}/cart`).pipe(
      map(response => {
        
        if (response && response['$values']) {
          return response['$values'];
        } else {
          
          return Array.isArray(response) ? response : [response];
        }
      }),
      tap(items => {
        
        this.cartItemsSubject.next(items);
      }),
      catchError(error => {
        console.error('Error getting cart items:', error);
        return of([]);
      })
    );
  }
  
  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    const body = {
      quantity: quantity,
    };
    return this.http.put(`${API_URL}/cart/${cartItemId}`, body).pipe(
      tap(response => this.loadCart()),
      catchError(error => {
        console.error('Error updating cart:', error);
        return of(null);
      })
    );
  }
  

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${API_URL}/cart/${cartItemId}`).pipe(
      tap(response => this.loadCart()),
      catchError(error => {
        console.error('Error removing from cart:', error);
        return of(null);
      })
    );
  }
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
  
  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }
}