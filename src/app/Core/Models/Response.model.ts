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
