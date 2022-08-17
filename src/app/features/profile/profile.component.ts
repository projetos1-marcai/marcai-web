import { TokenService } from './../../core/services/token/token.service';
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
  isLogged = false;
  isLoading: boolean = false;
  isProvider: boolean = false;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private providerService: ProviderService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.userId = this.user.id_usuario;
    this.isProvider = this.user.fornecedor;
    console.log(this.user);
    this.getUser();
  }

  getUser(): void {
    this.isLoading = true;

    if (this.isProvider) {
      this.providerService.getProvider(this.userId).subscribe((data) => {
        this.user = data.usuario;
        var servicesIds = data.usuario.servicos;
        this.getServices(servicesIds);
      });
    } else {
      this.isLoading = false;
    }
  }

  goToProduct(item: any): void {
    this.router.navigate([`services/${item._id}`]);
  }

  getServices(servicesIds: string[]): void {
    console.log(this.isProvider);

    if (servicesIds.length === 0) {
      this.isLoading = false;
    } else {
      servicesIds.forEach((e: any, i: number) => {
        this.serviceService.getService(e).subscribe((data) => {
          this.services.push(data);
          if (i === servicesIds.length - 1) this.isLoading = false;
        });
      });
      console.log(this.services);
    }
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
