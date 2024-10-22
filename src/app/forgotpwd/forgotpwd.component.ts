import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-login-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForgotpwdComponent {
  resetPwd: FormGroup;
  userEmail: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPwd = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.userEmail = currentUser;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('signupData') || '[]');
    if (storedUsers.length && this.userEmail) {
      const user = storedUsers.find((u: any) => u.email === this.userEmail);
      if (user) {
        user.password = this.resetPwd.get('password')?.value;
        localStorage.setItem('signupData', JSON.stringify(storedUsers));
        this.router.navigate(['/login']);
      } else {
        console.log('User not found');
      }
    }
  }
}
