import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  mergeMap,
  switchMap,
} from 'rxjs';
import { ProductDto } from 'src/types';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private productService: ProductsService) {}

  title = 'product-filters';
  private page = new BehaviorSubject(1);

  page$ = this.page.asObservable();
  private pageSize = new BehaviorSubject<12 | 24 | 36>(12);
  pageSize$ = this.pageSize.asObservable();

  private status = new BehaviorSubject<null | string>(null);
  status$ = this.status.asObservable();

  setPage(page: number) {
    this.page.next(page);
  }

  setPageSize(pageSize: 12 | 24 | 36) {
    this.pageSize.next(pageSize);
  }

  setStatus(status: null | string) {
    this.status.next(status);
  }

  isActivePage(page: number) {
    return this.page.value === page;
  }

  getProductId(_idx: number, product: ProductDto) {
    return product.id;
  }

  filters$ = this.productService.getFilters$();

  products$ = combineLatest([this.page$, this.pageSize$, this.status$]).pipe(
    map(([page, pageSize, status]) => ({
      page,
      pageSize,
      status,
    })),
    switchMap(({ page, pageSize, status }) =>
      this.productService.getProducts$({ page, pageSize, status: status ?? '' })
    )
  );
}
