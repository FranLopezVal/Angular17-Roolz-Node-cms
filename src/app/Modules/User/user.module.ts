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
import { LoginComponent } from './Login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../Shared/shared.module';


@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule
    ],
    exports: [
    ],
    declarations: [
        LoginComponent
    ]
})
export class UserModule { }
