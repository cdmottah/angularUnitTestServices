import { NgModule } from '@angular/core';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  // {path:'/home',component:HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'pico-preview', component: PicoPreviewComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
