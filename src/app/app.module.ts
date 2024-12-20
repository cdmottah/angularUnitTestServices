import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighLightDirective } from './directives/high-light.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReversePipe } from './pipes/reverse.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PicoPreviewComponent,
    PersonComponent,
    PeopleComponent,
    ProductComponent,
    OthersComponent,
    HighLightDirective,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
