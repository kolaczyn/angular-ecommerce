import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ProductsRespose } from 'src/types';

const PRODUCTS_URL =
  'https://v5stg.rossmann.pl/products/v2/api/Products?ShopNumber=735&PageSize=15&Page=1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-filters';
  counter = 0;

  constructor(private http: HttpClient) {}

  products$ = this.http
    .get<ProductsRespose>(PRODUCTS_URL)
    .pipe(map((x) => x.data.products));

  increment() {
    this.counter++;
  }
}
