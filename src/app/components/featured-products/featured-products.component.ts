import { Component } from '@angular/core';
import { ProductCardComponent } from "../../compontnts/product-card/product-card.component";

@Component({
  selector: 'app-featured-products',
  imports: [ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent {

}
