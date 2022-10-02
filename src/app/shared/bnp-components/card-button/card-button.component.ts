import { Component, Input } from '@angular/core';

@Component({
  selector: 'dds-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {
  @Input() icon?: string;
  @Input() title?: string;
}
