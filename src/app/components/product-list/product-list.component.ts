// product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchTerm = '';
  sortOrder = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }


  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Received products:', data);
        this.products = data;
       
      },
      error: (error) => {
        console.error('Помилка при завантаженні продуктів:', error);
        this.products = [];
      },
    });
  }
  

  applyFilters() {
    this.loadProducts();
  }

  resetFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.sortOrder = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.loadProducts();
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe(
      () => {
        alert('Товар додано до кошика!');
      },
      (error) => {
        console.error('Помилка при додаванні до кошика:', error);
        alert('Помилка при додаванні товару до кошика.');
      }
    );
  }
}
