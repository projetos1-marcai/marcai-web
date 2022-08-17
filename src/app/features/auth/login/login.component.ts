import { TokenService } from './../../../core/services/token/token.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}
  error!: string;
  isLoading = false;
  ngOnInit(): void {}

  disableButton(): boolean {
    return this.loginForm.invalid;
  }

  submit(): void {
    this.isLoading = true;
    const params = {
      email: this.loginForm.get('email')?.value,
      senha: this.loginForm.get('password')?.value
    };
    this.authService.login(params).subscribe(
      (data) => {
        this.isLoading = false;
        this.tokenService.setUserInfo(data.usuario);
        this.tokenService.setToken(data.token);
        window.location.reload();
      },
      () => {
        this.isLoading = false;
        this.error = 'Usuário ou senha inválidos.';
      }
    );
  }

  goToRegister(): void {
    this.dialogRef.close('NO_ACCOUNT');
  }
}
