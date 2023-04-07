import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  $items = this.items.asObservable();

  addNew(item: CartItem) {
    const currentItems = this.items.getValue();
    this.items.next([...currentItems, item]);
  }

  removeItem(id: number) {
    const currentItems = this.items.getValue();
    this.items.next(currentItems.filter((item) => item.id !== id));
  }
}
