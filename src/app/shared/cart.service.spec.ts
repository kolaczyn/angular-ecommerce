import { TestBed } from '@angular/core/testing';
import { CartItem } from 'src/types';
import { CartService } from './cart.service';
import { take } from 'rxjs';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should add a new item to the cart', (done) => {
    const item = { id: 1 } as CartItem;
    service.addNew(item);
    service.items$.pipe(take(1)).subscribe((items) => {
      expect(items).toHaveSize(1);
      expect(items[0]).toEqual(item);
      done();
    });
  });
});
