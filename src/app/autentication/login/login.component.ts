import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../countries/shared/authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password:  ['',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalid")
      // mark all form controls as touched to display the error messages
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    let email = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.authService.login(email,password).subscribe((data)=>{

      localStorage.setItem('AccessToken', data.Login.AccessToken);
      localStorage.setItem('RefreshToken', data.Login.RefreshToken);
      this.router.navigate(['/']);
    });
  }

}
