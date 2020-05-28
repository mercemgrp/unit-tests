import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsListContainerComponent } from './items-list-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemsService } from '../../items.service';
import { of, throwError } from 'rxjs';
import { Item } from '../../item';

/**
 * Crearemos pilas de tests por funcionalidades
 * Pila 1: Testeamos el componente cuando inicializamos la app ngOnInit() y el servicio retorna un valor
 * Pila 2: Testeamos el componente cuando inicializamos la app ngOnInit() y el servicio retorna un error
 * Pila 3: Testeamos el componente cuando ya se ha inicializado
 */
describe('ItemsListContainerComponent', () => {
  const data = [{id: 1, title: 'test', description: '1 - test'}];
  const pushData = [
    {id: 1, title: 'test', description: '1 - test'},
    {id: 2, title: 'test', description: '2 - test'}
  ];
  const nextId = 2;
  class ItemsServiceMock {
    getItems() {
      return of(data);
    }
    pushItem() {
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
  /**
   * Al inicializar la app llamamos a un servicio, por lo que los tests aquí descritos deben ser asíncronos
   */
  describe('#ngOnInit()', () => {
    let spyGetItems;
    beforeEach(() => {
      /**
       * Espiamos "getItems" y cuando llegue a esa función, se ejecuta (porque hemos añadido "callThrough")
       * En este caso como hemos mockeado el servicio, cuando se resuelve devolverá
       * lo indicado en ItemsServiceMock
       */
      spyGetItems = spyOn(service, 'getItems').and.callThrough();
    });
    it('should call get data service', fakeAsync(() => { // "fakeAsync" indica que es un test asíncrono
      fixture.detectChanges(); // detecta los cambios y actualiza la vista. Ejecutamos ngOnInit
      tick(); // Resuelve elementos asíncronos (observables/promesas...)
      expect(spyGetItems).toHaveBeenCalled(); // Comprobamos que ha llamado a "getItems"
    }));
    it('should fill data with the response', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      expect(component.data).toEqual(data);
    }));
    it('should call #getNextId', fakeAsync(() => {
      const spy = spyOn(service, 'getNextId').and.callThrough();
      fixture.detectChanges();
      tick();
      expect(spy).toHaveBeenCalled();
    }));
    it('should fill #nextId param', fakeAsync(() => {
      spyOn(service, 'getNextId').and.callThrough();
      fixture.detectChanges();
      tick();
      expect(component.nextId).toEqual(nextId);
    }));
  });
  describe('# testing component initialization when #getItems service returns an error', () => {
    beforeEach(() => {
      /**
       * En este caso modificamos lo que devuelve "getItems", retornando un error.
       * Por lo que estamos probando la inicialización del componente cuando
       * el servicio "getItems" retorna un error
       */
      spyOn(service, 'getItems').and.returnValue(throwError('err'));
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
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
    }));
    it('should toggle #showForm when #toggleAddItem()', (() => {
      component.showForm = true;
      component.toggleAddItem();
      expect(component.showForm).toBe(false);
    }));
    describe('#submit()', () => {
      let spyPushData;
      let spyNextId;
      beforeEach(() => {
        spyPushData = spyOn(service, 'pushItem').and.callThrough();
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
