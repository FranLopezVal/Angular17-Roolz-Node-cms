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

export class ResponseModel<T> {
    
    public data: T | null;
    public message?: Message | null;
    
    constructor(data: T | null, message?: Message | null) {
        this.data = data;
        this.message = message;
    }
}

export class Message {
    public message: string;
    public type: MessageType;
    
    constructor(message: string, type: MessageType) {
        this.message = message;
        this.type = type;
    }
}

export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}
