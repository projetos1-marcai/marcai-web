import { TokenService } from './../../core/services/token/token.service';
import { ServiceService } from './../../core/services/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Service } from 'src/app/core/models/service.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { AgendaService } from 'src/app/core/services/agenda/agenda.service';

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
  reservations: Map<string, any[]> = new Map();
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private providerService: ProviderService,
    private serviceService: ServiceService,
    private userService: UserService,
    private agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.userId = this.user.id_usuario;
    this.isProvider = this.user.fornecedor;
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
    if (servicesIds.length === 0) {
      this.isLoading = false;
    } else {
      servicesIds.forEach((e: any, i: number) => {
        this.serviceService.getService(e).subscribe((data) => {
          this.services.push(data);

          if (this.services.length === servicesIds.length) {
            this.getReservations();
          }
        });
      });
      console.log(this.services);
    }
  }

  // "1": "Pendente",
  // "2": "Concluído",
  // "3": "Aceito",
  // "4": "Recusado",
  // "5": "Cancelado",
  // "6": "Expirado"
  getReservations(): void {
    this.isLoading = false;

    this.services.forEach((service, i) => {
      console.log(service.agenda);
      this.providerService.getReservations(service.agenda._id, 1).subscribe((data) => {
        this.saveReservations(data, service);
      });
    });
  }

  saveReservations(data: any, service: any) {
    data.reservas.forEach((reserva: any) => {
      // let info = this.getReservationInfo(reserva.cliente, reserva.horario, reserva.status)
      let info;

      let clientName: string;
      let horario: string;
      let statusText: string;

      statusText = reserva.status === 1 ? 'Pendente' : 'Aceito';
      // horario = reserva.horario;

      this.userService.getUser(reserva.cliente).subscribe((data) => {
        clientName = data.usuario.nome;

        this.agendaService.getHorario(reserva.horario).subscribe((data2) => {
          console.log(data2);

          info = {
            cliente: clientName,
            horario: this.getSchedulingDuration(data2.horario),
            status: statusText
          };
          if (this.reservations.get(service.servico._id) == undefined) {
            this.reservations.set(service.servico._id, [info]);
          } else {
            this.reservations.get(service.servico._id)?.push(info);
          }
        });
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

    var beginString = `${begin.getHours()}:${begin.getMinutes().toString().padStart(2, '0')}`;
    var endString = `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;

    return beginString + ' - ' + endString;
  }
}
