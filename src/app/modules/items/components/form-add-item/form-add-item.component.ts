import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Item } from '../../item';

@Component({
  selector: 'app-form-add-item',
  templateUrl: './form-add-item.component.html',
  styleUrls: ['./form-add-item.component.scss']
})
export class FormAddItemComponent implements OnInit, OnChanges {
  @Input() nextId: number;
  @Output() submitEv = new EventEmitter<Item>();
  form: FormGroup;
  formHasError = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.createForm();
    }
    if (changes.nextId && changes.nextId.currentValue !== undefined) {
      this.clearAndUpdateForm();
    }
  }

  submit() {
    if (!this.form.valid) {
      this.formHasError = true;
      return;
    }
    this.submitEv.emit(this.form.getRawValue());
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: this.nextId, disabled: true },
      title: ['', Validators.required]
    });
    this.form.get('title').valueChanges
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.formHasError = false;
    });
  }

  private clearAndUpdateForm() {
    this.form.get('id').setValue(this.nextId);
    this.form.get('title').markAsUntouched();
    this.form.get('title').reset();
  }

}
