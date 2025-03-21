import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { EntryComponent } from './pages/entry/entry.component';
import { OverseerComponent } from './pages/overseer/overseer.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SortbypriorityPipe } from './pipes/sortbypriority.pipe';
import { RegisterComponent } from './pages/register/register.component';
import { LogInComponent } from './pages/log-in/log-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/entry', pathMatch: 'full' },
  { path: 'entry', component: EntryComponent },
  { path: 'registration', component: RegisterComponent},
  { path: 'log-in', component: LogInComponent},
  {
    path: 'homepage',
    component: HomepageComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'overseer',
    component: OverseerComponent,
    // canActivate: [AuthGuard, AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
