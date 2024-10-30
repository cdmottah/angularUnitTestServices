import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('test for get current position', () => {
    it('should save center', () => {

      const mockGeolocation = {
        coords: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 123,
          longitude: 321,
          speed: 0
        },
        timestamp: 0
      }
      //Arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        successFn(mockGeolocation as any)
      })
      //Act
      mapService.getCurrentPosition();
      //Assert
      expect(mapService.center.latitude).toEqual(123)
      expect(mapService.center.longitude).toEqual(321)

    })
  })
});
