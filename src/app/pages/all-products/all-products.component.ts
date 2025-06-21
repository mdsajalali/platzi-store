import { Component } from '@angular/core';
import { Product } from '../../types';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  products: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter((p) => p.id !== productId);
      });
    }
  }
}
