import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AddressComponent} from "./address/address.component";
import {BillingComponent} from "./billing/billing.component";
import {CompanyComponent} from "./company/company.component";
import {ProductInfoComponent} from "./productInfo/productInfo.component";
import {ProductsComponent} from "./products/products.component";
import {SyncingComponent} from "./syncing/syncing.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-address', component: AddressComponent },
  { path: 'manage-billing', component: BillingComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'product-info', component: ProductInfoComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'syncing', component: SyncingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
