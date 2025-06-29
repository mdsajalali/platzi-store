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
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        const total = res.length;
        const maxStart = Math.max(0, total - 4);
        const randomStart = Math.floor(Math.random() * (maxStart + 1));
        this.products = res.slice(randomStart, randomStart + 4);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.loading = false;
      },
    });
  }
}
