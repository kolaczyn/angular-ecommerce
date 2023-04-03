import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDto } from 'src/types';

@Component({
  selector: 'app-product-tile[product]',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css'],
})
export class ProductTileComponent {
  @Input() product!: ProductDto;
  @Input() isInCart = false;
  @Output() addToCart = new EventEmitter();

  get href() {
    return `/products/${this.product.id}`;
  }
}
