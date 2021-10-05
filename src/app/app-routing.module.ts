import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserSearchComponent} from "./user-search/user-search.component";
import {UserEditComponent} from "./user-edit/user-edit.component";

const routes: Routes = [
  { path: "", component: UserSearchComponent },
  { path: "edit/:id", component: UserEditComponent },
  { path: "new/:id", component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
