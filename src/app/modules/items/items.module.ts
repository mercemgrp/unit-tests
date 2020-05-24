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
import {
  ModifyItemContainerComponent,
  FormModifyItemComponent
} from './routes/modify-item';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'items'
  },
  {
    path: 'items',
    component: ItemsListContainerComponent
  },
  {
    path: 'items/modify/:id',
    component: ModifyItemContainerComponent
  }
];

@NgModule({
  declarations: [
    ItemsListContainerComponent,
    ItemsComponent,
    FormAddItemComponent,
    ModifyItemContainerComponent,
    FormModifyItemComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ItemsService
  ]
})

export class ItemsModule { }
