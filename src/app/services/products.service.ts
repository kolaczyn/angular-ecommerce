import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import {
  FiltersQuery,
  FiltersResponse,
  ProductResponse,
  ProductsListResponse,
} from 'src/types';

const PRODUCTS_URL = 'https://www.rossmann.pl/products/v2/api/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductList(params: FiltersQuery) {
    const queryString = new HttpParams({ fromObject: params });
    return this.http
      .get<ProductsListResponse>(`${PRODUCTS_URL}?${queryString.toString()}}`)
      .pipe(
        map((x) => x.data),
        shareReplay()
      );
  }

  getProduct(id: string) {
    return this.http.get<ProductResponse>(`${PRODUCTS_URL}/${id}`).pipe(
      map((x) => x.data),
      shareReplay()
    );
  }

  getFilters() {
    return this.http.get<FiltersResponse>(`${PRODUCTS_URL}/filters`).pipe(
      map((x) => x.data),
      shareReplay()
    );
  }
}
