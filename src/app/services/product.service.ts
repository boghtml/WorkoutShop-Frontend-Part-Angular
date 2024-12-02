import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:5276/api';
export interface ProductImage {
  imageId: number;
  productId: number;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  productImages: { $values: ProductImage[] } | ProductImage[]; // Add $values support
  createdAt: string;
  updatedAt: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(filters?: {
    category?: string;
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    sortOrder?: string;
  }): Observable<Product[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.searchTerm) {
        params = params.set('searchTerm', filters.searchTerm);
      }
      if (filters.minPrice != null) {
        params = params.set('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice != null) {
        params = params.set('maxPrice', filters.maxPrice.toString());
      }
      if (filters.sortOrder) {
        params = params.set('sortOrder', filters.sortOrder);
      }
    }

    return this.http.get<{ $values: Product[] }>(`${API_URL}/products`, { params }).pipe(
      map((response) => {
        const products = response?.$values || [];
        return products.map((product: Product) => {
          
          if ('$values' in product.productImages) {
            product.productImages = product.productImages.$values;
          }
          return product;
        });
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of([] as Product[]);
      })
    );
  }

  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${API_URL}/products/${id}`).pipe(
      map((response: Product) => {
        if (response.productImages && '$values' in response.productImages) {
          response.productImages = response.productImages.$values;
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return of(null);
      })
    );
  }
  
}