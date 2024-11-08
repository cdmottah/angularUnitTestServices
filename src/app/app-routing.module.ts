import { NgModule } from '@angular/core';
import { PersonComponent } from './components/person/person.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:'/home',component:HomeComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'pico-preview', component: PicoPreviewComponent },
  { path: 'person', component: PersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
