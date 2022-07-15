import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  landingForm = new FormGroup({
    search: new FormControl('')
  });
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleSearch(): void {}

  goToServices(): void {
    console.log(this.landingForm.get('search'));
    this.router.navigate(['services']);
  }
  handleLocation(): void {}

  handleLogin(): void {}

  handleRegistration(): void {}

  goToProviders(): void {}
}
