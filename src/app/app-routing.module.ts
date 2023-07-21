import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { EditAccComponent } from './edit-acc/edit-acc.component';
import { DeleteAccComponent } from './delete-acc/delete-acc.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'management', component: ManagementComponent , canActivate:[AuthGuard]},
  { path: 'homePage', component: HomePageComponent},
  { path: 'createAcc', component: CreateAccComponent,canActivate:[AuthGuard]},
  { path: 'editAcc', component: EditAccComponent,canActivate:[AuthGuard]},
  { path: 'deleteAcc', component: DeleteAccComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
