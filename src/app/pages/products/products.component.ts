import { Component, effect, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../types';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  searchTitle = signal<string>('');
  selectedCategory = signal<number | null>(null);

  private routeSub: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.routeSub = this.route.queryParamMap.subscribe((params: ParamMap) => {
      const catId = params.get('categoryId');
      this.selectedCategory.set(catId ? +catId : null);
      this.fetchProducts();
    });

    effect(() => {
      this.searchTitle();
      this.selectedCategory();
    });
  }

  fetchProducts() {
    this.loading.set(true);

    this.productService
      .getProducts({
        title: this.searchTitle(),
        categoryId: this.selectedCategory() || undefined,
      })
      .subscribe({
        next: (res) => {
          this.products.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  updateSearch(value: string) {
    this.searchTitle.set(value);
    this.fetchProducts();
  }

  filterByCategory(id: number | null) {
    this.selectedCategory.set(id);
    this.fetchProducts();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
