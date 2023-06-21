import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management/management.component';
import { ManagementService } from './management.service';
import { LogInService } from './log-in.service';
import { EditAccComponent } from './edit-acc/edit-acc.component';
import { CreateAccComponent } from './create-acc/create-acc.component';
import { DeleteAccComponent } from './delete-acc/delete-acc.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ManagementComponent,
    EditAccComponent,
    CreateAccComponent,
    DeleteAccComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ManagementService,LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
