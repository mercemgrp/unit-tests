import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModifyItemComponent } from './form-modify-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormModifyItemComponent', () => {
  let component: FormModifyItemComponent;
  let fixture: ComponentFixture<FormModifyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormModifyItemComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModifyItemComponent);
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
  describe('changes #nextId property', () => {
    beforeEach(() => {
      component.item = {id: 1, title: 'title', description: '1 - title'};
      const changes: SimpleChanges = {
        item: {currentValue: 3, firstChange: true, previousValue: undefined, isFirstChange: undefined}
      };
      component.ngOnChanges(changes);
    });
    it('should create the form', () => {
      expect(component.form).toBeDefined();
    });
    it('id control should has the #item.id value', () => {
      expect(component.idControl.value).toBe(component.item.id);
    });
    it('title control should has the #item.title value', () => {
      expect(component.titleControl.value).toBe(component.item.title);
    });
    it('should get the id control when call get #idControl', () => {
      expect(component.idControl).toBeDefined();
    });
    it('should get the title when call get #titleControl', () => {
      expect(component.titleControl).toBeDefined();
    });
  });
});
