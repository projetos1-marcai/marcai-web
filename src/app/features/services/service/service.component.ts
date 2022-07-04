import { ServiceService } from './../../../core/services/service/service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service: any;
  serviceId?: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.serviceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getService();
  }

  getService(): void {
    this.serviceService.getService(this.serviceId).subscribe((data) => {
      this.service = data.service[0];
    });
  }

  goToProvider(): void {
    this.router.navigate([`provider/${this.service.fornecedor_id}`]);
  }

  backToList(): void {
    this.router.navigate([`services`]);
  }
}
