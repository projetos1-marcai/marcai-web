import { TokenService } from './../../core/services/token/token.service';
import { ServiceService } from './../../core/services/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { Service } from 'src/app/core/models/service.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { AgendaService } from 'src/app/core/services/agenda/agenda.service';

// type SearchType = 'service' | 'provider';

const weekDays = new Map([
  ['domingo', 'Domingo'],
  ['segunda', 'Segunda'],
  ['terca', 'Terça'],
  ['quarta', 'Quarta'],
  ['quinta', 'Quinta'],
  ['sexta', 'Sexta'],
  ['sabado', 'Sábado']
]);

@Component({
  selector: 'app-search',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId?: string;
  isLogged = false;
  isLoading: boolean = false;
  services: any[] = [];
  isProvider: boolean = false;
  reservations: Map<string, any[]> = new Map();
  clientReservations: any[] = [];

  constructor(
    private router: Router,
    private providerService: ProviderService,
    private serviceService: ServiceService,
    private tokenService: TokenService,
    private userService: UserService,
    private agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.userId = this.user.id_usuario;
    this.isProvider = this.user.fornecedor;
    this.getUser();
    this.loadClientReservations();
  }

  loadClientReservations(): void {
    this.agendaService.getReservations().subscribe((data) => {
      data.reservas.forEach((e: any) => {
        this.clientReservations.push({
          service: e.servico,
          weekDay: weekDays.get(e.dia),
          reserva: e.reserva
        });
        console.log(e);
      });
      console.log(this.clientReservations);
    });
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
    var begin = new Date(item.inicio);
    var end = new Date(item.fim);

    var beginString = `${begin.getHours()}:${begin.getMinutes().toString().padStart(2, '0')}`;
    var endString = `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;

    return beginString + ' - ' + endString;
  }

  goToService(item: any): void {
    this.router.navigate([`service/${item.servico._id}`]);
  }
}
