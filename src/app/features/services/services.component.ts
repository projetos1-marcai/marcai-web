import { ServiceService } from './../../core/services/service/service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.isLoading = true;
    this.serviceService.getServices().subscribe((data) => {
      console.log(data);
      this.services = data.servicos;
      this.isLoading = false;
    });
  }

  goToProduct(item: any): void {
    this.router.navigate([`services/${item._id}`]);
  }
}

const SERVICES_MOCK = [
  {
    _id: '62c0cf5d4abc0de06569078f',
    titulo: 'Massagem relaxante',
    descricao:
      'Uma ferramenta que promove o bem-estar, aliviando o desconforto das regiões mais afetadas.',
    cnpj: null,
    fornecedor: 'Jamile Costa Estética Avançada',
    logo_url: 'https://64.media.tumblr.com/avatar_e6b353a59d9d_128.pnj',
    disponivel: true,
    presencial: true,
    valor: 80,
    avaliacoes: [],
    formas_pagamento: [1, 2],
    categoria: 1,
    agenda: 'ID da Agenda',
    createdAt: '2022-07-02T23:06:05.955Z',
    updatedAt: '2022-07-02T23:06:05.955Z',
    __v: 0
  },
  {
    _id: '62c0ffc35f87f67f6d818998',
    titulo: 'Aluguel de instrumentos',
    descricao: 'Bateria, guitarra, teclado, tambor, etç...',
    cnpj: null,
    fornecedor: 'ID do Fornecedor',
    logo_url:
      'https://img2.gratispng.com/20180523/zxg/kisspng-computer-icons-customer-service-icon-design-it-ser-ub4we-engineering-services-5b04fd02de8b46.2830610615270535709116.jpg',
    disponivel: true,
    presencial: true,
    valor: 10,
    avaliacoes: [],
    formas_pagamento: [1, 2, 3],
    categoria: 11,
    agenda: 'Id da Agenda',
    createdAt: '2022-07-03T02:32:35.208Z',
    updatedAt: '2022-07-03T02:32:35.208Z',
    __v: 0
  },
  {
    _id: '62c100065f87f67f6d81899a',
    titulo: 'Aluguel de maquinas',
    descricao: 'Moto serra, martelo, serra circular, carrinho de mão, etç...',
    cnpj: null,
    fornecedor: 'ID do Fornecedor',
    logo_url:
      'https://img2.gratispng.com/20180523/zxg/kisspng-computer-icons-customer-service-icon-design-it-ser-ub4we-engineering-services-5b04fd02de8b46.2830610615270535709116.jpg',
    disponivel: true,
    presencial: true,
    valor: 100,
    avaliacoes: [],
    formas_pagamento: [1, 2, 3, 4],
    categoria: 11,
    agenda: 'Id da Agenda',
    createdAt: '2022-07-03T02:33:42.154Z',
    updatedAt: '2022-07-03T02:33:42.154Z',
    __v: 0
  },
  {
    _id: '62c10a392f0f223ef92e9664',
    titulo: 'Barbeiro Luiggy e Mano Max 2',
    descricao: 'Os devs do cabelo 2',
    cnpj: null,
    fornecedor: 'Maninho',
    logo_url:
      'https://img2.gratispng.com/20180523/zxg/kisspng-computer-icons-customer-service-icon-design-it-ser-ub4we-engineering-services-5b04fd02de8b46.2830610615270535709116.jpg',
    disponivel: true,
    presencial: true,
    valor: 15,
    avaliacoes: [],
    formas_pagamento: [1, 2],
    categoria: 1,
    agenda: 'ID da Agenda',
    createdAt: '2022-07-03T03:17:13.287Z',
    updatedAt: '2022-07-03T03:17:13.287Z',
    __v: 0
  },
  {
    _id: '62c197752e162c0547252dc7',
    titulo: 'Alura presencial',
    descricao: 'Cursos da Alura presenciais',
    cnpj: null,
    fornecedor: 'ID do Usuario',
    logo_url:
      'https://img2.gratispng.com/20180523/zxg/kisspng-computer-icons-customer-service-icon-design-it-ser-ub4we-engineering-services-5b04fd02de8b46.2830610615270535709116.jpg',
    disponivel: true,
    presencial: true,
    valor: 1500,
    avaliacoes: [],
    formas_pagamento: [1, 2],
    categoria: 9,
    agenda: 'ID da Agenda',
    createdAt: '2022-07-03T13:19:49.155Z',
    updatedAt: '2022-07-03T13:19:49.155Z',
    __v: 0
  }
];
