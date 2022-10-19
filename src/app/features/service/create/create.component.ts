import { ScheduleComponent } from './../components/schedule/schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/core/services/agenda/agenda.service';
import { ServiceService } from 'src/app/core/services/service/service.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { CATEGORIES, PAYMENT_METHODS } from 'src/app/shared/util/util';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLoading: boolean = false;
  isLogged = false;
  user: any;
  categories = CATEGORIES;
  paymentMethods = PAYMENT_METHODS;

  createForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    logo: new FormControl({ uploaded: false, file: null, base64: null }),
    presencial: new FormControl(false),
    valor: new FormControl('', [Validators.required]),
    formas_pagamento: new FormControl('', [Validators.required]),
    disponivel: new FormControl(true),
    endereco: new FormControl({}),
    fornecedor: new FormControl('')
  });

  agendaForm = new FormGroup({
    monday: new FormControl(true),
    mondayStopStart: new FormControl('12:00'),
    mondayStopEnd: new FormControl('14:00'),
    mondayStart: new FormControl('14:00'),
    mondayEnd: new FormControl('16:00'),

    tuesday: new FormControl(true),
    tuesdayStopStart: new FormControl('12:00'),
    tuesdayStopEnd: new FormControl('14:00'),
    tuesdayStart: new FormControl('14:00'),
    tuesdayEnd: new FormControl('16:00'),

    wednesday: new FormControl(true),
    wednesdayStopStart: new FormControl('12:00'),
    wednesdayStopEnd: new FormControl('14:00'),
    wednesdayStart: new FormControl('14:00'),
    wednesdayEnd: new FormControl('16:00'),

    thursday: new FormControl(true),
    thursdayStopStart: new FormControl('12:00'),
    thursdayStopEnd: new FormControl('14:00'),
    thursdayStart: new FormControl('14:00'),
    thursdayEnd: new FormControl('16:00'),

    friday: new FormControl(true),
    fridayStopStart: new FormControl('12:00'),
    fridayStopEnd: new FormControl('14:00'),
    fridayStart: new FormControl('14:00'),
    fridayEnd: new FormControl('16:00'),

    saturday: new FormControl(false),
    saturdayStopStart: new FormControl('12:00'),
    saturdayStopEnd: new FormControl('14:00'),
    saturdayStart: new FormControl('14:00'),
    saturdayEnd: new FormControl('16:00'),

    sunday: new FormControl(false),
    sundayStopStart: new FormControl('12:00'),
    sundayStopEnd: new FormControl('14:00'),
    sundayStart: new FormControl('14:00'),
    sundayEnd: new FormControl('16:00')
  });

  constructor(
    private serviceService: ServiceService,
    private agendaService: AgendaService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
  }

  onSubmit(): void {
    const params = {
      ...this.createForm.value,
      logo_url: this.createForm.get('logo')?.value.base64
    };
  }

  addSchedule(day: any): void {
    const dialogRef = this.dialog.open(ScheduleComponent, {
      width: 'auto',
      data: { day }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  // UTILS METHODS

  openSnackBar(value: string) {
    this._snackBar.open(value, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  disableButton(): boolean {
    return this.createForm.invalid;
  }

  async onFileSelected(file: File) {
    const base64: any = await this.toBase64(file);
    this.createForm.get('logo')?.setValue({ uploaded: true, file, base64 });
  }

  toBase64 = (file?: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
}
