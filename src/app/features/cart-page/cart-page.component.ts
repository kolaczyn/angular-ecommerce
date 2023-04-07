import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart-page',
  template: `
    <button (click)="loadCartWithRandomItems()">
      Load Cart With Random Items
    </button>
    <div *ngIf="cart.$items | async as items">
      <div *ngFor="let item of items">
        <div>{{ item.id }} {{ item.brand }}</div>
        <button (click)="cart.removeItem(item.id)">Remove</button>
      </div>
    </div>
  `,
  styles: [],
})
export class CartPageComponent {
  constructor(public cart: CartService) {}

  loadCartWithRandomItems() {
    this.cart.addNew({
      id: 1,
      brand: 'Nike',
      caption: 'Air Max 90',
      navigateUrl: '/products/1',
      quantity: 1,
    });
    this.cart.addNew({
      id: 2,
      brand: 'Puma',
      caption: 'Basket Classic',
      navigateUrl: '/products/2',
      quantity: 1,
    });
  }
}
