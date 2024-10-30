import { TestBed } from '@angular/core/testing';
import { generateManyProducts, generateOneProduct } from '@models/product.mock'
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateProductDTO, Product, UpdateProductDTO } from '@models/product.model';
import { environment } from 'src/environments/environment';
import { HttpStatusCode } from '@angular/common/http';

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

  afterEach(() => {
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
        images: ['images1', 'images2'],
        description: 'description'
      }
      //Act
      productsService.create({ ...dto }).subscribe(response => {  // se envía ...dto para evitar que mute

        expect(response).toEqual(mockData)

        //Assert
        doneFn();
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('POST')

    })

  })

  describe('test for update', () => {

    it('should update the title of a product with id 1', (doneFn) => {
      //Arrange
      const mockData = {
        ...generateOneProduct(),
        id: '1',
        title: 'new title'
      }
      const id = '1';
      const dto: UpdateProductDTO = {
        title: 'new title'
      }
      //Act
      productsService.update(id, { ...dto }).subscribe(response => {

        expect(response).toEqual(mockData)
        doneFn()
        //Assert
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('PUT')
    })

  })

  describe('test for delete', () => {

    it('should delete a product with id 1', (doneFn) => {
      //Arrange
      const id = '1';
      //Act
      productsService.delete(id).subscribe(response => {
        expect(response).toBeTrue()
        doneFn()
        //Assert
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(true);
      expect(req.request.method).toEqual('DELETE')
    })

  })

  describe('test for getOne', () => {

    it('should return one product with id 1', (doneFn) => {
      //Arrange
      const mockData = {
        ...generateOneProduct(),
        id: '1',
        title: 'new title'
      }
      const productId = '1';

      //Act
      productsService.getOne(productId).subscribe(response => {

        expect(response).toEqual(mockData)
        doneFn()
        //Assert
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

      expect(req.request.method).toEqual('GET')
    })

    it('should return right message when status code is not found', (doneFn) => {
      //Arrange
      const messageError = "404 message"
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError
      }
      const productId = '1';

      //Act
      productsService.getOne(productId).subscribe({
        error:(err)=> {
          //Assert
          expect(err).toEqual('El producto no existe')
          doneFn();
        },
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError,mockError);

      expect(req.request.method).toEqual('GET')
    })

    it('should return right message when is a conflict', (doneFn) => {
      //Arrange
      const messageError = "500 error"
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: messageError
      }
      const productId = '1';

      //Act
      productsService.getOne(productId).subscribe({
        error:(err)=> {
          //Assert
          expect(err).toEqual('Algo esta fallando en el server')
          doneFn();
        },
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError,mockError);

      expect(req.request.method).toEqual('GET')
    })

    it('should return right message when is Unauthorized', (doneFn) => {
      //Arrange
      const messageError = "401 error"
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: messageError
      }
      const productId = '1';

      //Act
      productsService.getOne(productId).subscribe({
        error:(err)=> {
          //Assert
          expect(err).toEqual('No estas permitido')
          doneFn();
        },
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError,mockError);

      expect(req.request.method).toEqual('GET')
    })

    it('should return right message when unexpected error happend, this case InternalServerError', (doneFn) => {
      //Arrange
      const messageError = "unknown error"
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: messageError
      }
      const productId = '1';

      //Act
      productsService.getOne(productId).subscribe({
        error:(err)=> {
          //Assert
          expect(err).toEqual('Ups algo salio mal')
          doneFn();
        },
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError,mockError);

      expect(req.request.method).toEqual('GET')
    })

  })
});
