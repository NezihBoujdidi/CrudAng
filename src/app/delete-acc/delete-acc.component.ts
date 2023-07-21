import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManagementService } from '../management.service';
import { AccountsListService } from '../accounts-list.service';
import { Router } from '@angular/router';
import { CredentialslistService } from '../Credentials.service';

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
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.component.html',
  styleUrls: ['./delete-acc.component.css'],
  providers: [ManagementService, AccountsListService]
})
export class DeleteAccComponent implements OnInit {
  @ViewChild('popUpContainer', { static: false })
  popUpContainer!: ElementRef;
  AccTable: Array<any> = [];
  popUp: boolean = false;

  OnDeleteAcc: AccountWithImage | null = null;
  logoutPopUp: boolean = false;

  constructor(
    private ManagSvc: ManagementService,
    private AccountsList: AccountsListService,
    private router: Router,
    private credentialsService: CredentialslistService
  ) { }

  ngOnInit(): void {
    this.AccountsList.getAccounts().subscribe((data) => {
      this.AccTable = data;
      this.AccTable.forEach((account: any) => {
        const id = account.imageId;
        this.AccountsList.getImage(id).subscribe({
          next: (response: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              account.imageSrc = reader.result as string;
            };
            reader.readAsDataURL(response);
          },
          error: (error) => {
            console.error(error);
          }
        }
        );
      }
      );
    }
    );

    this.popUp = false;
  }


  DeletePopUp(row: AccountWithImage) {
    this.ManagSvc.saveSelectedAccountToSessionStorage();
    this.OnDeleteAcc = row;
    console.log(this.OnDeleteAcc);
    this.popUp = true;
    if (this.popUpContainer && this.popUpContainer.nativeElement) {
      setTimeout(() => {
        setTimeout(() => {
          this.popUpContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    };
  }

  DeleteConfirmation() {
    if (this.OnDeleteAcc) {
      this.AccountsList.deleteAccount(this.OnDeleteAcc.id).subscribe((response) => console.log(response));
      this.AccountsList.deleteImage(this.OnDeleteAcc.imageId).subscribe((response) => console.log(response));
    }
    this.router.navigate(['/management']);
  }

  CancelOp() {
    this.popUp = false;
    this.router.navigate(['/deleteAcc']);
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
    this.router.navigate(['/deleteAcc']);
  }
}