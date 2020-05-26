import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemsService } from './items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('ItemsService', () => {
  let endpointGetItems;
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
    endpointGetItems = './assets/data/items.json';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('#items is null', () => {
    beforeEach(() => {
      service.items = null;
    });
    it('#getItems() should be an observable', () => {
      const observable = service.getItems();
      expect(observable instanceof Observable).toEqual(true);
    });
    it('#getItems() should get data from service and transform', () => {
      const data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
      const dataTransformed = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      const observable = service.getItems();
      observable.subscribe(res => {
        expect(res).toEqual(dataTransformed);
      });
      httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpointGetItems))
        .flush(data);
      httpMock.verify();
    });
    it('#getItems() should fill #items variable with the response transformed', () => {
      const data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
      const dataTransformed = [{id: 1, title: 'test', description : '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
      const observable = service.getItems();
      observable.subscribe(() => {
        expect(service.items).toEqual(dataTransformed);
      });
      httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpointGetItems)).flush(data);
      httpMock.verify();
    });
    it('#getItem() should call service and get item from variable', fakeAsync(() => {
      const data = [{id: 1, title: 'test'}, {id: 2, title: 'test'}];
      const response = {id: 1, title: 'test', description : '1 - test'};
      const observable = service.getItem(1);
      observable.subscribe(res => {
        expect(res).toEqual(response);
      });
      httpMock.expectOne(request => request.method === 'GET' && request.url.includes(endpointGetItems))
        .flush(data);
      httpMock.verify();
    }));
    it('#getNextId() should returns 1', () => {
      expect(service.getNextId()).toBe(1);
    });
  });
  describe('#items is an array with values', () => {
    beforeEach(() => {
      service.items = [{id: 1, title: 'test', description: '1 - test'}, {id: 2, title: 'test', description: '2 - test'}];
    });
    it('#getItems() should get data from variable', fakeAsync(() => {
      const observable = service.getItems();
      observable.subscribe(res => {
        expect(res).toEqual(service.items);
      });
      httpMock.expectNone(request => request.method === 'GET');
      httpMock.verify();
      tick();
    }));
    it('#pushItem() should thrown an error when param is null', fakeAsync(() => {
      service.pushItem(null)
        .subscribe(
          resp => {},
          err => expect(err).toBeDefined()
        );
      tick();
    }));
    it('#pushItem() should push data and transform when param is not null', fakeAsync(() => {
      const result = [
        {id: 1, title: 'test', description: '1 - test'},
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
    it('#modifyItem() should thrown an error when param is null', fakeAsync(() => {
      service.modifyItem(null)
        .subscribe(
          resp => {},
          err => expect(err).toBeDefined()
        );
      tick();
    }));
    it('#modifyItem() should modify data and transform when param is not null', fakeAsync(() => {
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
    it('#getItem() should get item from variable', fakeAsync(() => {
      service.getItem(1)
        .subscribe(
          resp => {expect(resp).toEqual({id: 1, title: 'test', description : '1 - test'}); }
        );
      tick();
    }));
    it('#getNextId() should get next id', () => {
      expect(service.getNextId()).toBe(3);
    });
  });
  it('#getNextId() should get 1 when #items is an empty array', () => {
    service.items = [];
    expect(service.getNextId()).toBe(1);
  });
});
