import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getProducts(filters?: { title?: string; categoryId?: number }) {
    let params = new HttpParams();

    if (filters?.title) {
      params = params.set('title', filters.title);
    }

    if (filters?.categoryId) {
      params = params.set('categoryId', filters.categoryId.toString());
    }

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  createProduct(data: Product): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  getCategories() {
    return this.http.get<{ id: number; name: string; image: string }[]>(
      'https://api.escuelajs.co/api/v1/categories'
    );
  }

  updateProduct(
    productId: number,
    data: { title: string; price: number }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, data);
  }
}
