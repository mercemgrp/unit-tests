import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemsService } from './items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('ItemsService', () => {
  let data;
  let endpoint;
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
    endpoint = './assets/data/items.json';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#getItems', () => {
    describe('#no data stored in service', () => {
      beforeEach(() => {
        data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
        dataTransformed = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      });
      it('should be an observable', () => {
        const observable = service.getItems();
        expect(observable instanceof Observable).toEqual(true);
      });
      it('should data from service and transform', () => {
        const observable = service.getItems();
        observable.subscribe(res => {
          expect(res).toEqual(dataTransformed);
        });
        httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpoint))
          .flush(data);
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
    describe('#data stored in service', () => {
      it('should get data from variable', fakeAsync(() => {
        data = [{id: 1, title: 'test', description: '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
        service.items = data;
        const observable = service.getItems();
        observable.subscribe(res => {
          expect(res).toEqual(data);
        });
        httpMock.expectNone(request => request.method === 'GET');
        httpMock.verify();
        tick();
      }));
    });
  });
  describe('#pushItem', () => {
    beforeEach(() => {
      data = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      service.items = data;
    });
    it('should thrown an error when param is null', fakeAsync(() => {
      service.pushItem(null)
        .subscribe(
          resp => {},
          err => expect(err).toBeDefined()
        );
      tick();
    }));
    it('should push data and transform when param is not null', fakeAsync(() => {
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
  describe('#modifyItem', () => {
    beforeEach(() => {
      data = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      service.items = data;
    });
    it('should thrown an error when param is null', fakeAsync(() => {
      service.modifyItem(null)
        .subscribe(
          resp => {},
          err => expect(err).toBeDefined()
        );
      tick();
    }));
    it('should modify data and transform when param is not null', fakeAsync(() => {
      const result = [
        {id: 1, title: 'test', description : '1 - test'},
        {id: 2, title: 'test-modified', description: '2 - test-modified'}
      ];
      service.modifyItem({id: 2, title: 'test-modified'})
        .subscribe(
          resp => {
            expect(resp).toEqual(result);
          }
        );
      tick();
    }));
  });
  describe('#getItem', () => {
    it('should get item from variable when #items is filled', fakeAsync(() => {
      data = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      service.items = data;
      service.getItem(1)
        .subscribe(
          resp => {expect(resp).toEqual({id: 1, title: 'test', description : '1 - test'}); }
        );
      tick();
    }));
    it('should call service and get item from variable when #items isnt filled', fakeAsync(() => {
      data = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      const response = {id: 1, title: 'test', description : '1 - test'};
      const observable = service.getItem(1);
      observable.subscribe(res => {
        expect(res).toEqual(response);
      });
      httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpoint))
        .flush(data);
      httpMock.verify();
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
