import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsListContainerComponent } from './items-list-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemsService } from '../../items.service';
import { of, throwError } from 'rxjs';
import { Item } from '../../item';

describe('ItemsListContainerComponent', () => {
  const data = [{id: 1, title: 'test', description: '1 - test'}];
  const pushData = [
    {id: 1, title: 'test', description: '1 - test'},
    {id: 2, title: 'test', description: '2 - test'}
  ];
  const nextId = 2;
  class ItemsServiceMock {
    getData() {
      return of(data);
    }
    pushData() {
      return of(pushData);
    }
    getNextId() {
      return nextId;
    }
  }
  let component: ItemsListContainerComponent;
  let fixture: ComponentFixture<ItemsListContainerComponent>;
  let service: ItemsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        ItemsListContainerComponent
      ],
      providers: [
        {provide: ItemsService, useClass: ItemsServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ItemsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('#ngOnInit', () => { // Usamos tal cuál los valores retornados por ItemsServiceMock
    let spyGetData;
    beforeEach(() => {
      spyGetData = spyOn(service, 'getData').and.callThrough();
        // Espiamos "getData" y cuando llegue a eas función, se ejecuta ("callThrough")
    });
    it('should call get data service', fakeAsync(() => {
      fixture.detectChanges(); // detecta los cambios y actualiza la vista. Ejecutamos ngOnInit
      tick(); // Resuelve elementos asíncronos (observables)
      expect(spyGetData).toHaveBeenCalled(); // Comprobamos que ha llamado a esta función
    }));
    it('should fill data with the response', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.data).toEqual(data);
      // Comprobamos que "data" se ha rellenado con lo que ha devuelto el servicio
    }));
    it('should call #getNextId', fakeAsync(() => {
      const spy = spyOn(service, 'getNextId').and.callThrough();
      fixture.detectChanges();
      tick();
      expect(spy).toHaveBeenCalled();
    }));
    it('should fill #nextId param', fakeAsync(() => {
      spyOn(service, 'getNextId').and.callThrough();
      fixture.detectChanges(); // detecta los cambios y actualiza la vista
      tick();
      expect(component.nextId).toEqual(nextId);
    }));
  });
  describe('#ngOnInit when service returns an error', () => {
    beforeEach(() => {
      spyOn(service, 'getData').and.returnValue(throwError('err'));
      // En este caso modificamos lo que devuelve "getData", devolviendo un error.
      // Por lo que el observable pasa por "error"
    });
    it('should #data be null', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.data).toBe(null);
    }));
    it('should #nextId be 0', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.nextId).toBe(0);
    }));
  });
  describe('#after ngOnInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
      // detecta los cambios y actualiza la vista. Ejecutamos ngOnInit antes de cada test
    });
    it('should toggle #showForm', (() => {
      component.showForm = true;
      component.toggleAddItem();
      expect(component.showForm).toBe(false);
    }));
    it('#data should be filled with the service response', fakeAsync(() => {
      spyOn(service, 'pushData').and.returnValue(of([]));
      component.submit({} as Item);
      tick();
      expect(component.data).toEqual([]);
    }));
    describe('#submit', () => {
      let spyPushData;
      let spyNextId;
      beforeEach(() => {
        spyPushData = spyOn(service, 'pushData').and.callThrough();
        spyNextId = spyOn(service, 'getNextId').and.callThrough();
      });
      it('should call service to push data', fakeAsync(() => {
        component.submit({id: 2, title: 'test'} as Item);
        tick();
        expect(spyPushData).toHaveBeenCalledWith({id: 2, title: 'test'});
      }));
      it('should fill #data with the service response', fakeAsync(() => {
        component.submit({id: 2, title: 'test'} as Item);
        tick();
        expect(component.data).toEqual(pushData);
      }));
      it('should call service to get next id', fakeAsync(() => {
        component.submit({id: 2, title: 'test'} as Item);
        tick();
        expect(spyNextId).toHaveBeenCalled();
      }));
      it('should fill #nextId with the service response', fakeAsync(() => {
        component.submit({id: 2, title: 'test'} as Item);
        tick();
        expect(component.nextId).toEqual(nextId);
      }));
    });
  });

});
