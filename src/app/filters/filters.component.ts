import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { ProductDto } from 'src/types';
import { ProductsService } from '../services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  constructor(private productService: ProductsService) {}

  searchControl = new FormControl('', { nonNullable: true });

  search$ = this.searchControl.valueChanges.pipe(
    debounceTime(125),
    startWith('')
  );

  private page = new BehaviorSubject(1);
  page$ = this.page.asObservable();

  getPage() {
    return this.page.value;
  }

  setPage(page: number) {
    this.page.next(page);
  }

  isActivePage(page: number) {
    return this.page.value === page;
  }

  private pageSize = new BehaviorSubject<12 | 24 | 36>(12);
  pageSize$ = this.pageSize.asObservable();

  getPageSize() {
    return this.pageSize.value;
  }

  setPageSize(pageSize: 12 | 24 | 36) {
    this.pageSize.next(pageSize);
  }

  isActivePageSize(pageSize: number) {
    return this.pageSize.value === pageSize;
  }

  private status = new BehaviorSubject<null | string>(null);
  status$ = this.status.asObservable();

  setStatus(statusId: string) {
    const nextStatus = this.isActiveStatus(statusId) ? null : statusId;
    this.status.next(nextStatus);
  }

  isActiveStatus(status: null | string) {
    return this.status.value === status;
  }

  getProductId(_idx: number, product: ProductDto) {
    return product.id;
  }

  filters$ = this.productService.getFilters();

  pageOptions = [1, 2, 3, 4] as const;
  pageSizeOptions = [12, 24, 36] as const;

  productsResponse$ = combineLatest([
    this.page$,
    this.pageSize$,
    this.status$,
    this.search$,
  ]).pipe(
    map(([page, pageSize, status, search]) => ({
      page,
      pageSize,
      status,
      search,
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    switchMap(({ page, pageSize, status, search }) =>
      this.productService.getProductList({
        page,
        pageSize,
        status: status ?? '',
        search,
      })
    ),
    shareReplay()
  );

  pagesToShow$ = this.productsResponse$.pipe(
    // TODO fix to make it work if e.g. total pages is 3
    map(({ totalPages }) => [1, 2, totalPages - 1, totalPages])
  );
}
