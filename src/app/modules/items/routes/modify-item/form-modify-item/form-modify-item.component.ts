import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../../../item';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-modify-item',
  templateUrl: './form-modify-item.component.html',
  styleUrls: ['./form-modify-item.component.scss']
})
export class FormModifyItemComponent implements OnChanges {
  @Input() item: Item;
  @Output() submitEv = new EventEmitter<Item>();
  get idControl() {
    return this.form ? this.form.get('id') : null;
  }
  get titleControl() {
    return this.form ? this.form.get('title') : null;
  }
  get showError() {
    return this.formSubmitted && this.form && !this.form.valid;
  }
  form: FormGroup;
  formInvalid = false;
  private formSubmitted = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes?: SimpleChanges) {
    if (changes && changes.item && changes.item.currentValue !== undefined) {
      this.createForm();
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
      id: {value: this.item.id, disabled: true },
      title: [this.item.title, Validators.required]
    });
    this.titleControl.valueChanges
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.formSubmitted = false;
    });
  }
}
