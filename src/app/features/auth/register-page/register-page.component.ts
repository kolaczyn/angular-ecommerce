import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm">
      <label for="email">Email</label>
      <input type="email" id="email" formControlName="email" />
      <br />

      <label for="username">Username</label>
      <input type="text" id="username" formControlName="username" />
      <br />

      <label for="password">Password</label>
      <input type="password" id="password" formControlName="password" />
      <div>{{ passwordMessage$ | async }}</div>
      <br />
    </form>
  `,
  styles: [],
})
export class RegisterPageComponent {
  constructor(private fb: FormBuilder) {}
  registerForm = this.fb.group({
    email: this.fb.control('', { nonNullable: true }),
    username: this.fb.control('', { nonNullable: true }),
    password: this.fb.control('', { nonNullable: true }),
    sendNewsletter: this.fb.control('', { nonNullable: true }),
  });

  passwordMessage$ = this.registerForm.valueChanges.pipe(
    map((x) => x.password),
    map((x) => {
      if (x == null || x === '') return null;
      if (x?.length <= 6) return 'Weak password';
      return 'Pretty good password';
    })
  );
}
