import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserData } from '../model/user-data';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;
  let requestData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DataService]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Service should be created
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  // Should return expected data
  it('GetData should return expected data', (done) => {
    const expectedData: UserData[] = [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et susc"
      }
    ];

    service.getPosts().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    requestData = httpTestingController.expectOne(service.apiUrl);
    requestData.flush(expectedData);
  });

    // Should use GET method
    it('Should use GET method to retrieve the data', () => {
      service.getPosts().subscribe();
      requestData = httpTestingController.expectOne(service.apiUrl);
      expect(requestData.request.method).toEqual('GET');
    });
});
