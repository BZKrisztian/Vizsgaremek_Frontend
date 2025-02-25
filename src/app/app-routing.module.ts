import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EntryComponent } from './pages/entry/entry.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '' , redirectTo: '/entry', pathMatch: 'full'},
  {path: 'entry', component: EntryComponent},
  {path: 'homepage', component: HomepageComponent ,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
