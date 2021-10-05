import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(this.loginForm.email,[Validators.email, Validators.required]),
      password: new FormControl(this.loginForm.password, [Validators.required, Validators.min(1), Validators.maxLength(6)])
    })
  }

  login() {
    console.log();
  }

}
