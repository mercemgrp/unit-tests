import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddItemComponent } from './form-add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
});
