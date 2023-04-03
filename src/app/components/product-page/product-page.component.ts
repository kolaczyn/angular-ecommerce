import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { isNotNull } from 'src/app/utils/isNotNull';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
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
