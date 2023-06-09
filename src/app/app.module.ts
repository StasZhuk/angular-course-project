import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { CoreModule } from './core.module';

@NgModule({
  exports: [],
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
