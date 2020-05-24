import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../../../item';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-add-item',
  templateUrl: './form-add-item.component.html',
  styleUrls: ['./form-add-item.component.scss']
})
export class FormAddItemComponent implements OnChanges {
  @Input() nextId: number;
  @Output() submitEv = new EventEmitter<Item>();
  get idControl() {
    return this.form ? this.form.get('id') : null;
  }
  get titleControl() {
    return this.form ? this.form.get('title') : null;
  }
  get showError() {
    return this.formSubmitted && !this.form.valid;
  }
  form: FormGroup;
  formInvalid = false;
  private formSubmitted = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes?: SimpleChanges) {
    if (!this.form) {
      this.createForm();
    }
    if (changes && changes.nextId && changes.nextId.currentValue !== undefined) {
      this.clearAndUpdateForm();
    }
  }

  submit() {
    this.formSubmitted = true;
    this.formInvalid = !this.form.valid;
    if (this.form.valid) {
      this.submitEv.emit(this.form.getRawValue());
    }
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: this.nextId, disabled: true },
      title: ['', Validators.required]
    });
    this.titleControl.valueChanges
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.formSubmitted = false;
    });
  }

  private clearAndUpdateForm() {
    this.form.get('id').setValue(this.nextId);
    this.form.get('title').reset();
  }

}
