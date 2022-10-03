import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bnp-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent {
  @Input() multiple = false;
}
