import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersComponent } from './features/providers/providers.component';
import { ServicesComponent } from './features/services/services.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderComponent } from './features/providers/provider/provider.component';
import { ServiceComponent } from './features/services/service/service.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './features/search/search.component';
import { AgendaComponent } from './features/services/service/agenda/agenda.component';
import { CreateComponent } from './features/services/service/create/create.component';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EditComponent } from './features/services/service/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    ServicesComponent,
    ProviderComponent,
    ServiceComponent,
    SearchComponent,
    AgendaComponent,
    CreateComponent,
    EditComponent
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
    NgxMaskModule,
    CurrencyMaskModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
