import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadCartItems();
    }
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      },
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  updateCartItem(cartItemId: number, quantity: number) {
    if (quantity < 1) {
      quantity = 1;
    }
    this.cartService.updateCartItem(cartItemId, quantity).subscribe({
      next: () => {
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
      },
    });
  }

  removeFromCart(cartItemId: number) {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next: () => {
        this.loadCartItems();
      },
      error: (error) => {
        console.error('Error removing cart item:', error);
      },
    });
  }

  proceedToCheckout() {
    this.orderService.createOrder().subscribe({
      next: (success) => {
        if (success) {
          this.cartService.clearCart();
          this.router.navigate(['/orders']);
        } else {
          
          console.error('Failed to create order.');
        }
      },
      error: (error) => {
        console.error('Error creating order:', error);
        
      },
    });
  }
  
  
}
