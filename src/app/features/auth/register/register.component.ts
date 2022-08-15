import { TokenService } from './../../../core/services/token/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error!: string;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cellphoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('1', [Validators.required])
  });
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}

  disableButton(): boolean {
    return this.registerForm.invalid;
  }

  submit(): void {
    console.log(this.registerForm.value);
    const cell = this.registerForm.get('cellphoneNumber')?.value;
    const params = {
      nome: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      senha: this.registerForm.get('password')?.value,
      telefone: `(${cell.substring(0, 2)}) ${cell.substring(2)}`,
      fornecedor: this.registerForm.get('type')?.value === '2' ? true : false
    };
    this.authService.register(params).subscribe(
      (data) => {
        setTimeout(() => {
          this.authService.login({ email: params.email, senha: params.senha }).subscribe(
            (res: any) => {
              this.tokenService.setToken(res.token);
              location.reload();
            },
            (err) => {
              location.reload();
            }
          );
        }, 1000);
      },
      () => {
        this.error = 'Ocorreu um erro, verifique os dados.';
      }
    );
  }

  goToLogin(): void {
    this.dialogRef.close('HAS_ACCOUNT');
  }
}
