import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModifyItemContainerComponent } from './modify-item-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemsService } from '../../items.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ModifyItemContainerComponent', () => {
  const data = [{id: 1, title: 'test', description: '1 - test'}];
  const modifyItemData = [
    {id: 1, title: 'test', description: '1 - test'},
    {id: 2, title: 'test', description: '2 - test'}
  ];
  class ItemsServiceMock {
    getItems() {
      return of(data);
    }
    getItem() {
      return of(data[0]);
    }
    modifyItem() {
      return of(modifyItemData);
    }
  }
  let component: ModifyItemContainerComponent;
  let fixture: ComponentFixture<ModifyItemContainerComponent>;
  let service: ItemsService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModifyItemContainerComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: ItemsService, useClass: ItemsServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ModifyItemContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ItemsService);
    router = TestBed.get(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get item from service at init', fakeAsync(() => {
    const spy = spyOn(service, 'getItem').and.callThrough();
    fixture.detectChanges();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
  /**
   * En este test modificamos el valor que retorna la función "getItem"
   * mediante "returnValue"
   */
  it('should fill #item from service response at init', fakeAsync(() => {
    const response = {id: 1, title: 'test', description: '1 - test'};
    spyOn(service, 'getItem').and.returnValue(of(response));
    fixture.detectChanges();
    tick();
    expect(component.item).toEqual(response);
  }));
  describe('#componet initialized', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
    }));
  });
  it('should navigate when #navigateToItems()', () => {
    const spy = spyOn(router, 'navigate');
    component.navigateToItems();
    expect(spy).toHaveBeenCalled();
  });
  /**
   * En este test espiamos el router cuando navega
   */
  it('should call service to modify item when #submit()', fakeAsync(() => {
    spyOn(router, 'navigate');
    const spy = spyOn(service, 'modifyItem').and.callThrough();
    component.submit({id: 1, title: 'test'});
    tick();
    expect(spy).toHaveBeenCalled();
  }));
  it('should navigate when #submit()', fakeAsync(() => {
    const spy = spyOn(router, 'navigate');
    component.submit({id: 1, title: 'test'});
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
