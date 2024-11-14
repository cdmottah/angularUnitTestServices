import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { ValueService } from '@services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = []
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init'
  promiseResponse = ''
  constructor(
    private _productsService: ProductsService,
    private _valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this._productsService.getAll(this.limit, this.offset).subscribe({
      next: products => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: error => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000)
      }
    })
  }

  async callPromise(){
    this.promiseResponse = await this._valueService.getPromiseValue();

  }

}
