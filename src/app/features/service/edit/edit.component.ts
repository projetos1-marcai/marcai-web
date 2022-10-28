import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/app/core/services/agenda/agenda.service';
import { ServiceService } from 'src/app/core/services/service/service.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { CATEGORIES, PAYMENT_METHODS } from 'src/app/shared/util/util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isLoading: boolean = false;
  serviceId?: string;
  prevAgenda: any;
  categories = CATEGORIES;
  paymentMethods = PAYMENT_METHODS;
  isLogged = false;
  user: any;

  editForm = new FormGroup({
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
    monday: new FormControl(false),
    mondayId: new FormControl(null),
    mondayStart: new FormControl('14:00'),
    mondayEnd: new FormControl('16:00'),

    tuesday: new FormControl(false),
    tuesdayId: new FormControl(null),
    tuesdayStart: new FormControl('14:00'),
    tuesdayEnd: new FormControl('16:00'),

    wednesday: new FormControl(false),
    wednesdayId: new FormControl(null),
    wednesdayStart: new FormControl('14:00'),
    wednesdayEnd: new FormControl('16:00'),

    thursday: new FormControl(false),
    thursdayId: new FormControl(null),
    thursdayStart: new FormControl('14:00'),
    thursdayEnd: new FormControl('16:00'),

    friday: new FormControl(false),
    fridayId: new FormControl(null),
    fridayStart: new FormControl('14:00'),
    fridayEnd: new FormControl('16:00'),

    saturday: new FormControl(false),
    saturdayId: new FormControl(null),
    saturdayStart: new FormControl('14:00'),
    saturdayEnd: new FormControl('16:00'),

    sunday: new FormControl(false),
    sundayId: new FormControl(null),
    sundayStart: new FormControl('14:00'),
    sundayEnd: new FormControl('16:00')
  });

  constructor(
    private serviceService: ServiceService,
    private agendaService: AgendaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.isLogged = this.tokenService.isLoggedIn();
    this.user = this.tokenService.getUserInfo();
    this.serviceService.getService(this.serviceId).subscribe((data: any) => {
      this.initForm(data);
    });
  }

  initForm(data: any): void {
    this.editForm.patchValue({
      ...data.servico,
      logo: { uploaded: true, file: true, base64: data.servico.logo_url }
    });

    this.prevAgenda = data.agenda;
    const agenda = data.agenda;
    if (agenda.segunda.length > 0) {
      this.agendaForm.get('monday')?.setValue(true);
      this.agendaForm.get('mondayId')?.setValue(agenda.segunda[0]._id);
      this.agendaForm
        .get('mondayStart')
        ?.setValue(this.convertToHoursString(agenda.segunda[0].inicio));
      this.agendaForm.get('mondayEnd')?.setValue(this.convertToHoursString(agenda.segunda[0].fim));
    }
    if (agenda.terca.length > 0) {
      this.agendaForm.get('tuesday')?.setValue(true);
      this.agendaForm.get('tuesdayId')?.setValue(agenda.terca[0]._id);
      this.agendaForm
        .get('tuesdayStart')
        ?.setValue(this.convertToHoursString(agenda.terca[0].inicio));
      this.agendaForm.get('tuesdayEnd')?.setValue(this.convertToHoursString(agenda.terca[0].fim));
    }
    if (agenda.quarta.length > 0) {
      this.agendaForm.get('wednesday')?.setValue(true);
      this.agendaForm.get('wednesdayId')?.setValue(agenda.quarta[0]._id);
      this.agendaForm
        .get('wednesdayStart')
        ?.setValue(this.convertToHoursString(agenda.quarta[0].inicio));
      this.agendaForm
        .get('wednesdayEnd')
        ?.setValue(this.convertToHoursString(agenda.quarta[0].fim));
    }
    if (agenda.quinta.length > 0) {
      this.agendaForm.get('thursday')?.setValue(true);
      this.agendaForm.get('thursdayId')?.setValue(agenda.quinta[0]._id);
      this.agendaForm
        .get('thursdayStart')
        ?.setValue(this.convertToHoursString(agenda.quinta[0].inicio));
      this.agendaForm.get('thursdayEnd')?.setValue(this.convertToHoursString(agenda.quinta[0].fim));
    }
    if (agenda.sexta.length > 0) {
      this.agendaForm.get('friday')?.setValue(true);
      this.agendaForm.get('fridayId')?.setValue(agenda.sexta[0]._id);
      this.agendaForm
        .get('fridayStart')
        ?.setValue(this.convertToHoursString(agenda.sexta[0].inicio));
      this.agendaForm.get('fridayEnd')?.setValue(this.convertToHoursString(agenda.sexta[0].fim));
    }
    if (agenda.sabado.length > 0) {
      this.agendaForm.get('saturday')?.setValue(true);
      this.agendaForm.get('saturdayId')?.setValue(agenda.sabado[0]._id);
      this.agendaForm
        .get('saturdayStart')
        ?.setValue(this.convertToHoursString(agenda.sabado[0].inicio));
      this.agendaForm.get('saturdayEnd')?.setValue(this.convertToHoursString(agenda.sabado[0].fim));
    }
    if (agenda.domingo.length > 0) {
      this.agendaForm.get('sunday')?.setValue(true);
      this.agendaForm.get('sundayId')?.setValue(agenda.domingo[0]._id);
      this.agendaForm
        .get('sundayStart')
        ?.setValue(this.convertToHoursString(agenda.domingo[0].inicio));
      this.agendaForm.get('sundayEnd')?.setValue(this.convertToHoursString(agenda.domingo[0].fim));
    }

    console.log(this.agendaForm.value);
  }

  onSubmit(): void {
    const params = {
      ...this.editForm.value,
      logo_url: this.editForm.get('logo')?.value.base64
    };

    this.isLoading = true;
    this.serviceService.updateService(this.serviceId, params).subscribe(
      (data: any) => {
        this.editAgenda();
      },
      (err: any) => {
        this.openSnackBar('Ocorreu um erro, verifique os dados ou tente mais tarde.');
        this.isLoading = false;
      }
    );
  }

  editAgenda(): void {
    const availableDays = [];
    let timing = 0;

    for (const field in this.agendaForm.controls) {
      const control = this.agendaForm.get(field)?.value;
      if (control === true) {
        availableDays.push(field);
      }
    }

    availableDays.forEach((day, index) => {
      const id = this.agendaForm.get(`${day}Id`)?.value;
      const start = this.agendaForm.get(`${day}Start`)?.value;
      const end = this.agendaForm.get(`${day}End`)?.value;
      const translatedDay = this.translateDay(day);

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end)
      };

      if (id) {
        setTimeout(() => {
          this.agendaService.editAgenda(params, id).subscribe((data: any) => {});
        }, (timing += 400));
      }
      if (index === availableDays.length - 1) {
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate([`service/${this.serviceId}`]);
          // window.location.reload();
        }, 3000);
      }
    });

    if (availableDays.length - 1) {
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate([`service/${this.serviceId}`]);
        // window.location.reload();
      }, 3000);
    }

    this.addDays();
    this.cleanDays();
  }

  addDays(): void {
    if (this.prevAgenda.segunda.length === 0 && this.agendaForm.get('monday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`mondayStart`)?.value;
      const end = this.agendaForm.get(`mondayEnd`)?.value;
      const translatedDay = this.translateDay('monday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 400);
    }

    if (this.prevAgenda.terca.length === 0 && this.agendaForm.get('tuesday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`tuesdayStart`)?.value;
      const end = this.agendaForm.get(`tuesdayEnd`)?.value;
      const translatedDay = this.translateDay('tuesday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 800);
    }

    if (this.prevAgenda.quarta.length === 0 && this.agendaForm.get('wednesday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`wednesdayStart`)?.value;
      const end = this.agendaForm.get(`wednesdayEnd`)?.value;
      const translatedDay = this.translateDay('wednesday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 1200);
    }

    if (this.prevAgenda.quinta.length === 0 && this.agendaForm.get('thursday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`thursdayStart`)?.value;
      const end = this.agendaForm.get(`thursdayEnd`)?.value;
      const translatedDay = this.translateDay('thursday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 1600);
    }

    if (this.prevAgenda.sexta.length === 0 && this.agendaForm.get('friday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`fridayStart`)?.value;
      const end = this.agendaForm.get(`fridayEnd`)?.value;
      const translatedDay = this.translateDay('friday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 2000);
    }

    if (this.prevAgenda.sabado.length === 0 && this.agendaForm.get('saturday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`saturdayStart`)?.value;
      const end = this.agendaForm.get(`saturdayEnd`)?.value;
      const translatedDay = this.translateDay('saturday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 2400);
    }

    if (this.prevAgenda.domingo.length === 0 && this.agendaForm.get('sunday')?.value === true) {
      this.agendaService;
      const start = this.agendaForm.get(`sundayStart`)?.value;
      const end = this.agendaForm.get(`sundayEnd`)?.value;
      const translatedDay = this.translateDay('sunday');

      const params = {
        inicio: this.convertToAMPM(start),
        fim: this.convertToAMPM(end),
        dia: translatedDay
      };
      setTimeout(() => {
        this.agendaService.createAgenda(params, this.serviceId).subscribe((data: any) => {});
      }, 2800);
    }
  }

  cleanDays(): void {
    if (this.prevAgenda.segunda.length > 0 && this.agendaForm.get('monday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('mondayId')?.value,
            dia: 'segunda'
          })
          .subscribe();
      }, 400);
    }

    if (this.prevAgenda.terca.length > 0 && this.agendaForm.get('tuesday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('tuesdayId')?.value,
            dia: 'terca'
          })
          .subscribe();
      }, 800);
    }
    if (this.prevAgenda.quarta.length > 0 && this.agendaForm.get('wednesday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('wednesdayId')?.value,
            dia: 'quarta'
          })
          .subscribe();
      }, 1200);
    }
    if (this.prevAgenda.quinta.length > 0 && this.agendaForm.get('thursday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('thursdayId')?.value,
            dia: 'quinta'
          })
          .subscribe();
      }, 1600);
    }
    if (this.prevAgenda.sexta.length > 0 && this.agendaForm.get('friday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('fridayId')?.value,
            dia: 'sexta'
          })
          .subscribe();
      }, 2000);
    }
    if (this.prevAgenda.sabado.length > 0 && this.agendaForm.get('saturday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('saturdayId')?.value,
            dia: 'sabado'
          })
          .subscribe();
      }, 2400);
    }
    if (this.prevAgenda.domingo.length > 0 && this.agendaForm.get('sunday')?.value === false) {
      setTimeout(() => {
        this.agendaService
          .cleanAgenda({
            id_servico: this.serviceId,
            id_agenda: this.agendaForm.get('sundayId')?.value,
            dia: 'domingo'
          })
          .subscribe();
      }, 2800);
    }
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

  private convertToHoursString(value: string): string {
    const date = new Date(value);
    let hours: any = date.getHours() + 3;
    let minutes: any = date.getMinutes();
    hours = String(hours).length < 2 ? `0${String(hours)}` : String(hours);
    minutes = String(minutes).length < 2 ? `0${String(minutes)}` : String(minutes);
    return hours + ':' + minutes;
  }

  private translateDay(day: any, pt?: boolean): string {
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
    return pt ? days[index + 1] : days[index - 1];
  }

  disableButton(): boolean {
    return this.editForm.invalid;
  }

  async onFileSelected(file: File) {
    const base64: any = await this.toBase64(file);
    this.editForm.get('logo')?.setValue({ uploaded: true, file, base64 });
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
