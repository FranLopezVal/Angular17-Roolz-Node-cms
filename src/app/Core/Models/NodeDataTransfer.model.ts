import { Type } from "@angular/core";

export class NodeDataTransfer<T> {
    public value: T | null = null;
    public type?: Type<T>;

    public hasError: boolean = false;

    constructor(value: T, type?: Type<T>) {
        this.value = value;
        this.type = type;
    }
}