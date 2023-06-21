import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { EditAccComponent } from './edit-acc/edit-acc.component';
import { DeleteAccComponent } from './delete-acc/delete-acc.component';

const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'management', component: ManagementComponent },
  { path: 'homePage', component: HomePageComponent},
  { path: 'createAcc', component: CreateAccComponent},
  { path: 'editAcc', component: EditAccComponent},
  { path: 'deleteAcc', component: DeleteAccComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
