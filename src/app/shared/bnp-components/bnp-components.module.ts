import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { DividerComponent } from './divider/divider.component';
import { TabsComponent } from './tabs/tabs.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { SkelletonComponent } from './skelleton/skelleton.component';
import { CardButtonComponent } from './card-button/card-button.component';

const components = [
  ButtonComponent,
  InputComponent,
  DividerComponent,
  TabsComponent,
  BadgeComponent,
  CardButtonComponent,
  ButtonToggleComponent,
  SkelletonComponent,
  CardButtonComponent
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, MatIconModule]
})
export class BnpComponentsModule {}
