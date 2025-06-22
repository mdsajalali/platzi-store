import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const productId = +idParam;
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.mainImage = product.images?.[0] || '';
      },
      error: (err) => {
        console.error('Failed to load product', err);
      },
    });
  }

  changeMainImage(url: string) {
    this.mainImage = url;
  }

  addToCart() {
    if (!this.product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[this.product.id]) {
      cart[this.product.id] += 1;
    } else {
      cart[this.product.id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    alert('✅ Product added to cart!');
  }
}
