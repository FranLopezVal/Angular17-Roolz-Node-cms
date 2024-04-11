import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../MainComponent/app.component';
import { SharedModule } from '../../Shared/shared.module';

import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Environments } from './../../Core/Security/Enviroments';
import { SessionService } from '../../Core/Services/session.service';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { FirebaseApp, FirebaseApps, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PluginManager } from '../../Core/PluginManager';

@NgModule({
  declarations: [
    AppComponent
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
