import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, this.categoryIdValidator]],
      images: this.fb.array([], Validators.required),
    });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  categoryIdValidator(control: AbstractControl): ValidationErrors | null {
    const value = +control.value;
    if (!value || value < 1 || value > 100) {
      return { invalidCategoryId: true };
    }
    return null;
  }

  addImageUrl(event: Event) {
    const input = event.target as HTMLInputElement;
    const url = input.value.trim();

    if (url && url.startsWith('http')) {
      this.images.push(this.fb.control(url));
      input.value = '';
    }
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    this.productService.createProduct(data).subscribe({
      next: () => {
        alert('✅ Product created successfully!');
        this.router.navigate(['/dashboard/products']);
      },
      error: (err) => {
        console.error('❌ Failed to create product', err);
        alert('❌ Failed to create product');
      },
    });
  }
}
