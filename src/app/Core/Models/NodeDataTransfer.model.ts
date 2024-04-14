import { Type } from "@angular/core";

export class NodeDataTransfer<T> {
    public value: T | null = null;

    public hasError: boolean = false;

    constructor(value: T) {
        this.value = value;
    }
}