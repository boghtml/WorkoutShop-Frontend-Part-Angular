import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Login</h2>
              
              <form (ngSubmit)="onSubmit(loginForm)" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    [(ngModel)]="username"
                    name="username"
                    #usernameInput="ngModel"
                    id="username"
                    class="form-control"
                    [class.is-invalid]="usernameInput.invalid && usernameInput.touched"
                    required
                    minlength="3"
                  />
                  <div class="invalid-feedback" *ngIf="usernameInput.invalid && usernameInput.touched">
                    <span *ngIf="usernameInput.errors?.['required']">Username is required</span>
                    <span *ngIf="usernameInput.errors?.['minlength']">Username must be at least 3 characters</span>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    [(ngModel)]="password"
                    name="password"
                    #passwordInput="ngModel"
                    id="password"
                    class="form-control"
                    [class.is-invalid]="passwordInput.invalid && passwordInput.touched"
                    type="password"
                    required
                    minlength="6"
                  />
                  <div class="invalid-feedback" *ngIf="passwordInput.invalid && passwordInput.touched">
                    <span *ngIf="passwordInput.errors?.['required']">Password is required</span>
                    <span *ngIf="passwordInput.errors?.['minlength']">Password must be at least 6 characters</span>
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                  >
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-1"></span>
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                  </button>
                </div>

                <div *ngIf="error" class="alert alert-danger mt-3">{{ error }}</div>
              </form>

              <div class="text-center mt-3">
                <p class="mb-0">Don't have an account? <a routerLink="/register">Register</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      border: none;
    }
    .btn-primary {
      padding: 0.8rem;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.error = '';
  
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
      });
  }
  
}