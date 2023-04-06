import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button data-cy="counter-button" mat-button (click)="increment()">
      {{ value }}
    </button>
  `,
  styles: [],
})
export class CounterComponent {
  value = 0;

  increment() {
    this.value += 1;
  }
}
