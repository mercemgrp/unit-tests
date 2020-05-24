import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from '../../item';
import { map, first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-modify-item-container',
  templateUrl: './modify-item-container.component.html',
  styleUrls: ['./modify-item-container.component.scss']
})
export class ModifyItemContainerComponent implements OnInit {
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
  item: Item;

  private formSubmitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ItemsService) { }

  ngOnInit() {
    this.readParams();
  }

  submit(item: Item) {
    this.service.modifyItem(item).
    pipe(first()).subscribe(
      resp => {
        console.log('OK');
        this.router.navigate(['items']);
      },
      () => console.log('ERROR')
    );
  }

  navigateToItems() {
    this.router.navigate(['items']);
  }


  private readParams() {
    const id = +this.route.snapshot.params.id;
    this.service.getItem(id)
      .pipe(
        first(),
        map(resp => this.item = resp)
    ).subscribe();

  }

}
