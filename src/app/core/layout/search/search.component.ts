import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/service/services.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  services: Service[] = [];

  b = [
    { titulo: "a" },
    { titulo: "B" },
    { titulo: "a" },
    { titulo: "a" },
    { titulo: "a" },
  ];

  constructor(private servicesService: ServicesService) {
  }

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  ngOnInit(): void { }

  handleLocation(): void { }

  handleLogin(): void { }

  handleRegistration(): void { }

  handleSearch(): void {
    const value = this.searchForm.value["search"];

    if (value.trim() !== "") {
      this.servicesService.findBySubstring(value).subscribe(services => {
        this.services = services;

        console.log(services);
        console.log(this.services);
        console.log(this.b);

      })
    }
  }

  goToServices(): void { }

  goToProviders(): void { }
}
