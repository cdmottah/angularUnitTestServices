import { TestBed } from '@angular/core/testing';
import { generateManyProducts, generateOneProduct } from '@models/product.mock'
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateProductDTO, Product } from '@models/product.model';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpController.verify();
  })

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {

    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productsService.getAllSimple().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);


    })

  })

  describe('test for getAll', () => {

    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productsService.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);

    })

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [{
        ...generateOneProduct(),
        price: 100 // 100 * 0.19 = 19
      }, {
        ...generateOneProduct(),
        price: 200 // 200 * 0.19 = 38
      }, {
        ...generateOneProduct(),
        price: 0 // 0 * 0.19 = 0
      }, {
        ...generateOneProduct(),
        price: -100 // -100 * 0.19 => 0
      }
      ]

      productsService.getAll().subscribe(data => {

        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);

    })

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(7);
      const limit = 10;
      const offset = 3;
      //Act
      productsService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const { params } = req.request
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);

    })

    it('should dont send query params with limit 0 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(7);
      const limit = 0;
      const offset = 3;
      //Act
      productsService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const { params } = req.request
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();

    })

    it('should dont send query params with limit 10 and offset 0', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(7);
      const limit = 10;
      const offset = 0;
      //Act
      productsService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const { params } = req.request
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();

    })

    it('should dont send query params with limit 10 and offset undefined', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(7);
      const limit = 10;
      const offset = undefined;
      //Act
      productsService.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        // expect(data).toEqual(mockData)
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const { params } = req.request
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();

    })

  })

  describe('test for create', () => {

    it('should return a new product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        categoryId: 0,
        title: 'title',
        price: 0,
        images: ['images1','images2'],
        description: 'description'
      }
      //Act
      productsService.create({...dto}).subscribe(response => {  // se envía ...dto para evitar que mute

        expect(response).toEqual(mockData)
        expect(req.request.body).toEqual(dto)
        //Assert
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST')

    })

  })
});
