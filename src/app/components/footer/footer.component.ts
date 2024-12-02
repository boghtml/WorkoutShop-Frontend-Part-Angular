import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>About WorkoutShop</h5>
            <p>Your one-stop shop for all your workout equipment needs.</p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact</a></li>
              <li><a routerLink="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Connect With Us</h5>
            <ul class="list-inline">
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fab fa-instagram fa-2x"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="text-center">
          <p class="mb-0">&copy; {{ currentYear }} - WorkoutShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #f8f9fa;
      padding: 3rem 0;
      margin-top: auto;
      border-top: 1px solid #dee2e6;
    }

    .footer h5 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .footer a {
      color: #6c757d;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer a:hover {
      color: #007bff;
    }

    .list-unstyled li {
      margin-bottom: 0.5rem;
    }

    .list-inline-item:not(:last-child) {
      margin-right: 1.5rem;
    }

    hr {
      margin: 2rem 0;
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}