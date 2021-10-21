import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ApiService } from "../service/api.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /*
  * Form Group to bind input controls
  */
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  /*
  * Validation variables
  */
  emailError = false;
  emailRMsg = '';
  passwordError = false;
  passwordMsg = '';

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {

  }

  /*
  * Login function to validate and submit data
  */
  userAuth() {

    /*
    * Validate input data before login
    */
    if(this.loginValidation()){
      console.log(this.loginForm.get('email')?.value);
      this.apiService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('test')
          },
          error: error => {
            console.log(error)
          }
        });
    }

  }

  /*
  * Form validation function
  */
  loginValidation(){
    /*
    * Email validation before login
    */
    if(this.loginForm.get('email')?.hasError('required')){
      this.emailError = true;
      this.emailRMsg = 'Email is required.'
    }else{
      if(this.loginForm.get('email')?.hasError('email')){
        this.emailError = true;
        this.emailRMsg = 'Please enter valid email.'
      }else{
        this.emailError = false
      }
    }

    /*
    * Password validation before login
    */
    if(this.loginForm.get('password')?.hasError('required')){
      this.passwordError = true;
      this.passwordMsg = 'Password is required.'
    }else{
      if(this.loginForm.get('password')?.hasError('minlength')){
        this.passwordError = true;
        this.passwordMsg = 'Password must be at least 6 character long.'
      }else{
        this.passwordError = false
      }
    }

    if( this.emailError || this.passwordError){
      return false;
    }else{
      return true;
    }
  }
}
