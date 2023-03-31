import { Component } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-filters';
  private currentPage = new BehaviorSubject(1);
  page$ = this.currentPage.asObservable();

  setPage(page: number) {
    this.currentPage.next(page);
  }

  constructor(private products: ProductsService) {}

  getProducts$ = this.page$.pipe(
    switchMap((page) => this.products.getProducts$(page, 10))
  );
}
