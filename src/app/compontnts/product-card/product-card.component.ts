import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../types';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[this.product.id]) {
      cart[this.product.id] += 1;
    } else {
      cart[this.product.id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }
}
