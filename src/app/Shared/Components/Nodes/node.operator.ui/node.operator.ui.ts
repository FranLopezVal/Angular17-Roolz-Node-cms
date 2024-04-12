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

  @ViewChild('s1') input1: SocketNodeUI | null = null;
  @ViewChild('s2') input2: SocketNodeUI | null = null;
  @ViewChild('s3') output: SocketNodeUI | null = null;


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
    
    if (ia.value === null || ib.value === null) return new NodeDataTransfer<any>(null);
    this.result = ia.value + ib.value;
    
    this.onMouseUp(new MouseEvent('mouseup')); // simulate mouse up event for redraw connections

    return new NodeDataTransfer<typeof ia.value>(this.result);
  }
}

