import { CATEGORIES } from './../../../shared/util/util';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  categories = CATEGORIES;

  landingForm = new FormGroup({
    search: new FormControl('')
  });
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleSearch(): void {
    const value = this.landingForm.get('search')!.value;
    if (value !== '') {
      this.router.navigate([`search`], { queryParams: { q: value } });
    }
  }

  goToServices(): void {
    this.router.navigate(['services']);
  }
  handleLocation(): void {}

  handleLogin(): void {}

  handleRegistration(): void {}

  goToProviders(): void {}
}
