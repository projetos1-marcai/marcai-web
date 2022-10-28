import { AgendaService } from 'src/app/core/services/agenda/agenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/core/services/service/service.service';
import { TokenService } from 'src/app/core/services/token/token.service';

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
    private agendaService: AgendaService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
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
    this.router.navigate([`service/${this.serviceId}/edit`]);
  }

  deleteService(): void {
    if (confirm('Tem certeza que deseja excluir esse serviço?')) {
      this.serviceService.deleteService(this.serviceId).subscribe(
        (data) => {
          this.openSnackBar('Serviço excluido com sucesso.');
          this.backToList();
        },
        () => {
          this.openSnackBar('Ocorreu um erro ao excluir o serviço');
        }
      );
    }
  }

  goToProvider(): void {
    this.router.navigate([`provider/${this.service.fornecedor_id}`]);
  }

  backToList(): void {
    this.router.navigate([`explore`]);
  }

  onSubmit(hour: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '450px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = hour;

    const dialogRef = this.dialog.open(ScheduleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(hour);
      console.log(data);

      if (data) {
        this.isLoading = true;
        const tempDay = new Date(hour.inicio).toISOString().split('T')[0].split('-');
        const day = `${tempDay[2]}-${tempDay[1]}-${tempDay[0]}`;

        const params = {
          inicio: `${day} ${data.startHour}:${data.startMinute}`,
          fim: `${day} ${data.endHour}:${data.endMinute}`
        };

        this.agendaService.applyReservation(params, hour._id).subscribe(
          (data) => {
            console.log(data);
            this.openSnackBar(
              'Reserva solicitada com sucesso, você pode consultar suas reservas no menu de perfil'
            );
            this.isLoading = false;
          },
          (err) => {
            this.openSnackBar(
              err.error.message
                ? err.error.message
                : 'Ocorreu um erro ao tentar reservar o horário.'
            );
            this.isLoading = false;
          }
        );
      }
    });
  }

  openSnackBar(value: string) {
    this._snackBar.open(value, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
