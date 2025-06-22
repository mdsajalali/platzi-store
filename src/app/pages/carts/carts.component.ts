import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css',
})
export class CartsComponent implements OnInit{
  cartItems: {
    product: Product;
    quantity: number;
  }[] = [];

  shipping = 5;
  subtotal = 0;
  total = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const productIds = Object.keys(cart);

    if (productIds.length === 0) {
      this.cartItems = [];
      this.calculateTotals();
      return;
    }

    Promise.all(
      productIds.map((id) =>
        this.productService.getProductById(+id).toPromise()
      )
    ).then((products: any) => {
      this.cartItems = products.map((product: any) => ({
        product,
        quantity: cart[product.id],
      }));
      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    this.total = this.subtotal + this.shipping;
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.updateCartStorage();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCartStorage();
    }
  }

  updateQuantity(event: any, index: number) {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value) || value <= 0) {
      value = 1;
      event.target.value = '1';
    }

    this.cartItems[index].quantity = value;
    this.updateCartStorage();
  }

  updateCartStorage() {
    const cart: Record<number, number> = {};
    this.cartItems.forEach((item) => {
      cart[item.product.id] = item.quantity;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    this.calculateTotals();
    window.dispatchEvent(new Event('cartUpdated'));
  }

  removeItem(index: number) {
    const productId = this.cartItems[index].product.id;
    this.cartItems.splice(index, 1);

    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));

    this.calculateTotals();
    window.dispatchEvent(new Event('cartUpdated'));
  }

  proceedToPayment() {
    alert(
      'Thank you for your purchase! Your order has been processed successfully.'
    );
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.subtotal = 0;
    this.total = 0;
    window.dispatchEvent(new Event('cartUpdated'));

    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 3000);
  }
}
