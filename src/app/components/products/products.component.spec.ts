import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '@services/products.service';
import { generateManyProducts } from '@models/product.mock';
import { of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const _productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: _productsServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    const productMocks = generateManyProducts(3);
    productsServiceSpy.getAll.and.returnValue(of(productMocks))
    fixture.detectChanges(); // Aquí ya ejecutó el ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called getAll once when component started', () => {
    expect(productsServiceSpy.getAll).toHaveBeenCalledTimes(1);
  });

});
