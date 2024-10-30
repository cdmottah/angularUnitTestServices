
import { MasterService } from './master.service';
// import { ValueFakeService } from './value.fake.service';
import { ValueService } from './value.service';
import { TestBed } from "@angular/core/testing";

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  describe('Test for getValue', () => {

    /* Enviando el servicio directamente lo que no se recomienda por multiples razones
    * 1. por separación de responsabilidades, estas pruebas se encargan solo de master service, no de valueService
    * 2. Imagina que consumes un apikey, mas costos o inclusive pueden detectarlo como un ataque dns
    */
    // it('should return "my value" from value service', () => {
    //   let valueService = new ValueService();
    //   let masterService = new MasterService(valueService);
    //   expect(masterService.getValue()).toBe("my value");
    // });

    /* otra forma es creando un servicio fake, pero tampoco se recomienda por que es muy dificil de mantener */
    // it('should return "fake value" from the fake service', () => {
    //   let valueService = new ValueFakeService() as ValueService;
    //   let masterService = new MasterService(valueService);
    //   expect(masterService.getValue()).toBe("fake value");
    // });

    /** esta ultima es mejor, asilando la propiedad del objeto, pero aún así no aguanta, es mejor usar spy que veremos en el proximo commit */
    // it('should return "fake from object" from the fake object', () => {
    //   let valueService = { getValue: () => 'fake from object' } as ValueService;
    //   let masterService = new MasterService(valueService);
    //   expect(masterService.getValue()).toBe("fake from object");
    // });



    beforeEach(() => {
      const _valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
      TestBed.configureTestingModule({
        providers: [
          MasterService,
          { provide: ValueService, useValue: _valueServiceSpy }
        ]
      })
      masterService = TestBed.inject(MasterService);
      valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    })

    it('should be created', () => {
      expect(masterService).toBeTruthy();
    })

    it('should call to getValue from ValueService', () => {
      // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
      // valueServiceSpy.getValue.and.returnValue('fake value');
      // expect(masterService.getValue()).toBe('fake value');
      // const masterService = new MasterService(valueServiceSpy);
      masterService.getValue();
      expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1)
    })
  })

});
