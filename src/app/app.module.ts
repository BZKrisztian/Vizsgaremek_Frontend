import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EntryComponent } from './pages/entry/entry.component';
import { TaskdialogComponent } from './components/dialog-comps/taskdialog/taskdialog.component';
import { TasklistdialogComponent } from './components/dialog-comps/tasklistdialog/tasklistdialog.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmdeldialogComponent } from './components/dialog-comps/confirmdeldialog/confirmdeldialog.component';
import { SortbypriorityPipe } from './pipes/sortbypriority.pipe';
import { OverseerComponent } from './pages/overseer/overseer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RouterModule } from '@angular/router';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { UserlistComponent } from './components/userlist/userlist.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    TaskListComponent,
    TaskItemComponent,
    UserlistComponent,

    HomepageComponent,
    EntryComponent,
    OverseerComponent,
    RegisterComponent,
    LogInComponent,
    VerifyEmailComponent,

    TaskdialogComponent,
    TasklistdialogComponent,
    ConfirmdeldialogComponent,

    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,

    
    SortbypriorityPipe,

    TranslateModule.forRoot({
      loader : {
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
