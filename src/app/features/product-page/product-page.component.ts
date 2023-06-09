import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/products.service';
import { isNotNull } from 'src/app/shared/isNotNull';

@Component({
  selector: 'app-product-page',
  template: `
    <p>product-page works!</p>
    <div>{{ id$ | async }}</div>
    <div *ngIf="product$ | async as product">
      {{ product.brand }} {{ product.caption }}
    </div>
  `,
})
export class ProductPageComponent {
  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  id$ = this.router.paramMap.pipe(map((params) => params.get('id')));
  product$ = this.id$.pipe(
    filter(isNotNull),
    switchMap((id) => this.productsService.getProduct(id))
  );
}
