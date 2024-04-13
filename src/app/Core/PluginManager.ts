import { Injectable } from "@angular/core";
import { roolzPlugin } from "../Common/pluginBase";
import { databaseBindingPlugin } from "../Common/bindings/databaseBindingPlugin";
import { Auth } from "@angular/fire/auth";
import { HttpClient } from "@angular/common/http";
import { dbFirebase } from "../Plugins/firebasePlugin";
// import { FirebasePlugin } from "../Plugins/firebasePlugin";

@Injectable({
    providedIn: 'root',
})
export class PluginManager {

    private static state: 'loaded' | 'unloaded' | 'loading' = 'unloaded';

    private static plugins: roolzPlugin.PluginBase<any>[] = [];

    constructor(private http: HttpClient,
        private auth: Auth
    ) {
        this.loadDefaults();
    }

    private async loadDefaults(): Promise<void> {
        if (PluginManager.plugins?.length === 0 && PluginManager.state === 'unloaded') {
            PluginManager.state = 'loading';
            try {
            // const module = await import('app/Plugins/FirebasePlugin/FirebasePlugin'); //FIX: Fail in vercel
                const module = dbFirebase;
                const args = {
                    http: this.http,
                    auth: this.auth,
                };
                this.registerPlugin(module, args
                );

            }
            catch (error) {
                console.error('Error loading plugin:', error);
                return Promise.reject();
            }
            PluginManager.state = 'loaded';
            return Promise.resolve();
        } else {
            PluginManager.state = 'loaded';
            return Promise.resolve();
        }
        
    }


    // async loadPlugin(pluginPath: string, { ...instanceArgs }): Promise<any> {
    //     try {
    //         const module = await import(pluginPath);
    //         this.registerPlugin(module, {...instanceArgs});
    //     } catch (error) {
    //         console.error('Error loading plugin:', error);
    //     }
    // }

    registerPlugin(plugin: any, args: any): void {
        const instance = new plugin({...args});
        instance.onLoad();
        PluginManager.plugins.push(instance);
    }

    getPluginByName(name: string): Promise<roolzPlugin.PluginBase<databaseBindingPlugin | any> | any> {
        return this.loadDefaults().then(() => {
            const plugin = PluginManager.plugins.find(p => p.PluginName === name);
            return plugin || null;
        });
    }


    getPlugin<T extends roolzPlugin.PluginBase<any>>(type: () => T): Promise<T | null>{
        return this.loadDefaults().then(() => {
            const plugin = PluginManager.plugins?.find(p => p instanceof type);
            return plugin as T | null;
        });
    }
}