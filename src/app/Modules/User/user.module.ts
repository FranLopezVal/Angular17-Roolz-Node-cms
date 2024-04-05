import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { LoginComponent } from './Login/login.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
    imports: [
        UserRoutingModule
    ],
    exports: [
    ],
    declarations: [
        LoginComponent
    ]
})
export class UserModule { }
