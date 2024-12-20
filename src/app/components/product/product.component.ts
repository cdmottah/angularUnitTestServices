import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  @Input() product : Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: 0,
      name: ''
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
