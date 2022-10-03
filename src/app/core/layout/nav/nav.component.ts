import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TokenService } from './../../services/token/token.service';
import { RegisterComponent } from './../../../features/auth/register/register.component';
import { LoginComponent } from './../../../features/auth/login/login.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter } from 'rxjs';

interface NavItem {
  displayName: string;
  disabled?: boolean;
  route?: string;
  children?: NavItem[];
  role: string;
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  isLogged!: boolean;
  location: string = 'Campina Grande, PB';
  logoUrl: string = '/assets/img/avatar.png';
  pageEntry = 0;
  currentRoute = '';

  navForm = new FormGroup({
    search: new FormControl('')
  });

  selected = new FormControl(0);
  navItems: NavItem[] = [
    {
      displayName: 'Home',
      route: 'home',
      role: 'public'
    },
    {
      displayName: 'Explorar',
      route: 'search',
      role: 'public'
    }
    // {
    //   displayName: 'Fornecedores',
    //   route: 'providers',
    //   role: 'public'
    // }
  ];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) {
    router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        if (e instanceof NavigationEnd) {
          const currentRoute = this.router.url.split('/')[1];
          this.currentRoute = currentRoute;
          if (currentRoute.includes('explore')) {
            this.selected.setValue(1);
          } else {
            switch (currentRoute) {
              case '':
                this.selected.setValue(0);
                break;
              case '/':
                this.selected.setValue(0);
                break;
              case 'explore':
                this.selected.setValue(1);
                break;
              case 'services':
                this.selected.setValue(2);
                break;
              case 'profile':
                this.selected.setValue(3);
                break;
              case 'providers':
                this.selected.setValue(4);
                break;
              default:
                break;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
  }

  goToHome(): void {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  changeTab(event: any): void {
    console.log(this.pageEntry);
    console.log(this.selected.value);
    if (this.pageEntry++ !== 0 || this.currentRoute === '' || this.currentRoute === '/') {
      switch (event.index) {
        case 0:
          this.router.navigate(['/']);
          break;
        case 1:
          this.router.navigate(['/explore']);
          break;
        case 2:
          this.router.navigate(['/services']);
          break;
        case 3:
          this.router.navigate(['/profile']);
          break;
        case 4:
          this.router.navigate(['/providers']);
          break;
      }
    }
  }

  logOut(): void {
    this.tokenService.removeJwtToken();
    this.selected.value === 0 ? window.location.reload() : this.goToHome();
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
    dialogConfig.height = '550px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if (data === 'HAS_ACCOUNT') {
        this.handleLogin();
      }
    });
  }
}
