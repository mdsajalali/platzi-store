import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../types';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  form!: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, this.categoryIdValidator]],
      images: this.fb.array([], Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.loadProduct(this.productId);
    });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  addImageUrl(event: any): void {
    const url = event.target.value.trim();
    if (url) {
      this.images.push(this.fb.control(url));
      event.target.value = '';
      this.form.get('images')?.markAsTouched();
    }
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.form.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
      });
      product.images.forEach((img) => {
        this.images.push(this.fb.control(img));
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      title: this.form.value.title,
      price: this.form.value.price,
    };

    this.productService.updateProduct(this.productId, data).subscribe(() => {
      alert('✅ Product updated successfully!');
      this.router.navigate(['/dashboard/products']);
    });
  }

  categoryIdValidator(control: any): { [key: string]: boolean } | null {
    const value = Number(control.value);
    if (isNaN(value) || value < 1 || value > 5) {
      return { invalidCategoryId: true };
    }
    return null;
  }
}
