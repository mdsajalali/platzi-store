import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: { id: number; name: string; image: string }[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loading = false;
      },
    });
  }

  onCategoryClick(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }
}
