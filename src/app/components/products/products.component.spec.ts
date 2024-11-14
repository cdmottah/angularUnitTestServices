import { By } from '@angular/platform-browser';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { generateManyProducts } from '@models/product.mock';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';
import { ProductsService } from '@services/products.service';
import { ValueService } from '@services/value.service';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>
  let valueServiceSpy: jasmine.SpyObj<ValueService>
  const productMocks = generateManyProducts(3);

  beforeEach(async () => {
    const _productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const _ValueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: _productsServiceSpy },
        { provide: ValueService, useValue: _ValueServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>

    productsServiceSpy.getAll.and.returnValue(of(productMocks))
    fixture.detectChanges(); // Aquí ya ejecutó el ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be called getAll once when component started', () => {
    expect(productsServiceSpy.getAll).toHaveBeenCalledTimes(1);
  });

  describe('test for getAll products', () => {
    it('should return a list of products from service', () => {
      //Arrange
      const productMocks = generateManyProducts(10);
      const prevProducts = component.products
      productsServiceSpy.getAll.and.returnValue(of(productMocks))
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      //Assert
      expect(component.products.length).toEqual(productMocks.length + prevProducts.length)
    })

    it('should render a list of products from service', () => {
      //Arrange
      const imgDebugElementList = fixture.debugElement.queryAll(By.css('app-product img'));

      //Act

      //Assert
      imgDebugElementList.forEach((imgDebugElement, index) => {
        expect(imgDebugElement.attributes['src']).toEqual(productMocks[index].images[0])
      })

    })

    it('should change the status flag from "loading" to "success" ', fakeAsync(() => {
      //Arrange
      const productMocks = generateManyProducts(10);
      productsServiceSpy.getAll.and.returnValue(defer(() => Promise.resolve(productMocks)))
      const loadingButton = fixture.debugElement.query(By.css('button.test-getAllProducts'))
      const buttonElement = loadingButton.nativeElement as HTMLButtonElement
      //Act
      loadingButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      expect(buttonElement.textContent).toContain('Loading');
      tick(); // execute observables, setTimeOut, Promise  that there are pending, if is the function envolved by fakeAsync
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success');
      expect(buttonElement.textContent).toContain('load More');
    }))

    it('should change the status flag from "loading" to "error" ', fakeAsync(() => {
      //Arrange
      productsServiceSpy.getAll.and.returnValue(defer(() => Promise.reject('error mocked')))
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading')
      tick(4000); // execute observables, setTimeOut, Promise  that there are pending, if is the function envolved by fakeAsync, for timeout is necesary to set a major time
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error')
    }))
  })

  describe('test for callPromise', () => {
    // también puedes usar el fakeAsync y tick para este caso
    it('should call to promise', async () => { // => aquí envolverías el fakeAsync
      //Arrange
      const mockMessage = 'mock message'
      valueServiceSpy.getPromiseValue.and.returnValue(Promise.resolve(mockMessage))
      //Act
      await component.callPromise();
      // => aquí llamarías el tick();
      fixture.detectChanges();
      //Assert
      expect(component.promiseResponse).toEqual(mockMessage)
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalledTimes(1)
    });


    it('should be showed "mock message" in <p> element when button has been clicked', fakeAsync(() => {
      //Arrange
      const mockMessage = 'mock message'
      valueServiceSpy.getPromiseValue.and.returnValue(Promise.resolve(mockMessage))
      const buttonDebug = fixture.debugElement.query(By.css('button.test-button-promise'));
      const paragraphDebug = fixture.debugElement.query(By.css('p.test-p-promise'));
      const paragraphElement = paragraphDebug.nativeElement as HTMLParagraphElement
      //Act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      //Assert
      expect(paragraphElement.textContent).toContain(mockMessage)
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalledTimes(1)
    }));
  })

});
