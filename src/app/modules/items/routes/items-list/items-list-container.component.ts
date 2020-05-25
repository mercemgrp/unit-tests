import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../items.service';
import { map, first, } from 'rxjs/operators';
import { Item } from '../../item';
@Component({
  selector: 'app-items-list-container',
  templateUrl: './items-list-container.component.html',
  styleUrls: ['./items-list-container.component.scss']
})
export class ItemsListContainerComponent implements OnInit {
  data;
  showForm = false;
  nextId: number;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.itemsService.getItems()
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
    this.itemsService.pushItem(item).pipe(
      first()
    ).subscribe(
      resp => {
        this.data = resp;
        this.nextId = this.itemsService.getNextId();
      },
      () => console.log('error')
    );
  }

}
