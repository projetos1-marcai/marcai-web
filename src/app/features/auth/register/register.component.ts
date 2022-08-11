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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) {}

  ngOnInit(): void {}

  disableButton(): boolean {
    return this.registerForm.invalid;
  }

  submit(): void {}

  goToLogin(): void {
    this.dialogRef.close('HAS_ACCOUNT');
  }
}
