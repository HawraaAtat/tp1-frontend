import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../../shared/authentication/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  authService: AuthService;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      admin: [false],
      termsAndConditions: [false, Validators.requiredTrue]
    });
    this.authService = authService;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.log("invalid")
      // mark all form controls as touched to display the error messages
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
      return;
    }

    if (this.signupForm.valid) {
      const signupData = {
        Firstname: this.signupForm.get('firstName')?.value,
        Lastname: this.signupForm.get('lastName')?.value,
        Email: this.signupForm.get('email')?.value,
        Password: this.signupForm.get('password')?.value,
        RoleName: this.signupForm.get('admin')?.value ? 'admin' : 'user'
      };

      const apiEndpoint = this.signupForm.get('admin')!.value
        ? 'http://173.249.40.235:5005/api/User/CreateAdminUser()'
        : 'http://173.249.40.235:5005/api/User/SignUp()';

      this.http.post(apiEndpoint, signupData)
        .subscribe(response => {
          console.log(response);
          const email = this.signupForm.get('email')!.value;
          const password = this.signupForm.get('password')!.value;
          this.authService.login(email, password).subscribe(data => {
            console.log(data);
            localStorage.setItem('AccessToken', data.Login.AccessToken);
            localStorage.setItem('RefreshToken', data.Login.RefreshToken);
            // handle success
            this.router.navigate(['/']);
          }, error => {
            console.error(error);
            // handle error
          });
        }, error => {
          console.error(error);
        });
    }
  }

}
