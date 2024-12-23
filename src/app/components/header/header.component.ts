//header.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service'; 


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `

  <header>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand d-flex align-items-center" routerLink="/">
        <img 
          src="https://th.bing.com/th/id/OIP.5DpZoMomv2rQPqO6e61CwQHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
          alt="WorkoutShop Logo" 
          class="d-inline-block align-top"
          style="height: 40px;"
        >
        <span class="ms-2">WorkoutShop</span>
      </a>

      <!-- Burger menu for mobile -->
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" routerLink="/" routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: true}">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/orders">
              <i class="fas fa-box"></i>
              Orders
            </a>
          </li>
          
        </ul>

        <!-- Search form -->
        <form class="d-flex me-2" (ngSubmit)="onSearch()" #searchForm="ngForm">
          
          <input 
            class="form-control me-2" 
            type="search" 
            name="searchTerm"
            [(ngModel)]="searchTerm"
            placeholder="Search" 
          >
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>

        <!-- User menu -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            
            
            <a class="nav-link dropdown-toggle d-flex align-items-center" 
               href="#" 
               id="userDropdown" 
               role="button" 
               data-bs-toggle="dropdown">
              <i class="fas fa-user-circle me-1"></i>
              <span *ngIf="isAuthenticated(); else accountText">
                {{ getUsername() }}
              </span>
              <ng-template #accountText>
                <span>Account</span>
              </ng-template>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <ng-container *ngIf="isAuthenticated(); else loginRegister">
                <li>
                  <a class="dropdown-item" routerLink="/profile">
                    <i class="fas fa-user me-2"></i>Profile
                  </a>
                </li>
               
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item" (click)="logout()">
                    <i class="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </li>
              </ng-container>
              <ng-template #loginRegister>
                <li>
                  <a class="dropdown-item" routerLink="/login">
                    <i class="fas fa-sign-in-alt me-2"></i>Login
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" routerLink="/register">
                    <i class="fas fa-user-plus me-2"></i>Register
                  </a>
                </li>
              </ng-template>
            </ul>
          </li>
          
          <!-- Shopping Cart -->
          <li class="nav-item">
            <a class="nav-link position-relative" routerLink="/cart" id="cartIcon">
              <i class="fas fa-shopping-cart"></i>
              <span 
                *ngIf="isAuthenticated() && cartItemCount > 0"
                class="badge bg-primary position-absolute"
                style="top: -5px; right: -10px;"
              >
                {{ cartItemCount }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
  `,
  styles: [`
    .navbar {
      padding: 0.8rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,.1);
    }

    .navbar-brand img {
      transition: transform 0.3s ease;
    }

    .navbar-brand:hover img {
      transform: scale(1.05);
    }

    .nav-link {
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #007bff !important;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      transition: background-color 0.3s ease;
    }

    .dropdown-item i {
      width: 20px;
      text-align: center;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
    }

    #cartIcon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    #cartIcon:hover {
      transform: scale(1.1);
    }
  `]
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.updateCartCount();
    
    this.cartService.cartItems$.subscribe(() => {
      this.updateCartCount();
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.cartItemCount = 0;
    this.router.navigate(['/']);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchTerm },
      });
    }
  }

  private updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }
}
