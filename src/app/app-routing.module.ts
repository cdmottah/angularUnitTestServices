import { NgModule } from '@angular/core';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { OthersComponent } from './components/others/others.component';

const routes: Routes = [
  // {path:'/home',component:HomeComponent},
  { path: 'products', component: ProductsComponent, pathMatch: 'prefix' },
  { path: 'pico-preview', component: PicoPreviewComponent, pathMatch: 'prefix' },
  { path: 'people', component: PeopleComponent, pathMatch: 'prefix' },
  { path: 'others', component: OthersComponent, pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
