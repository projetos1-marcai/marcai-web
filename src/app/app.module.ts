import { MatDialogModule } from '@angular/material/dialog';
import { ExploreComponent } from './features/explore/explore.component';
import { TenantInterceptor } from './core/interceptors/tenant.interceptor';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileComponent } from './features/profile/profile.component';
import { ServiceComponent } from './features/service/service.component';
import { EditComponent } from './features/service/edit/edit.component';
import { CreateComponent } from './features/service/create/create.component';

import { ScheduleComponent } from './features/service/components/schedule/schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    ExploreComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ServiceComponent,
    EditComponent,
    CreateComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatDialogModule,
    MatNativeDateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
