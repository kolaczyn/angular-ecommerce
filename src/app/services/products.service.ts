import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ProductsRespose } from 'src/types';

const PRODUCTS_URL =
  'https://v5stg.rossmann.pl/products/v2/api/Products?ShopNumber=735&PageSize=15&Page=1';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  get$ = this.http
    .get<ProductsRespose>(PRODUCTS_URL)
    .pipe(map((x) => x.data.products));
}
