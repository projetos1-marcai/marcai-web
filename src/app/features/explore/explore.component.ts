import { CATEGORIES } from 'src/app/shared/util/util';
import { ServiceService } from '../../core/services/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

type SearchType = 'service' | 'provider';

@Component({
  selector: 'app-search',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  category!: any;
  search!: string;
  lastSearch?: string | null;
  type: SearchType = 'service';
  categories = CATEGORIES;

  services: any = [];
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.search = params.q ? params.q : '';
      this.category = params.category ? Number(params.category) : null;
    });
  }

  ngOnInit(): void {
    this.handleSearch();
  }

  handleSearch(): void {
    if (this.type === 'service') {
      if (this.search !== '') {
        this.searchServices();
      } else {
        this.getServices();
      }
    }
  }

  searchServices(): void {
    this.isLoading = true;
    this.serviceService.searchService(this.search).subscribe(
      (data: any) => {
        this.services = data.servicos;
        this.lastSearch = this.search;
        this.category ? this.filterServicesByCategory() : '';
        this.isLoading = false;
      },
      () => {
        this.category ? this.filterServicesByCategory() : '';
        this.lastSearch = this.search;
        this.isLoading = false;
      }
    );
  }

  getServices(): void {
    this.isLoading = true;
    this.serviceService.getServices().subscribe(
      (data: any) => {
        this.services = data.servicos;
        this.lastSearch = null;
        this.category ? this.filterServicesByCategory() : '';
        this.isLoading = false;
      },
      () => {
        this.lastSearch = null;
        this.category ? this.filterServicesByCategory() : '';
        this.isLoading = false;
      }
    );
  }

  filterServicesByCategory(): void {
    this.services = this.services.filter((item: any) => {
      return item.categoria === this.category;
    });
  }

  switchType(type: SearchType): void {
    this.type = type;
    this.handleSearch();
  }

  goToService(item: any): void {
    this.router.navigate([`service/${item._id}`]);
  }
}
