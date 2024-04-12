import { UserCredential } from "firebase/auth";
import { roolzPlugin } from "../pluginBase";

export abstract class databaseBindingPlugin extends roolzPlugin.PluginBase<databaseBindingPlugin> implements roolzPlugin.Plugin {
    constructor() {
        super({
            pluginVersion: '1.0',
            pluginHash: 'dbBinding',
            pluginName: 'dbBinding',
            pluginDescription: 'Base class for database bindings',
            requiredVersion: '1.0'});
    }
    
    abstract getInstance({...args}): databaseBindingPlugin;
    
    abstract LoginUser(email: string, password: string): Promise<UserCredential>;
    abstract RegisterUser(email: string, password: string): Promise<UserCredential>;
    abstract LoginUserGoogle(): Promise<UserCredential>;
    abstract ValidateSession(user: UserCredential): boolean;
    abstract LogoutUser(): any;

    onLoad(): void {
        // Implement onLoad method
    }

    onUnload(): void {
        // Implement onUnload method
    }

    onInit(): void {
        // Implement onInit method
    }

    onChange(): void {
        // Implement onChange method
    }
}

export interface databaseFunctions {
    LoginUser(email: string, password: string): any;
    RegisterUser(email: string, password: string): any;
    LoginUserGoogle(): any;
    LogoutUser(): any;
}