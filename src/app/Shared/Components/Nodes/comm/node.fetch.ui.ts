import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NodePrimigenUI } from '../behaviours/primigen/node.primigen.ui';
import { SocketNodeUI } from '../behaviours/socket/socket.node.ui';
import { NodeDataTransfer } from '../../../../Core/Models/NodeDataTransfer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'node-fetch',
    templateUrl: './node.fetch.ui.html'
})
export class NodeFetchUI extends NodePrimigenUI {

    private http: HttpClient = inject(HttpClient);

    @Input() typeNodeA: string = 'text';
    @Input() typeNodeB: string = 'text';
    @Input() typeNodeOut: string = 'text';

    @ViewChild('s1') input1: SocketNodeUI | null = null;
    @ViewChild('s2') input2: SocketNodeUI | null = null;
    @ViewChild('s3') output: SocketNodeUI | null = null;

    @ViewChild('t_method') method: ElementRef<HTMLSelectElement> | null = null;
    @ViewChild('t_mode') mode: ElementRef<HTMLSelectElement> | null = null;
    @ViewChild('t_cache') cache: ElementRef<HTMLSelectElement> | null = null;

    constructor(private el: ElementRef,
    ) {
        super();
        this.ref = el;
        this.el.nativeElement.classList.add('node');
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

    public result: any = null;
    public async GetValueExecution(): Promise<NodeDataTransfer<any>> {
        let ia; 
        let ib;
        await this.input1?.currentConnector?.nodeA?.GetValueExecution().then((data) =>ia = data.value);
        await this.input2?.currentConnector?.nodeA?.GetValueExecution().then((data) =>ib = data.value);

        if (ia === null) {
            return new NodeDataTransfer<any>(null);
        }
        const URL = ia!;
        const method = this.method?.nativeElement.value || 'GET';
        // const mode = this.mode?.nativeElement.value || 'cors';
        // const cache = this.cache?.nativeElement.value || 'default';

        const headers = this.ConstructHeaders(ib!);


        if (method === 'GET') {
            await this.abstractFetch(URL, headers).then(
                (data: any) => {
                    console.log(data);
                    this.result = data;
                }
            ).catch((error: any) => {
                this.result = error;
            });            
        }
        this.onMouseUp(new MouseEvent('mouseup'));
        return new NodeDataTransfer<any>(this.result);
    }

    private ConstructHeaders(array: string[]): HttpHeaders {
        let headers = new HttpHeaders();
        if (Array.isArray(array))
            array.forEach((element) => {
                const [key, value] = element.split(':');
                headers = headers.append(key, value);
            });
        if (headers.keys().length === 0) {
            headers = headers.append('Content-Type', 'application/json');
        }
        return headers;
    }


    async abstractFetch(URL: string, httpHeaders: HttpHeaders): Promise<any> {
        return this.http.get<any>(URL,
            {
                headers: httpHeaders,
                observe: 'body',
                responseType: 'json',
            }
        ).toPromise();
    }

}

