import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemsService } from './items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, throwError } from 'rxjs';

describe('ItemsService', () => {
  let data;
  let dataTransformed;
  let service: ItemsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [ItemsService]
      }
    );
    service = TestBed.get(ItemsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getItems', () => {
    let endpoint;
    describe('#no data stored in service', () => {
      beforeEach(() => {
        data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
        dataTransformed = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
        endpoint = './assets/data/example.json';
      });
      it('should be an observable', () => {
        const observable = service.getItems();
        expect(observable instanceof Observable).toEqual(true);
      });
      it('should get data from service', () => {
        const observable = service.getItems();
        observable.subscribe(res => {
          expect(res).toBeDefined();
        });
        httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpoint))
          .flush(data);
        httpMock.verify();
      });
      it('should transform data', () => {
        const observable = service.getItems();
        observable.subscribe(res => {
          expect(res).toEqual(dataTransformed);
        });
        httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpoint)).flush(data);
        httpMock.verify();
      });
      it('should fill #data variable with the response transformed', () => {
        const observable = service.getItems();
        observable.subscribe(() => {
          expect(service.items).toEqual(dataTransformed);
        });
        httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpoint)).flush(data);
        httpMock.verify();
      });
    });
    describe('#service thrown an error', (() => {
      xit('should get error', () => {
        const observable = service.getItems();
        observable.subscribe(
          () => fail('should have failed'),
          err => {
            expect(err.status).toEqual(404);
            expect(err.statusText).toEqual('Not Found');
          }
        );
        httpMock.expectOne(
          request => request.method === 'GET' && request.url.includes(endpoint)
          ).flush('Error', { status: 404, statusText: 'Not Found' });
        httpMock.verify();
      });
    }));
    describe('#data stored in service', () => {
      beforeEach(() => {
        data = [{id: 1, title: 'test', description: '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
        service.items = data;
      });
      it('should get data from variable', fakeAsync(() => {
        data = [{id: 1, title: 'test', description: '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
        service.items = data;
        const observable = service.getItems();
        observable.subscribe(res => {
          expect(res).toEqual(data);
        });
        httpMock.expectNone(request => request.method === 'GET' && request.url.includes(endpoint));
        httpMock.verify();
        tick();
      }));
    });
  });
  describe('#pushData', () => {
    beforeEach(() => {
      data = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      service.items = data;
    });
    it('should return data in variable when param is null', fakeAsync(() => {
      service.pushItem(null)
        .subscribe(
          resp => {
            expect(resp).toEqual(service.items);
          }
        );
      tick();
    }));
    it('should push data and transform', fakeAsync(() => {
      const result = [
        {id: 1, title: 'test', description : '1 - test'},
        {id: 2, title: 'test', description: '2 - test'},
        {id: 3, title: 'test', description: '3 - test'}
      ];
      service.pushItem({id: 3, title: 'test'})
        .subscribe(
          resp => {
            expect(resp).toEqual(result);
          }
        );
      tick();
    }));
  });
  describe('#getNextId', () => {
    it('should get next id', () => {
      service.items = data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
      expect(service.getNextId()).toBe(3);
    });
    it('should get 1 when data is null', () => {
      service.items = null;
      expect(service.getNextId()).toBe(1);
    });
    it('should get 1 when no data', () => {
      service.items = [];
      expect(service.getNextId()).toBe(1);
    });
  });
});
