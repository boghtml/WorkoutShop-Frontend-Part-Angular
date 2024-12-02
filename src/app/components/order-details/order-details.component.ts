//order-details.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: number;
  order: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      },
    });
  }
}
