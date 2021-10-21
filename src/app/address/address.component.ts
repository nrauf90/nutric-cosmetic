import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ApiService } from "../service/api.service";
import { first } from "rxjs/operators";
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  /*
* Form Group to bind input controls
*/
  addressForm = new FormGroup({
    location_address_line1: new FormControl('',[Validators.required]),
    location_address_line2: new FormControl('',[Validators.required]),
    location_city: new FormControl('',[Validators.required]),
    location_state: new FormControl('',[Validators.required]),
    location_zip: new FormControl('',[Validators.required]),
    location_country: new FormControl('',[Validators.required]),
    brand_phone_number: new FormControl('',[Validators.required]),
    brand_address_type: new FormControl(''),
    fk_brand_id: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {

  }

  /*
   * Update Address function to validate and submit data
   */
  updateAddress() {

    /*
    * Validate input data before login
    */
    if(this.addressValidation()){
      var addressArray = {
        'location_address_line1' :this.addressForm.get('location_address_line1')?.value,
        'brand_address_type' :this.addressForm.get('brand_address_type')?.value,
        'location_address_line2' :this.addressForm.get('location_address_line2')?.value,
        'location_city' :this.addressForm.get('location_city')?.value,
        'location_state' :this.addressForm.get('location_state')?.value,
        'location_zip' :this.addressForm.get('location_zip')?.value,
        'location_country' :this.addressForm.get('location_country')?.value,
        'brand_phone_number' :this.addressForm.get('brand_phone_number')?.value,
        'fk_brand_id' :2,
      };
      this.apiService.saveAddress(addressArray)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log(addressArray)
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
