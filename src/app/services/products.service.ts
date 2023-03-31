import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ProductsRespose } from 'src/types';

const PRODUCTS_URL = 'https://v5stg.rossmann.pl/products/v2/api/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts$(page: number, pageSize: number) {
    return this.http
      .get<ProductsRespose>(`${PRODUCTS_URL}?Page=${page}&PageSize=${pageSize}`)
      .pipe(map((x) => x.data.products));
  }
}
