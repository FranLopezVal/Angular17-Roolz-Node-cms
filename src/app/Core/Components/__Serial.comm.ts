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

import { Injectable } from "@angular/core";

export class SerialPort {
    private port: any;
    private options: {
        baudRate: number, parity: 'none' | 'even' | 'mark' | 'odd' | 'space',
        stopBits: number, handshake: string,
        dataBits: number, rtscts: boolean, xon: boolean, xoff: boolean, xany: boolean, bufferSize: number,
        autoOpen: boolean, lock: boolean, highWaterMark: number, flowControl: boolean
    } = {
            baudRate: 9600,
            parity: "none",
            stopBits: 1,
            handshake: "none",
            dataBits: 8,
            rtscts: false,
            xon: false,
            xoff: false,
            xany: false,
            bufferSize: 255,
            autoOpen: false,
            lock: false,
            highWaterMark: 64 * 1024,
            flowControl: false,
        };
    private writer: any;
    private readFunction: (arg: any)=>{};
    private controlCharacter: string = "\n";
    private reader: any;
    private readableStreamClosed: any;
    private writableStreamClosed: any;
    private keepReading: boolean = true;

    constructor(readFunction: (arg: any) => {}, options?: any, controlCharacter?: any) {
        this.readFunction = readFunction;
        if (options)
            this.options = options;
        if (controlCharacter)
            this.controlCharacter = controlCharacter;

    }

    public getPorts() {
        console.log("Getting ports");
        if ('serial' in navigator) {
            let nav: any = navigator;
            const ports = nav.serial.getPorts().then((data: any) => {
                console.log(data);
                return data;
            });
        } else {
            console.error("This browser does NOT support the Web Serial API");
            return null;
        }
        return null;
    }

    public async sendData(data: string) {
        await this.writer.write(data);
    }

    private async readLoop() {
        while (this.port.readable && this.keepReading) {
            const textDecoder = new TextDecoderStream();
            this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
            this.reader = textDecoder.readable
                .pipeThrough(new TransformStream(new LineBreakTransformer(this.controlCharacter)))
                .getReader();

            try {
                while (true) {
                    const { value, done } = await this.reader.read();
                    if (done) {
                        break;
                    }
                    if (value) {
                        this.readFunction(value);
                    }
                }
            } catch (error) {
                console.error("Read Loop error. Have the serial device been disconnected ? ");
            }
        }
    }
    public async close(callback: Function) {
        this.keepReading = false;
        this.reader.cancel();
        await this.readableStreamClosed.catch(() => { });
        this.writer.close();
        await this.writableStreamClosed;
        await this.port.close();
        callback(null);
    }

    public async connect(callback: Function) {
        this.keepReading = true;
        if ("serial" in navigator) {
            // The Web Serial API is supported by the browser.
            let nav: any = navigator;
            const ports = await nav.serial.getPorts();

            try {
                this.port = await nav.serial.requestPort();

            } catch (error) {
                console.error("Requesting port error: " + error);
                return;
            }

            try {
                await this.port.open(this.options);


            } catch (error) {
                console.error("Opening port error: " + error);
                return;
            }

            const textEncoder = new TextEncoderStream();
            this.writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
            this.writer = textEncoder.writable.getWriter();

            this.readLoop();

            callback(this.port);

        } else {
            console.error("This browser does NOT support the Web Serial API");
        }

    }
}

class LineBreakTransformer {
    container: any = "";
    private controlCharacter: string;

    constructor(controlCharacter: string) {
        this.container = '';
        this.controlCharacter = controlCharacter
    }

    transform(chunk: any, controller: any) {
        this.container += chunk;
        const lines = this.container.split(this.controlCharacter);
        this.container = lines.pop();
        lines.forEach((line: any) => controller.enqueue(line));
    }

    flush(controller: any) {
        controller.enqueue(this.container);
    }

}

@Injectable({
    providedIn: 'root'
})
export class SerialService {
    public serialPort: SerialPort | null = null;
    public async connect(callback: Function, readFunction: (arg: any) => {}, options?: any, controlCharacter?: any) {
        this.serialPort = new SerialPort(readFunction, options, controlCharacter);
        await this.serialPort.connect(callback);
    }
    public async sendData(data: string) {
        await this.serialPort?.sendData(data);
    }
    public async close(callback: Function) {
        await this.serialPort?.close(callback);
    }
}