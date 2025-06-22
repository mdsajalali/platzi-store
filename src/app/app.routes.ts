import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';
import { CartsComponent } from './pages/carts/carts.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
  },
  {
    path: 'cart',
    component: CartsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'dashboard/products',
    component: AllProductsComponent,
  },
  {
    path: 'dashboard/create',
    component: AddProductComponent,
  },
];
