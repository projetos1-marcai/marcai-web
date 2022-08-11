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
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit(): void {}

  disableButton(): boolean {
    return this.loginForm.invalid;
  }

  submit(): void {}

  goToRegister(): void {
    this.dialogRef.close('NO_ACCOUNT');
  }
}
