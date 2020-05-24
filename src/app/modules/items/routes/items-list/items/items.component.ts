import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  constructor() { }

  ngOnInit() {
  }

}
