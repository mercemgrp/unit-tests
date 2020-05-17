import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleContainerComponent } from './components/example-container.component';
import { RouterModule, Routes } from '@angular/router';
import { ExampleChildComponent } from './components/example-child/example-child.component';
import { ExampleService } from './example.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ExampleContainerComponent
  },
];

@NgModule({
  declarations: [ExampleContainerComponent, ExampleChildComponent],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule],
  providers: [ExampleService]
})

export class ExampleModule { }
