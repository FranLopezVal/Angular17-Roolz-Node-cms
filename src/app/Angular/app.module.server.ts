/**
 * CopyRight (C) 2024 Francisco Lopez
 * Proyecto de Git: https://github.com/FranLopezVal
 * Creado como parte de portafolio de Francisco.
 * 
 * Si usas este código por favor respeta los derechos de autor. (da crédito al autor :D)
 * Este proyecto es de uso libre para fines educativos.
 * 
 * Os quiero mucho.
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './AppComponent/app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
