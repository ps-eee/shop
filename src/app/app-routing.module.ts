import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SetupPageComponent } from './components/setup-page/setup-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'setup', component: SetupPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
