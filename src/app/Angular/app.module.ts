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
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './AppComponent/app.component';
import { SharedModule } from '../Shared/shared.module';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { Environments } from '../Core/Security/Enviroments';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { PluginManager } from '../Core/PluginManager';
import { containerviewComponent } from '../Modules/NodeViewer/containerview.component';

@NgModule({
  declarations: [
    AppComponent,
    containerviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,

    //FIREBASE

    provideFirebaseApp(() => initializeApp(Environments.firebase)),
    // AngularFireDatabaseModule,
    // AngularFireStorageModule,
    // AngularFireAuthModule,
    provideAuth(() => getAuth())

  ],
  providers: [
    provideClientHydration(),
    PluginManager,
    // AngularFireDatabase,
    { provide: FIREBASE_OPTIONS, useValue: Environments.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
