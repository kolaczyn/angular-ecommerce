import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from 'src/types';

const ENDPOINT = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private user = new BehaviorSubject<User | 'none' | 'fetching' | 'failed'>(
    'none'
  );
  user$ = this.user.asObservable();

  register(user: Omit<User, 'id'>): void {
    this.user.next('fetching');
    this.http
      .post<User>(ENDPOINT, user)
      .pipe(tap((x) => this.user.next(x)))
      // I don't really like this, I'll have to find a better way to do it, so I don't have to use subscribe and tap
      .subscribe();
  }

  login(loginCredentials: { username: string; password: string }): void {
    const queryString = new HttpParams({ fromObject: loginCredentials });
    this.user.next('fetching');
    this.http
      .get<User[]>(`${ENDPOINT}?${queryString.toString()}`)
      .pipe(
        map((x) => x[0]),
        map((x) => (x ? x : 'failed')),
        tap((x) => this.user.next(x))
      )
      // I don't really like this, I'll have to find a better way to do it, so I don't have to use subscribe and tap
      .subscribe();
  }

  logout(): void {
    this.user.next('none');
  }
}
