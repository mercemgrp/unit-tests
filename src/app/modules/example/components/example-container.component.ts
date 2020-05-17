import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss']
})
export class ExampleContainerComponent implements OnInit {
  data = [
    {
      id: 1,
      title: 'uno'
    },
    {
      id: 2,
      title: 'dos'
    },
    {
      id: 3,
      title: 'tres'
    },
    {
      id: 4,
      title: 'cuatro'
    },
    {
      id: 5,
      title: 'cinco'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
