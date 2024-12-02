import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: any;
  quantity = 1;
  activeImageIndex = 0;
  isLoading = false;
  error: string | null = null;
  isAddingToCart = false;
  
  @ViewChild('productCarousel', { static: false }) productCarousel!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.productId = id;
        this.loadProduct();
      }
    });
  }
  
  loadProduct() {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        if (data) {
          this.product = {
            ...data,
            productImages: Array.isArray(data.productImages) 
              ? data.productImages 
              : data.productImages?.$values || []
          };
          this.initializeCarousel();
        } else {
          this.error = 'Продукт не знайдено';
        }
      },
      error: (error) => {
        console.error('Помилка при завантаженні продукту:', error);
        this.error = 'Помилка при завантаженні продукту. Спробуйте пізніше.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  initializeCarousel() {
    setTimeout(() => {
      if (this.productCarousel?.nativeElement) {
        const carousel = new bootstrap.Carousel(this.productCarousel.nativeElement, {
          interval: false 
        });
      }
    });
  }

  addToCart() {
    if (this.isAddingToCart || !this.product) return;
    
    if (this.quantity < 1 || this.quantity > this.product.stockQuantity) {
      this.showToast('Помилка', 'Невірна кількість товару', 'danger');
      return;
    }

    this.isAddingToCart = true;
    
    this.cartService.addToCart(this.productId, this.quantity).subscribe({
      next: () => {
        this.showToast('Успіх', 'Товар додано до кошика!', 'success');
      },
      error: (error) => {
        console.error('Помилка при додаванні до кошика:', error);
        this.showToast('Помилка', 'Помилка при додаванні товару до кошика', 'danger');
      },
      complete: () => {
        this.isAddingToCart = false;
      }
    });
  }

  selectImage(index: number) {
    if (this.productCarousel?.nativeElement) {
      this.activeImageIndex = index;
      const carousel = new bootstrap.Carousel(this.productCarousel.nativeElement);
      carousel.to(index);
    }
  }

  prevImage() {
    if (this.product?.productImages?.length) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.product.productImages.length) 
        % this.product.productImages.length;
      this.selectImage(this.activeImageIndex);
    }
  }

  nextImage() {
    if (this.product?.productImages?.length) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.product.productImages.length;
      this.selectImage(this.activeImageIndex);
    }
  }

  updateQuantity(value: number) {
    const newQuantity = this.quantity + value;
    if (this.product && newQuantity >= 1 && newQuantity <= this.product.stockQuantity) {
      this.quantity = newQuantity;
    }
  }

  private showToast(title: string, message: string, type: 'success' | 'danger') {
    const toast = document.createElement('div');
    toast.className = `toast show position-fixed bottom-0 end-0 m-3`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div class="toast-header bg-${type} text-white">
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  get isOutOfStock(): boolean {
    return this.product?.stockQuantity === 0;
  }

  get hasImages(): boolean {
    return this.product?.productImages?.length > 0;
  }

  get currentImage(): any {
    return this.product?.productImages?.[this.activeImageIndex];
  }

  get formattedPrice(): string {
    return this.product?.price?.toFixed(2) || '0.00';
  }
}