import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor() {}

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  ngOnInit(): void {}

  handleLocation(): void {}

  handleLogin(): void {}

  handleRegistration(): void {}

  handleSearch(): void {}

  goToServices(): void {}

  goToProviders(): void {}
}
