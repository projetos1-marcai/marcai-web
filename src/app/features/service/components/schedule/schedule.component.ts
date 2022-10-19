import { HOURS, MINUTES } from './../../../../shared/util/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  hours = HOURS;
  minutes = MINUTES;

  scheduleForm = new FormGroup({
    startHour: new FormControl('14', Validators.required),
    startMinute: new FormControl('00', Validators.required),
    endHour: new FormControl('16', Validators.required),
    endMinute: new FormControl('00', Validators.required)
  });
  constructor(public dialogRef: MatDialogRef<ScheduleComponent>) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.scheduleForm.value);
    this.dialogRef.close(this.scheduleForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
