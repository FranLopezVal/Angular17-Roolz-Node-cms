export module roolzPlugin {

    export interface PluginOptions {
        // Define aquí los argumentos que necesitará cada plugin en su constructor
        pluginVersion: string;
        pluginHash: string;
        pluginName: string;
        pluginDescription: string;

        requiredVersion: string;
    }

    export interface Plugin {
        // Define aquí la estructura que debe seguir cada plugin
        onLoad({ ...args }): void;
        onUnload({ ...args }): void;

        onInit({ ...args }): void;
        onChange({...args}): void;

        getInstance({...args}): any;
    }

    export abstract class PluginBase<T extends Plugin> {
        protected _pluginOptions: PluginOptions;
        constructor(options: PluginOptions) {
            this._pluginOptions = options;
        }
        get PluginOptions(): PluginOptions {
            return this._pluginOptions;
        }

        get PluginName(): string {
            return this._pluginOptions.pluginName;
        }
        get RequiredVersion(): string {
            return this._pluginOptions.requiredVersion;
        }
    }
}