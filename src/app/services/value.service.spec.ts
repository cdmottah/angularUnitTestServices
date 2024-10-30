

import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';
import { TestBed } from "@angular/core/testing";

describe('Test for ValueService', () => {
  let service: ValueService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ValueService]
    })
    service = TestBed.inject(ValueService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe("my value")
    })
  })

  describe('test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe("my value")
      service.setValue("change")
      expect(service.getValue()).toBe("change")
    })
  })
  describe('test for getPromiseValue', () => {
    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then(value => {
        expect(value).toBe("promise value");
        doneFn();
      })
    })

    it('should return "promise value" from promise using async', async () => {
      const response = await service.getPromiseValue();
      expect(response).toBe("promise value");

    })
  })

  describe('test for getObservableValue', () => {
    it('should return "observable value" from promise with then', (doneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe("observable value");
        doneFn();
      })
    })

    it('should return "observable value" from promise using async', async () => {
      const response = await firstValueFrom(service.getObservableValue());
      expect(response).toBe("observable value");

    })
  })


});
