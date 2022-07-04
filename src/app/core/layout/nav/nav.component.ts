import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

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

  handleLogin(): void {}

  handleRegistration(): void {}
}
