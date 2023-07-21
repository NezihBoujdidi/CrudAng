import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsListService } from '../accounts-list.service';
import { ManagementService } from '../management.service';
import { CredentialslistService } from '../Credentials.service';
import { HttpClient } from '@angular/common/http';


interface Account {
  id: number | null;
  firstName: string;
  lastName: string;
  email: any;
  password: string;
  dob: string;
}

interface AccountWithImage extends Account {
  imageId: number;
}


@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css'],
  providers: [AccountsListService, ManagementService]
})
export class CreateAccComponent {
  OnEditAcc: AccountWithImage = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    imageId : -1
  };

  DataFilled: AccountWithImage = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    imageId : -1
  };

  confirmPassword: string = '';
  result: boolean = false;
  emailExistsPop: boolean = false;
  logoutPopUp: boolean = false;
  fileName: string = '';
  image_Id: number=0;

  constructor(
    private router: Router,
    private AccountsList: AccountsListService,
    private ManagSvc: ManagementService,
    private credentialsService: CredentialslistService,
    private http: HttpClient
  ) { }


  validate() {
    const expression: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
    this.result = expression.test(this.DataFilled.email);
    if (this.result && this.DataFilled.password == this.confirmPassword && this.DataFilled.password != '') {
      if (!this.emailExistsPop) {
        this.AccountsList.CreateAccount(
          this.DataFilled.id,
          this.DataFilled.firstName,
          this.DataFilled.lastName,
          this.DataFilled.email,
          this.DataFilled.password,
          this.DataFilled.dob,
          this.image_Id
        ).subscribe(
          {
            next: (response) => {
              console.log(response);
              this.router.navigate(['/management']);
            },
            error: (error) => {
              console.error(error);
              this.emailExistsPop = true;
            }
          }
        );
      }
    }
  }

  onFirstNameChange(newFN: string) {
    this.DataFilled.firstName = newFN;
  }

  onLastNameChange(newLN: string) {
    this.DataFilled.lastName = newLN;
  }

  onEmailChange(newEmail: string) {
    this.emailExistsPop = false;
    this.DataFilled.email = newEmail;
    const expression: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
    this.result = expression.test(this.DataFilled.email);
  }
  onPasswordChange(newPass: string) {
    this.DataFilled.password = newPass;
  }

  onBirthdayChange(newDate: string) {
    this.DataFilled.dob = newDate;
  }

  validateEdit() {
    if (this.DataFilled.email == '') {
      this.DataFilled.email = this.OnEditAcc.email;
      const expression: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
      this.result = expression.test(this.DataFilled.email);
    }
    if (this.result && this.DataFilled.password == this.confirmPassword && this.DataFilled.password != '') {
      if (this.DataFilled.firstName == '') {
        this.DataFilled.firstName = this.OnEditAcc.firstName;
      }
      if (this.DataFilled.lastName == '') {
        this.DataFilled.lastName = this.OnEditAcc.lastName;
      }
      if (this.DataFilled.dob == '') {
        this.DataFilled.dob = this.OnEditAcc.dob;
      }
      if (this.DataFilled.imageId == -1) {
        this.DataFilled.imageId = this.OnEditAcc.imageId;
      }
      this.DataFilled.id = this.OnEditAcc.id;
      console.log(this.DataFilled);
      if (!this.emailExistsPop) {
        this.AccountsList.EditAccount(this.DataFilled).subscribe(
          {
            next: (response) => {
              console.log(response);
              this.router.navigate(['/management']);
            },
            error: (error) => {
              console.error(error);
              this.emailExistsPop = true;
            }
          }
        );
      }
    }
  }

  OnEditMode() {
    this.ManagSvc.loadSelectedAccountFromSessionStorage();
    if (this.ManagSvc.SelectedAcc != null) {
      this.OnEditAcc = this.ManagSvc.SelectedAcc;
    }
    return this.ManagSvc.SelectedAcc != null;
  }

  DeleteLoadedAcc() {
    this.ManagSvc.deleteAccountFromSessionStorage();
    this.ManagSvc.SelectedAcc = null;
    this.DataFilled = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: '',
      imageId : -1
    };
  }


  logoutPop() {
    this.logoutPopUp = true;
  }

  logoutConfirmation() {
    this.credentialsService.logout().subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/homePage']);
      },
      error: (error) => {
        console.error(error);
      }
    }
    );
  }

  CancelOper() {
    this.logoutPopUp = false;
    this.router.navigate(['/createAcc']);
  }

  onFileSelected(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];

      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("imageData", file);
        const upload$ = this.http.post<number>(`http://localhost:8888/api/v1/account/imageUpload`, formData);

        upload$.subscribe({
          next: (imageId) => {
            this.image_Id=imageId;
            this.DataFilled.imageId=this.image_Id;
            console.log('Uploaded image ID:', imageId);
          },
          error: (error) => {
            console.error('Image upload failed:', error);
          }
        }
        );
      }
    }

  }
}
