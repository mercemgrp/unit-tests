import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemsService } from './items.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ItemsListContainerComponent,
  ItemsComponent,
  FormAddItemComponent
} from './routes/items-list';

const routes: Routes = [
  {
    path: '',
    component: ItemsListContainerComponent
  }
];

@NgModule({
  declarations: [
    ItemsListContainerComponent,
    ItemsComponent,
    FormAddItemComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [
    RouterModule
  ],
  providers: [
    ItemsService
  ]
})

export class ItemsModule { }
