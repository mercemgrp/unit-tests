import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  modifyItem(item: Item) {
    this.router.navigate(['items/modify', item.id]);
  }

}
