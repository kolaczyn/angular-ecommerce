import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FiltersQuery, FiltersResponse, ProductsRespose } from 'src/types';

const PRODUCTS_URL = 'https://v5stg.rossmann.pl/products/v2/api/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts$({ page, pageSize, status }: FiltersQuery) {
    return this.http
      .get<ProductsRespose>(
        `${PRODUCTS_URL}?Page=${page}&PageSize=${pageSize}&Statuses=${
          status ?? ''
        }`
      )
      .pipe(map((x) => x.data.products));
  }

  getFilters$() {
    return this.http
      .get<FiltersResponse>(`${PRODUCTS_URL}/filters`)
      .pipe(map((x) => x.data));
  }
}
