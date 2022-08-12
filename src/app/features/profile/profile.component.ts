import { ServiceService } from './../../core/services/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Service } from 'src/app/core/models/service.model';

// type SearchType = 'service' | 'provider';

@Component({
  selector: 'app-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId?: string;
  services: any[] = [];
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private serviceService: ServiceService,
  ) { }

  ngOnInit(): void {
    // TODO: Modificar ID do usuário atual
    this.userId = "62e99d32da7eac57b5362318";
    // this.userId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getUser();
  }

  getUser(): void {
    this.isLoading = true;
    this.providerService.getProvider(this.userId).subscribe((data) => {
      this.user = data.usuario;
      var servicesIds = data.usuario.servicos;
      this.getServices(servicesIds);
    });
  }

  getServices(servicesIds: string[]): void {

    servicesIds.forEach((e: any, i: number) => {
      this.serviceService.getService(e).subscribe((data) => {
        this.services.push(data);
        if (i === servicesIds.length - 1) this.isLoading = false;
      });
    });

  }

  goToAgenda(): void {
    console.log(this.userId);
    // this.router.navigate([`services/${this.serviceId}/agenda`]);
  }

  // goToProvider(): void {
  //   this.router.navigate([`provider/${this.service.fornecedor_id}`]);
  // }

  backToList(): void {
    this.router.navigate([`services`]);
  }

  getSchedulingDuration(item: any): string {
    // agenda: "62d31154c982436372620300"
    // cliente: null
    // createdAt: "2022-07-16T20:30:58.915Z"
    // disponivel: true
    // fim: "2022-07-16T10:00:00.000Z"
    // inicio: "2022-07-16T08:00:00.000Z"
    // updatedAt: "2022-07-16T20:30:58.915Z"
    // __v: 0
    // _id: "62d3200280b9eb38bfd368d2"

    var begin = new Date(item.inicio);
    var end = new Date(item.fim);

    var beginString = `${begin.getHours()}:${begin.getMinutes()}`;
    var endString = `${end.getHours()}:${end.getMinutes()}`;

    return beginString + ' - ' + endString;
  }
}