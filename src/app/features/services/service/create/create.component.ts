import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isLoading: boolean = false;

  createForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    cnpj: new FormControl(''),
    fornecedor: new FormControl(''),
    logo_url: new FormControl('', [Validators.required]),
    disponivel: new FormControl('', [Validators.required]),
    presencial: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    formas_pagamento: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    endereco: new FormControl({}, [Validators.required])
  });
  constructor() {}

  ngOnInit(): void {}
}
