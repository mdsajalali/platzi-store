import { Component } from '@angular/core';
import { ProductCardComponent } from '../../compontnts/product-card/product-card.component';
import { Product } from '../../types';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('Products from API:', res);
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
