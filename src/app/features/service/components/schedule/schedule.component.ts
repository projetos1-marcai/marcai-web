import { HOURS, MINUTES } from './../../../../shared/util/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  hours = HOURS;
  minutes = MINUTES;

  hour: any;

  scheduleForm = new FormGroup({
    startHour: new FormControl('14', Validators.required),
    startMinute: new FormControl('00', Validators.required),
    endHour: new FormControl('16', Validators.required),
    endMinute: new FormControl('00', Validators.required)
  });
  constructor(
    public dialogRef: MatDialogRef<ScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.hour = this.data;
  }

  onSubmit(): void {
    console.log(this.scheduleForm.value);
    this.dialogRef.close(this.scheduleForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
