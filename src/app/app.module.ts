import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

    TaskListComponent,
    TaskItemComponent,
    HomepageComponent,
    EntryComponent,

    TaskdialogComponent,
    TasklistdialogComponent,
    ConfirmdeldialogComponent,

    
    SortbypriorityPipe,

    TranslateModule.forRoot({
      loader : {
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
