
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PanelUI } from '../../../Shared/Components/panel.ui/panel.ui';
import { SessionService } from '../../../Core/Services/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mod-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
    
    @ViewChild('panel_',{static:true}) panel: PanelUI | null = null;
    Login: FormGroup = new FormGroup({});

    constructor(private session: SessionService, private route: Router) {
        session.EventOnLogin = () => {
            console.log('Login success');
            route.navigate(['/app']);
        }    
        this.Login = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });   
    }
    ngOnInit(): void {
        if (this.panel)         
            this.panel.Init(this.Login);
    }

    onClick_Login() {
        if (this.Login.valid) {
            this.session.LoginUser(this.Login.value.email, this.Login.value.password);
        }
    }
    onClick_LoginGoogle() {
        this.session.LoginUserGoogle();
    }

    get UserIsLogged(): boolean {
        return this.session.userIsLogged();
    }
}
