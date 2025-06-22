import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-products',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        const total = res.length;
        const maxStart = Math.max(0, total - 4);
        const randomStart = Math.floor(Math.random() * (maxStart + 1));
        this.products = res.slice(randomStart, randomStart + 4);
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
    });
  }
}
