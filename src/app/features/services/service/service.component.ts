import { TokenService } from './../../../core/services/token/token.service';
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
  agenda: any;
  isLoading: boolean = false;
  isLogged = false;
  user: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.getService();
  }

  getService(): void {
    this.isLoading = true;
    this.serviceService.getService(this.serviceId).subscribe((data) => {
      this.agenda = data.agenda;
      this.service = data.servico;
      this.isLoading = false;
    });
  }

  editService(): void {
    this.router.navigate([`services/${this.serviceId}/edit`]);
  }

  goToProvider(): void {
    this.router.navigate([`provider/${this.service.fornecedor_id}`]);
  }

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
