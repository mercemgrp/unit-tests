import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyItemContainerComponent } from './modify-item-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemsService } from '../../items.service';
import { of } from 'rxjs';

describe('ModifyItemContainerComponent', () => {
  const data = [{id: 1, title: 'test', description: '1 - test'}];
  const modifyData = [
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
      return of(modifyData);
    }
  }
  let component: ModifyItemContainerComponent;
  let fixture: ComponentFixture<ModifyItemContainerComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#form shouldnt be defined', () => {
    expect(component.form).toBeUndefined();
  });
  it('get #idControl should be null', () => {
    expect(component.idControl).toBe(null);
  });
  it('get #titleControl should be null', () => {
    expect(component.titleControl).toBe(null);
  });
});
