import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { map, first, } from 'rxjs/operators';
import { Item } from '../item';
@Component({
  selector: 'app-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {
  data;
  showForm = false;
  nextId: number;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getData()
    .pipe(
      first()
    ).subscribe(
      resp => {
        this.data = resp;
        this.nextId = this.itemsService.getNextId();
      },
      () => {
        this.data = null;
        this.nextId = 0;
      }
    );
  }

  toggleAddItem() {
    this.showForm = !this.showForm;
  }

  submit(item: Item) {
    this.itemsService.pushData(item).pipe(
      first(),
      map(resp => {
        this.data = resp;
        this.nextId = this.itemsService.getNextId();
      })
    ).subscribe();
  }

}
