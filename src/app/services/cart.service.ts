import { Injectable } from '@angular/core';
import { CartItem } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  addToCart(product: CartItem) {
    // TODO handle case when product is already in cart
    this.items.push(product);
  }

  removeFromCart(product: CartItem) {
    // TODO handle case when product is not in cart
    this.items = this.items.filter((item) => item.id !== product.id);
  }

  isInCart(id: number) {
    return this.items.some((item) => item.id === id);
  }

  getCart() {
    return this.items;
  }
}
