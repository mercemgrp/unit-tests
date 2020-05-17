import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss']
})
export class ExampleContainerComponent implements OnInit {
  data;
  form: FormGroup;
  showForm = false;
  formHasError = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private exampleService: ExampleService
  ) { }

  ngOnInit() {
    this.exampleService.getData().pipe(
      first(),
      map(resp => {
        this.data = resp;
        this.createForm();
      })
    ).subscribe();
  }

  toggleAddItem() {
    this.showForm = !this.showForm;
  }

  submit() {
    if (!this.form.valid) {
      this.formHasError = true;
      return;
    }
    this.exampleService.pushData(this.form.getRawValue()).pipe(
      first(),
      map(resp => {
        this.data = resp;
        this.clearAndUpdateForm();
      })
    ).subscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: this.exampleService.getNextId(), disabled: true },
      title: ['', Validators.required]
    });
    this.form.get('title').valueChanges
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.formHasError = false;
    });
  }

  private clearAndUpdateForm() {
    this.form.get('id').setValue(this.exampleService.getNextId());
    this.form.get('title').markAsUntouched();
    this.form.get('title').reset();
  }

}
