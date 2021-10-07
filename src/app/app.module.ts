import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserEditComponent } from './user-edit/user-edit.component';
import {UsersFacade} from "./store/users.facade";
import {UsersRepository} from "./store/users.repository";
import { StoreModule } from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersEffects} from "./store/users.effects";
import {usersFeatureName, usersReducer} from "./store/users.reducers";
import {RadioButtonModule} from "primeng/radiobutton";
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { ClonePipe } from './clone.pipe';
import {AutoCompleteModule} from "primeng/autocomplete";
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserSearchComponent,
    UserEditComponent,
    ClonePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    TableModule,
    CheckboxModule,
    FormsModule,
    NgbModule,
    StoreModule.forRoot({applicationState: usersReducer}),
    EffectsModule.forRoot([UsersEffects]),
    StoreModule.forFeature(usersFeatureName, usersReducer),
    ReactiveFormsModule,
    SelectButtonModule,
    RadioButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    ConfirmationPopoverModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    TriStateCheckboxModule,
    ToastModule
  ],
  providers: [
    UsersFacade,
    UsersRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
