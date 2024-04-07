
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PanelUI } from '../../../Shared/Components/panel.ui/panel.ui';

@Component({
    selector: 'mod-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
    
    @ViewChild('panel_',{static:true}) panel: PanelUI | null = null;
    Login: FormGroup = new FormGroup({});

    constructor() {
        this.Login = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });   
    }
    ngOnInit(): void {
        if (this.panel)         
            this.panel.Init(this.Login);
    }
}
