import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
    if (!value || value < 1 || value > 6) {
      return { invalidCategoryId: true };
    }
    return null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.images.push(this.fb.control(result));
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    console.log('Submitted:', data);
    alert('✅ Product created successfully!');
    this.router.navigate(['/all-products']);
  }
}
