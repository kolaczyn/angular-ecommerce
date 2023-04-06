import { Component } from '@angular/core';
import { FiltersService } from './services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  constructor(public filtersService: FiltersService) {}

  addToCart(id: number) {
    alert(`adding to cart ${id}`);
    return;
  }

  isInCart(_idx: number) {
    return false;
  }

  getById<T extends { id: number }>(_idx: number, it: T) {
    return it.id;
  }
}
