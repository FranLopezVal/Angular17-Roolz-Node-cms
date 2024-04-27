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

import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NodePrimigenUI } from '../../behaviours/primigen/node.primigen.ui';
import { SocketNodeUI } from '../../behaviours/socket/socket.node.ui';
import { NodeDataTransfer } from '../../../../../Core/Models/NodeDataTransfer.model';
import { SerialPort, SerialService } from '../../../../../Core/Components/__Serial.comm';




@Component({
    selector: 'node-serial',
    templateUrl: './node.serial.ui.html'
})
export class NodeSerialhUI extends NodePrimigenUI {

    private serial: SerialService = inject(SerialService);

    public Ports: { id: string, name: string }[] = [];

    @Input() typeNodeA: string = 'text';
    @Input() typeNodeB: string = 'text';
    @Input() typeNodeOut: string = 'text';

    @ViewChild('s1') input1: SocketNodeUI | null = null;
    @ViewChild('s2') input2: SocketNodeUI | null = null;
    @ViewChild('s3') output: SocketNodeUI | null = null;

    @ViewChild('t_baudrate') baudrate: ElementRef<HTMLSelectElement> | null = null;
    @ViewChild('t_parity') parity: ElementRef<HTMLSelectElement> | null = null;
    @ViewChild('t_stopbit') stopbit: ElementRef<HTMLSelectElement> | null = null;
    @ViewChild('t_handshake') handshake: ElementRef<HTMLSelectElement> | null = null;

    constructor(private el: ElementRef) {
        super();
        this.ref = el;
        this.el.nativeElement.classList.add('node');
        this.serial.serialPort = new SerialPort((arg: any): {} => {
            console.log(arg);
            return {};
        });
        this.readAllAvailablePorts();
    }

    public override NodeRepaint(): boolean {
        this.cpm?.changeDetectorRef.detectChanges();
        return true;
    }
    public override NodeUpdate(): boolean {
        throw new Error('Method not implemented.');
    }
    public override NodeDelete(): boolean {
        throw new Error('Method not implemented.');
    }
    public override NodeCreate(): boolean {
        throw new Error('Method not implemented.');
    }
    public override NodeSelect(): boolean {
        throw new Error('Method not implemented.');
    }
    public override NodeDeselect(): boolean {
        throw new Error('Method not implemented.');
    }

    private async readAllAvailablePorts() {
        
        this.Ports = await this.serial.serialPort?.getPorts() || [];
    }

    public getPorts() {
        return this.Ports;
    }

    public result: any = null;
    public async GetValueExecution(): Promise<NodeDataTransfer<any>> {
        let ia; 
        let ib;
        await this.input1?.currentConnector?.nodeA?.GetValueExecution().then((data) =>ia = data.value);
        await this.input2?.currentConnector?.nodeA?.GetValueExecution().then((data) =>ib = data.value);

        if (ia === null) {
            return new NodeDataTransfer<any>(null);
        }
        
        this.onMouseUp(new MouseEvent('mouseup'));
        return new NodeDataTransfer<any>(this.result);
    }
}

