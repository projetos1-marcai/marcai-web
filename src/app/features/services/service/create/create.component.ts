import { TokenService } from './../../../../core/services/token/token.service';
import { AgendaService } from './../../../../core/services/agenda/agenda.service';
import { Router } from '@angular/router';
import { ServiceService } from './../../../../core/services/service/service.service';
import { CATEGORIES, PAYMENT_METHODS } from './../../../../shared/util/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    mondayStart: new FormControl('14:00'),
    mondayEnd: new FormControl('16:00'),
    tuesday: new FormControl(true),
    tuesdayStart: new FormControl('14:00'),
    tuesdayEnd: new FormControl('16:00'),
    wednesday: new FormControl(true),
    wednesdayStart: new FormControl('14:00'),
    wednesdayEnd: new FormControl('16:00'),
    thursday: new FormControl(true),
    thursdayStart: new FormControl('14:00'),
    thursdayEnd: new FormControl('16:00'),
    friday: new FormControl(true),
    fridayStart: new FormControl('14:00'),
    fridayEnd: new FormControl('16:00'),
    saturday: new FormControl(false),
    saturdayStart: new FormControl('14:00'),
    saturdayEnd: new FormControl('16:00'),
    sunday: new FormControl(false),
    sundayStart: new FormControl('14:00'),
    sundayEnd: new FormControl('16:00')
  });
  constructor(
    private serviceService: ServiceService,
    private agendaService: AgendaService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.createForm.patchValue({
      disponivel: true,
      fornecedor: this.user.id_usuario || ''
    });
  }

  onSubmit(): void {
    const params = {
      ...this.createForm.value,
      logo_url: this.createForm.get('logo')?.value.base64
    };

    this.isLoading = true;
    this.serviceService.createService(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.createAgenda(data.servico);
      },
      (err) => {
        this.openSnackBar('Ocorreu um erro, verifique os dados ou tente mais tarde.');
        this.isLoading = false;
      }
    );
  }

  createAgenda(service: any): void {
    const availableDays = [];

    for (const field in this.agendaForm.controls) {
      const control = this.agendaForm.get(field)?.value;
      if (control === true) {
        availableDays.push(field);
      }
    }

    availableDays.forEach((day, index) => {
      const start = this.agendaForm.get(`${day}Start`)?.value;
      const end = this.agendaForm.get(`${day}End`)?.value;
      const translatedDay = this.translateDay(day);

      const params = {
        id_servico: service._id,
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      this.agendaService.createAgenda(params).subscribe((data: any) => {});

      if (index === availableDays.length - 1) {
        this.router.navigate([`services/${service._id}`]);
        window.location.reload();
      }
    });
  }

  openSnackBar(value: string) {
    this._snackBar.open(value, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  private convertToAMPM(value: any): string {
    const num = Number(value.replace(':', ''));
    let firstDigits = String(Number(value.slice(0, 2)) - 12);
    firstDigits = firstDigits.length < 2 ? `0${firstDigits}` : firstDigits;
    let result = num < 1200 ? `${value} AM` : `${firstDigits}:${value.substring(3, 5)} PM`;
    return result;
  }

  private translateDay(day: any): string {
    const days = [
      'segunda',
      'monday',
      'terca',
      'tuesday',
      'quarta',
      'wednesday',
      'quinta',
      'thursday',
      'sexta',
      'friday',
      'sabado',
      'saturday',
      'domingo',
      'sunday'
    ];

    const index = days.findIndex((u) => u == day);
    return days[index - 1];
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
