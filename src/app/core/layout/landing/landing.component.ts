import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  location: string = 'Campina Grande, PB';

  landingForm = new FormGroup({
    search: new FormControl('')
  });
  constructor() {}

  ngOnInit(): void {}

  handleLocation(): void {}

  handleLogin(): void {}

  handleRegistration(): void {}

  handleSearch(): void {}

  goToServices(): void {}

  goToProviders(): void {}
}
