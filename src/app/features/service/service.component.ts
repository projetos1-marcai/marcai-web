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
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.serviceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    console.log(this.isLogged);
    console.log(this.user);
    this.getService();
  }

  getService(): void {
    this.isLoading = true;
    this.serviceService.getService(this.serviceId).subscribe((data) => {
      this.agenda = data.agenda;
      this.service = data.servico;
      console.log(data);
      this.isLoading = false;
    });
  }

  editService(): void {
    this.router.navigate([`service/${this.serviceId}/edit`]);
  }

  goToProvider(): void {
    this.router.navigate([`provider/${this.service.fornecedor_id}`]);
  }

  backToList(): void {
    this.router.navigate([`explore`]);
  }

  onSubmit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '550px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(ScheduleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}
