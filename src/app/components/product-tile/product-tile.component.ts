import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDto } from 'src/types';

@Component({
  selector: 'app-product-tile[product]',
  template: `
    <div>
      <a [routerLink]="href">
        <div>
          {{ product.brand }}
          {{ product.caption }}
        </div>
      </a>
      <button (click)="addToCart.emit()" mat-button>Add to cart</button>
      <hr />
    </div>
  `,
})
export class ProductTileComponent {
  @Input() product!: ProductDto;
  @Input() isInCart = false;
  @Output() addToCart = new EventEmitter();

  get href() {
    return `/products/${this.product.id}`;
  }
}
