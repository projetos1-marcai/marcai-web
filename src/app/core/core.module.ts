import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './layout/nav/nav.component';
import { LandingComponent } from './layout/landing/landing.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [LayoutComponent, NavComponent, LandingComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [LayoutComponent]
})
export class CoreModule {}
