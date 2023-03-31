import { Component } from '@angular/core';
import { BehaviorSubject, mergeMap, switchMap } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-filters';
  private page = new BehaviorSubject(1);
  page$ = this.page.asObservable();
  private pageSize = new BehaviorSubject<12 | 24 | 36>(12);
  pageSize$ = this.pageSize.asObservable();

  setPage(page: number) {
    this.page.next(page);
  }

  setPageSize(pageSize: 12 | 24 | 36) {
    this.pageSize.next(pageSize);
  }

  constructor(private products: ProductsService) {}

  getProducts$ = this.page$.pipe(
    mergeMap((page) =>
      this.pageSize$.pipe(
        switchMap((pageSize) => this.products.getProducts$(page, pageSize))
      )
    )
  );
}
