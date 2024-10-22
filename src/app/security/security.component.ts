import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-login-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SecurityComponent implements OnInit {
  securityForm: FormGroup;
  securityQuestion: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {
    this.securityForm = new FormGroup({
      securityAnswer: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const email = localStorage.getItem('currentUser');
    const signupData = JSON.parse(localStorage.getItem('signupData') || '[]');

    if (Array.isArray(signupData)) {
      const user = signupData.find((user: any) => user.email === email);
      if (user) {
        this.securityQuestion = user.security;
      } else {
        this.errorMessage = 'User not found.';
      }
    }
  }

  onSubmit(): void {
    const userInput = this.securityForm.get('securityAnswer')?.value;
    const email = localStorage.getItem('currentUser');
    const signupData = JSON.parse(localStorage.getItem('signupData') || '[]');
    const user = signupData.find((user: any) => user.email === email);

    if (user) {
      const correctAnswer = user.answer;
      if (userInput === correctAnswer) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/forgotpwd']);
      } else {
        this.errorMessage = 'Wrong answer. Please try again.';
      }
    } else {
      this.errorMessage = 'User not found.';
    }
  }
}
