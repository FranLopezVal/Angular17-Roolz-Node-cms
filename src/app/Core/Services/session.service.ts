import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    Auth, UserCredential
} from '@angular/fire/auth';
import { PluginManager } from "../PluginManager";
import { databaseBindingPlugin, databaseFunctions } from "../../Common/bases/databaseBindingPlugin";
import { STORAGE_SESSION_KEY } from "../Enums/Storage";
import { Router } from "@angular/router";
import { on } from "events";


@Injectable({
    providedIn: 'root',
})
export class SessionService implements databaseFunctions {

    private static _session: UserCredential | any | null = null;
    private static _targetPlugin: string = 'dbFirebase';

    EventOnLogin: () => void = () => { };

    constructor (private pm: PluginManager,
        private route: Router) 
    {
        // this.loadSession();
    }

    InitOnLoad(): void {
        this.loadSession();
        this.validateSession();
    }

    LoginUser(email: string, password: string) {
        this.pm.getPluginByName(SessionService._targetPlugin).then((plugin) => {
            return plugin?.LoginUser(email, password)
                .then((response: any) => {
                    SessionService._session = response;
                    this.saveSession();
                    this.EventOnLogin();
                    return response;
                })
                .catch((error: any) => {
                    return error;
                })
        });
    }

    RegisterUser(email: string, password: string) {
        this.pm.getPluginByName(SessionService._targetPlugin).then((plugin) => {
            return plugin?.RegisterUser(email, password)
                .then((response: any) => {
                    SessionService._session = response;
                    this.saveSession();
                    this.EventOnLogin();
                    return response;
                })
                .catch((error: any) => {
                    return error;
                })
        });
    }
    LoginUserGoogle() {
        this.pm.getPluginByName(SessionService._targetPlugin).then((plugin) => {
            return plugin?.LoginUserGoogle()
                .then((response: any) => {
                    SessionService._session = response;
                    this.saveSession();
                    this.EventOnLogin();
                    return response;
                })
                .catch((error: any) => {
                    return error;
                })
        });
    }

    LogoutUser() {
        this.pm.getPluginByName(SessionService._targetPlugin).then((plugin) => {
            return plugin?.LogoutUser()
                .then((response: any) => {
                    SessionService._session = response;
                    this.clearSession();
                    this.route.navigate(['/user/login']);
                    return response;
                })
                .catch((error: any) => {
                    return error;
                })
        });
    }

    public get currentSession(): UserCredential | null {
        return SessionService._session;
    }

    public userIsLogged(): boolean {
        return SessionService._session?.user ? true : false;
    }

    public loadSession(): void {
        const session = localStorage.getItem(STORAGE_SESSION_KEY);
        if (session) {
            SessionService._session = JSON.parse(session);
        }
    }

    public validateSession(): void {
        if (SessionService._session) {
            this.pm.getPluginByName(SessionService._targetPlugin).then((plugin) => {
                return plugin?.ValidateSession(SessionService._session)
                    .then((response: any) => {
                        return response;
                    })
                    .catch((error: any) => {
                        return error;
                    })
            });
        }
    }

    public saveSession(): void {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(SessionService._session));
    }

    public clearSession(): void {
        localStorage.removeItem(STORAGE_SESSION_KEY);
    }
}