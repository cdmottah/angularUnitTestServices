import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { Auth } from '@models/auth.model';
import { environment } from 'src/environments/environment';

fdescribe('AuthService', () => {
  let authservice: AuthService;
  let tokenService: TokenService
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService
      ]
    });
    authservice = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);

  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(authservice).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token:'123'
      }
      const email = 'mock@email.co'
      const password = 'mockpass'
      //Act
      authservice.login(email,password).subscribe(response=>{

        expect(response).toEqual(mockData)
        //Assert
        doneFn()
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    })

    it('should return a token', (doneFn) => {
      //Arrange
      const mockData: Auth = {
        access_token:'123'
      }
      const email = 'mock@email.co'
      const password = 'mockpass'
      spyOn(tokenService,'saveToken').and.callThrough();
      //Act
      authservice.login(email,password).subscribe(response=>{

        expect(response).toEqual(mockData)
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1)
        expect(tokenService.saveToken).toHaveBeenCalledWith('123')
        //Assert
        doneFn()
      })

      //httpConfig
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockData);
    })
  })
});
