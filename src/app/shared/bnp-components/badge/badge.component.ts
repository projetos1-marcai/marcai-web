import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bnp-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() backgroundColor?: string;
  @Input() color?: string;
}
