import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HttpComponent } from './http/http.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path: 'create', component:CreateComponent},
  {path: 'read', component:ReadComponent},
  {path: 'http', component:HttpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
