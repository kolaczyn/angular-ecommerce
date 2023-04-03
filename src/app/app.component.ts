import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
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

  getPage() {
    return this.page.value;
  }

  getPageSize() {
    return this.pageSize.value;
  }

  setPage(page: number) {
    this.page.next(page);
  }

  setPageSize(pageSize: 12 | 24 | 36) {
    this.pageSize.next(pageSize);
  }

  setStatus(statusId: string) {
    const nextStatus = this.isActiveStatus(statusId) ? null : statusId;
    this.status.next(nextStatus);
  }

  isActivePage(page: number) {
    return this.page.value === page;
  }

  isActivePageSize(pageSize: number) {
    return this.pageSize.value === pageSize;
  }

  isActiveStatus(status: null | string) {
    return this.status.value === status;
  }

  getProductId(_idx: number, product: ProductDto) {
    return product.id;
  }

  filters$ = this.productService.getFilters$();

  pageOptions = [1, 2, 3, 4] as const;
  pageSizeOptions = [12, 24, 36] as const;

  products$ = combineLatest([this.page$, this.pageSize$, this.status$]).pipe(
    map(([page, pageSize, status]) => ({
      page,
      pageSize,
      status,
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    switchMap(({ page, pageSize, status }) =>
      this.productService.getProducts$({ page, pageSize, status: status ?? '' })
    )
  );
}
