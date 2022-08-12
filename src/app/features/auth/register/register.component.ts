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
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cellphoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('1', [Validators.required])
  });
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>
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
      telefone: `(${cell.substring(0, 2)}) ${cell.substring(2)}`
    };
    this.authService.register(params).subscribe((data) => {
      console.log(data);
    });
  }

  goToLogin(): void {
    this.dialogRef.close('HAS_ACCOUNT');
  }
}
