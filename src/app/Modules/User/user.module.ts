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
