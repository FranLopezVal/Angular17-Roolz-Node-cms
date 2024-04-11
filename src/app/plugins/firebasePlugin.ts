import { HttpClient } from "@angular/common/http";
import { databaseBindingPlugin, databaseFunctions } from "../Common/bases/databaseBindingPlugin";
import {
    Auth, UserCredential, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider    
} from '@angular/fire/auth';
import { roolzPlugin } from "../Common/pluginBase";

export module FirebasePlugin {

    export class dbFirebase extends roolzPlugin.PluginBase<databaseBindingPlugin> implements databaseFunctions {
        constructor(private args?: any,
            private http?: HttpClient,
            private auth?: Auth) {
            super(
                {
                    pluginVersion: '1.0',
                    pluginHash: 'dbFirebase',
                    pluginName: 'dbFirebase',
                    pluginDescription: 'Firebase database binding',
                    requiredVersion: '1.0'
                }
            );
            if (args) {
                this.http = args.http;
                this.auth = args.auth;
            }
        }

        static getInstance(http: HttpClient | null, auth: Auth | null):() => dbFirebase {
            return () => new dbFirebase(null, http!, auth!);
        }

        public RegisterUser(email: string, password: string): Promise<UserCredential> {
            return createUserWithEmailAndPassword(this.auth!, email, password).then((response) => {
                return response;
            });
        }

        public LoginUser(email: string, password: string): Promise<UserCredential> {
            return signInWithEmailAndPassword(this.auth!, email, password).then((response) => {
                return response;
            });
        }

        public LoginUserGoogle(): Promise<UserCredential> {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(this.auth!, provider).then((response) => {
                return response;
            });
        }

        public ValidateSession(user: UserCredential): boolean {
            return user !== null;
        }

        public LogoutUser(): Promise<any> {
            return signOut(this.auth!);
        }

        public onLoad(): void {
            console.log('Firebase plugin loaded');
        }

        public onUnload(): void {
            console.log('Firebase plugin unloaded');
        }

        public onInit(): void {
            console.log('Firebase plugin initialized');
        }

        public onChange(): void {
            console.log('Firebase plugin changed');
        }
    }
}