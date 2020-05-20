import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './app.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/items/items.module').then(m => m.ItemsModule),
    canActivate: [AppGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
