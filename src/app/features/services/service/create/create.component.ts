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

  categories = CATEGORIES;
  paymentMethods = PAYMENT_METHODS;

  createForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    logo: new FormControl({ uploaded: false, file: null, base64: null }),
    presencial: new FormControl(''),
    valor: new FormControl('', [Validators.required]),
    formas_pagamento: new FormControl('', [Validators.required]),
    disponivel: new FormControl(''),
    endereco: new FormControl({}),
    fornecedor: new FormControl('')
  });
  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm.patchValue({
      disponivel: true,
      fornecedor: '123'
    });
  }

  onSubmit(): void {
    const params = {
      ...this.createForm.value
    };

    this.isLoading = true;
    this.serviceService.createService(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.router.navigate([`service/id/${data._id}`]);
      },
      (err) => {
        this.openSnackBar('Ocorreu um erro, verifique os dados ou tente mais tarde.');
        this.isLoading = false;
      }
    );
  }

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
