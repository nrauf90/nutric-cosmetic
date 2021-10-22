import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ApiService } from "../service/api.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /*
  * Form Group to bind input controls
  */
  registerForm = new FormGroup({
    brand_email_address: new FormControl('',[Validators.email, Validators.required]),
    brand_display_name: new FormControl('',[Validators.required]),
    brand_company_name: new FormControl('',[Validators.required]),
    brand_director_name: new FormControl('',[Validators.required]),
    brand_phone_number: new FormControl('',[Validators.required]),
    brand_mobile_number: new FormControl('',[Validators.required]),
    brand_first_name: new FormControl('',[Validators.required]),
    brand_last_name: new FormControl('',[Validators.required]),
    brand_tax_id: new FormControl('',[Validators.required]),
    brand_website_url: new FormControl('',[Validators.required]),
    company_aggrement: new FormControl('',[Validators.required])
  });

  /*
 * Validation variables
 */
  error = true;
  emailError = false;
  emailRMsg = '';
  companyError = false;
  companyMsg = '';
  directorError = false;
  directorMsg = '';
  phoneError = false;
  phoneMsg = '';
  firstNameError = false;
  firstNameMsg = '';
  loginuserId = 1;
  showMainContent: Boolean = true;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {
    this.getBrandDetail();
    console.info(this.getBrandDetail());
  }
  ShowHideButton() {
    if(this.signupFirstStepValidation()) {
      this.showMainContent = this.showMainContent ? false : true;
    }
  }
  getBrandDetail(){

    this.apiService.getBrandDetail(this.loginuserId)
      .pipe(first())
      .subscribe(
          //x => this.registerForm.patchValue(x)
      );
  }

  /*
  * Login function to validate and submit data
  */
  userRegister() {

    /*
    * Validate input data before login
    */
    if(this.signupValidation()){
      var brandArray = {
        'brand_display_name' :this.registerForm.get('brand_display_name')?.value,
        'brand_company_name' :this.registerForm.get('brand_company_name')?.value,
        'brand_email_address' :this.registerForm.get('brand_email_address')?.value,
        'brand_director_name' :this.registerForm.get('brand_director_name')?.value,
        'brand_phone_number' :this.registerForm.get('brand_phone_number')?.value,
        'brand_mobile_number' :this.registerForm.get('brand_mobile_number')?.value,
        'brand_first_name' :this.registerForm.get('brand_first_name')?.value,
        'brand_last_name' :this.registerForm.get('brand_last_name')?.value,
        'brand_tax_id' :this.registerForm.get('brand_tax_id')?.value,
        'brand_website_url' :this.registerForm.get('brand_website_url')?.value
      };
      this.apiService.register(brandArray)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log(brandArray);
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
  signupValidation(){
    /*
    * Email validation before login
    */
    if(this.registerForm.get('brand_email_address')?.hasError('required')){
      this.emailError = true;
      this.emailRMsg = 'Email is required.'
    }else{
      if(this.registerForm.get('brand_email_address')?.hasError('email')){
        this.emailError = true;
        this.emailRMsg = 'Please enter valid email.'
      }else{
        this.emailError = false
      }
    }

    return true;
  }

  signupFirstStepValidation(){
    this.error = true;
    /*
    * Email validation before login
    */

    if(this.registerForm.get('brand_company_name')?.hasError('required')){
      this.companyError = true;
      this.error = false;
      this.companyMsg = 'Compnay Name is required.'
    }
    if(this.registerForm.get('brand_director_name')?.hasError('required')){
      this.directorError = true;
      this.directorMsg = 'Director Name is required.'
      this.error = false;
    }

    return this.error;
  }
}
