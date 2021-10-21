import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ApiService } from "../service/api.service";
import { first } from "rxjs/operators";
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  /*
* Form Group to bind input controls
*/
  billingForm = new FormGroup({
    bank_name: new FormControl('',[Validators.required]),
    bank_routing_number: new FormControl('',[Validators.required]),
    bank_account_number: new FormControl('',[Validators.required]),
    bank_iban_number: new FormControl('',[Validators.required]),
    bank_bic_number: new FormControl('',[Validators.required]),
    location_address_line1: new FormControl('',[Validators.required]),
    location_address_line2: new FormControl('',[Validators.required]),
    location_city: new FormControl('',[Validators.required]),
    location_state: new FormControl('',[Validators.required]),
    location_zip: new FormControl('',[Validators.required]),
    location_country: new FormControl('',[Validators.required]),
    brand_phone_number: new FormControl('',[Validators.required]),
    brand_address_type: new FormControl('Billing'),
    fk_brand_id: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {

  }

  /*
   * Update Address function to validate and submit data
   */
  updateBilling() {

    /*
    * Validate input data before login
    */
    if(this.addressValidation()){
      var billingArray = {
        'bank_name' :this.billingForm.get('bank_name')?.value,
        'bank_routing_number' :this.billingForm.get('bank_routing_number')?.value,
        'bank_account_number' :this.billingForm.get('bank_account_number')?.value,
        'bank_iban_number' :this.billingForm.get('bank_iban_number')?.value,
        'bank_bic_number' :this.billingForm.get('bank_bic_number')?.value,
        'location_address_line1' :this.billingForm.get('location_address_line1')?.value,
        'brand_address_type' : 'Billing',
        'location_address_line2' :this.billingForm.get('location_address_line2')?.value,
        'location_city' :this.billingForm.get('location_city')?.value,
        'location_state' :this.billingForm.get('location_state')?.value,
        'location_zip' :this.billingForm.get('location_zip')?.value,
        'location_country' :this.billingForm.get('location_country')?.value,
        'brand_phone_number' :this.billingForm.get('brand_phone_number')?.value,
        'fk_brand_id' :2,
      };
      this.apiService.saveBilling(billingArray)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log(billingArray)
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
  addressValidation(){
    return true;
  }


}
