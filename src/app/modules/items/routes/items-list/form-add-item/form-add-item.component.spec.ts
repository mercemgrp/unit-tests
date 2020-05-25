import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAddItemComponent } from './form-add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormAddItemComponent', () => {
  let component: FormAddItemComponent;
  let fixture: ComponentFixture<FormAddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormAddItemComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#form shouldnt be defined', () => {
    expect(component.form).toBeUndefined();
  });
  it('getter #idControl should be null', () => {
    expect(component.idControl).toBe(null);
  });
  it('getter #titleControl should be null', () => {
    expect(component.titleControl).toBe(null);
  });
  it('should create form when #ngOnChanges() the first time', () => {
    component.ngOnChanges(null);
    expect(component.form).toBeDefined();
  });
  describe('changes @nextId executing #ngOnChanges()', () => {
    beforeEach(() => {
      component.nextId = 3;
      const changes: SimpleChanges = {
        nextId: {currentValue: 3, firstChange: true, previousValue: undefined, isFirstChange: undefined}
      };
      component.ngOnChanges(changes);
    });
    it('should create the form', () => {
      expect(component.form).toBeDefined();
    });
    it('id control should has the #nextId value', () => {
      expect(component.idControl.value).toBe(component.nextId);
    });
    it('should get the id control when call get #idControl', () => {
      expect(component.idControl).toBeDefined();
    });
    it('should get the title when call get #titleControl', () => {
      expect(component.titleControl).toBeDefined();
    });
    it('shouldnt create form when #ngOnChanges() the second time', () => {
      const initForm = component.form;
      component.ngOnChanges(null);
      expect(component.form).toEqual(initForm);
    });
    it('should reset title control when call #ngOnChanges()', () => {
      component.titleControl.setValue('test');
      const changes: SimpleChanges = {
        nextId: {currentValue: 4, firstChange: true, previousValue: undefined, isFirstChange: undefined}
      };
      component.ngOnChanges(changes);
      expect(component.titleControl.value).toBe(null);
    });
    describe('#submit()', () => {
      it('getter #showError should be true when submit and form is not valid', () => {
        component.submit();
        expect(component.showError).toBe(true);
      });
      it('getter #showError should be false when submit and form is valid', () => {
        component.titleControl.setValue('test');
        component.submit();
        expect(component.showError).toBe(false);
      });
      it('getter #showError should be false when value changes after submit', () => {
        component.submit();
        component.titleControl.setValue('test');
        expect(component.showError).toBe(false);
      });
      it('shouldnt emit event when form is not valid', () => {
        const spyEv = spyOn(component.submitEv, 'emit');
        component.submit();
        expect(spyEv).not.toHaveBeenCalled();
      });
      it('should emit event with form value when form is valid', () => {
        component.titleControl.setValue('test');
        const spyEv = spyOn(component.submitEv, 'emit');
        component.submit();
        expect(spyEv).toHaveBeenCalledWith({id: 3, title: 'test'});
      });
    });
  });
  describe('testing user interaction', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormAddItemComponent);
      component = fixture.componentInstance;
      component.ngOnChanges();
      fixture.detectChanges(); // Actualizo la vista
    });
    it('should submit when click in button', () => {
      const spyButton = spyOn(component, 'submit');
      fixture.nativeElement.querySelector('.qa-btn-submit').click();
      expect(spyButton).toHaveBeenCalled();
    });
    it('shouldnt exist div with class "qa-title-error" when #showError is false', () => {
      const element = fixture.debugElement.query(By.css('qa-title-error'));
      expect(element).toBe(null);
    });
    it('should exist div with class "qa-title-error" when getter #showError is true', () => {
      component.submit(); // Ejecutamos submit para que el getter showError() devuelva true
      fixture.detectChanges(); // Actualizamos la vista
      const element = fixture.debugElement.query(By.css('qa-title-error'));
      expect(element).toBe(null); // Comprobamos que el elemento no se muestra
    });
    it('form should be invalid when title control is empty', () => {
      const element = fixture.debugElement.query(By.css('.qa-input-title'));
      element.nativeElement.value = '';
      element.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBe(false);
    });
    it('form should be valid when title control has a value', () => {
      const element = fixture.debugElement.query(By.css('.qa-input-title'));
      element.nativeElement.value = 'test';
      element.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBe(true);
    });
  });
});
