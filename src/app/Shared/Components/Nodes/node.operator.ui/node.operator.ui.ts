import { AfterViewInit, Component, ComponentRef, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';
import { SocketNodeUI } from '../socket.node.ui/socket.node.ui';
import { NodeDataTransfer } from '../../../../Core/Models/NodeDataTransfer.model';

@Component({
  selector: 'node-operator',
  templateUrl: './node.operator.ui.html'
})
export class NodeOperatorUI extends NodePrimigenUI{

  @Input() typeNodeA: string = 'text';
  @Input() typeNodeB: string = 'text';
  @Input() typeNodeOut: string = 'text';

  @ViewChild('s1') input1: SocketNodeUI | null = null;
  @ViewChild('s2') input2: SocketNodeUI | null = null;
  @ViewChild('s3') output: SocketNodeUI | null = null;

  @ViewChild('t_select') select: ElementRef<HTMLSelectElement> | null = null;

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
  public override GetValueExecution(): NodeDataTransfer<any> {
    const ia = this.input1?.currentConnector?.nodeA?.GetValueExecution() || null;
    const ib = this.input2?.currentConnector?.nodeA?.GetValueExecution() || null;

    const typeA = this.input1?.currentConnector?.socketA?.type || 'text';
    const typeB = this.input2?.currentConnector?.socketA?.type || 'text';

    this.typeNodeA = typeA;
    this.typeNodeB = typeB;

    // if (typeA == typeB) {
    //   this.typeNodeOut = typeA;
    // } else {
    //   this.typeNodeOut = 'text';
    // }    

    if (ia.value === null || ib.value === null) return new NodeDataTransfer<any>(null);
 
    if (typeof ia.value === 'number' && typeof ib.value === 'number') {
      this.result = this.operateNumber(ia.value, ib.value) as number;
    } else if (typeof ia.value === 'boolean' && typeof ib.value === 'boolean') {
      this.result = this.operateBoolean(ia.value, ib.value) as boolean;
    } else if (typeof ia.value === 'boolean' && typeof ib.value === 'number' || typeof ia.value === 'number' && typeof ib.value === 'boolean') {
      this.result = this.operateBoolean(!!ia.value, !!ib.value) as boolean;
    }
    else {
      this.result = this.operateString(ia.value, ib.value) as string;
    }

    if (typeof this.result === 'boolean') {
      this.typeNodeOut = 'checkbox';
    } else if (typeof this.result === 'number') {
      this.typeNodeOut = 'number';
    } else {
      this.typeNodeOut = 'text';
    }

    this.result = this.result.toString();
    this.onMouseUp(new MouseEvent('mouseup')); // simulate mouse up event for redraw connections
    return new NodeDataTransfer<typeof ia.value>(this.result);
  }

  public operateBoolean(a: boolean, b: boolean): boolean {
    const op = this.select?.nativeElement.value || '';
    switch (op) {
      case '==': return a == b;
      case '!=': return a != b;
      case '&': return a && b;
      case '|': return a || b;
      default: return false;
    }
  }


  public operateNumber(a: number, b: number): number {
    const op = this.select?.nativeElement.value || '';
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      case '%': return a % b;
      case '^': return Math.pow(a, b);
      case '==': return a == b ? 1 : 0;
      case '!=': return a != b ? 1 : 0;
      case '&': return a & b;
      case '|': return a | b;
      default: return 0;
    }
  }

  public operateString(a: any, b: any): string {
    const op = this.select?.nativeElement.value || '';
    switch (op) {
      case '+': return a + b;
      case '-': {
        const index = a.indexOf(b);
        if (index >= 0) {
          return a.slice(0, index) + a.slice(index + b.length);
        } else {
          return a;
        }
      }
      default: return '';
    }
  }
}

