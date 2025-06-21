import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoriesComponent, FeaturedProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
