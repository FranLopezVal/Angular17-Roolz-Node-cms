import { Component, ElementRef, ViewChild } from '@angular/core';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';
import { NodeDataTransfer } from '../../../../Core/Models/NodeDataTransfer.model';

@Component({
  selector: 'node-operator',
  templateUrl: './node.constant.ui.html'
})
export class NodeConstantUI extends NodePrimigenUI {

  @ViewChild('s1') output: ElementRef | null = null;
  @ViewChild('t_input') input: ElementRef<HTMLInputElement> | null = null;
  constructor(private el: ElementRef
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

  public override GetValueExecution(): NodeDataTransfer<any> {

    const val = this.input?.nativeElement.value || '';

    let ndt = new NodeDataTransfer<any>(null);
    if (val === 'true' || val === 'false') {
      ndt = new NodeDataTransfer<boolean>(val == 'true');
    } else if (!isNaN(Number(val))) {
      ndt = new NodeDataTransfer<number>(Number(val));
    } else {
      ndt = new NodeDataTransfer<string>(val);
    }

    return ndt;
  }

}

