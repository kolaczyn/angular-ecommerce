import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-filters';
  counter = 0;

  constructor(private products: ProductsService) {}

  get products$() {
    return this.products.get$;
  }

  increment() {
    this.counter++;
  }
}
