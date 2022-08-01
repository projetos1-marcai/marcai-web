import { ServiceService } from './../../core/services/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

type SearchType = 'service' | 'provider';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query!: string;
  search!: string;
  type: SearchType = 'service';

  services: any = [];
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private serviceService: ServiceService) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.q) {
        this.query = params.q;
      }
    });
  }

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch(): void {
    this.isLoading = true;
    this.serviceService.searchService(this.search ? this.search : this.query).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.search ? (this.query = this.search) : '';
        this.services = data.servicos;
      },
      (err: Error) => {
        this.isLoading = false;
        this.search ? (this.query = this.search) : '';
      }
    );
  }

  goToService(item: any): void {
    console.log(item);
  }
}
