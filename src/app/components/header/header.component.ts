import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isMobileDashboardOpen = false;
  cartQuantity: any = 0;

  ngOnInit() {
    this.updateCartQuantity();
    window.addEventListener('cartUpdated', this.updateCartQuantity);
  }

  ngOnDestroy() {
    window.removeEventListener('cartUpdated', this.updateCartQuantity);
  }

  updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    this.cartQuantity = Object.values(cart).reduce(
      (sum: any, qty: any) => sum + qty,
      0
    );
  };

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isMobileDashboardOpen = false;
  }

  toggleMobileDashboard() {
    this.isMobileDashboardOpen = !this.isMobileDashboardOpen;
  }
}
