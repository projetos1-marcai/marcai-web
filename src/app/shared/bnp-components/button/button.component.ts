import { OnChanges, SimpleChanges } from '@angular/core';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

export type IBnpButtonType = 'stroked' | 'outline';
export type IBnpButtonColor = 'blue' | 'orange' | 'gray';

@Component({
  selector: 'bnp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {
  @Input() width?: string;
  @Input() class?: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() type?: IBnpButtonType;
  @Input() color?: IBnpButtonColor;
  classesList: any = [];

  ngOnChanges(): void {
    this.classesList = [];
    this.type ? this.classesList.push(this.type) : '';
    this.color ? this.classesList.push(this.color) : '';
    this.class ? this.classesList.push(this.class) : '';
    this.icon ? this.classesList.push('icon') : '';
    this.disabled ? this.classesList.push('disabled') : '';
  }
}
