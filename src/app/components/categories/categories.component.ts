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

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  onCategoryClick(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }
}
