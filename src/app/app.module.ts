import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersComponent } from './features/providers/providers.component';
import { ServicesComponent } from './features/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderComponent } from './features/providers/provider/provider.component';
import { ServiceComponent } from './features/services/service/service.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    ServicesComponent,
    ProviderComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
