import { RegisterComponent } from './../../../features/auth/register/register.component';
import { LoginComponent } from './../../../features/auth/login/login.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  location: string = 'Campina Grande, PB';
  route: any;
  navForm = new FormGroup({
    search: new FormControl('')
  });
  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.route = event.url;
      });
  }

  ngOnInit(): void {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  handleSearch() {}

  handleLocation(): void {
    // this.dialog.open()
  }

  handleLogin(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '380px';
    dialogConfig.height = '400px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'NO_ACCOUNT') {
        this.handleRegistration();
      } else if (data === 'SUCCESS') {
      }
    });
  }

  handleRegistration(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '380px';
    dialogConfig.height = '400px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}
