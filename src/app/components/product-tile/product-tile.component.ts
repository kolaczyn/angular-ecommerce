import { Component, Input } from '@angular/core';
import { ProductDto } from 'src/types';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css'],
})
export class ProductTileComponent {
  @Input() product!: ProductDto;

  get href() {
    return `/products/${this.product.id}`;
  }
}
