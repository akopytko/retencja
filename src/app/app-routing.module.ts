import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { HomeComponent } from './home/home.component';
import { UserBrowserComponent } from './user-browser/user-browser.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserBrowserComponent },
  { path: 'user/:id', component: UserDetailsComponent, 
      canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'users', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
