import { Component, ElementRef, ViewChild } from '@angular/core';
import { NodePrimigenUI } from '../behaviours/primigen/node.primigen.ui';
import { NodeDataTransfer } from '../../../../Core/Models/NodeDataTransfer.model';
import { SocketNodeUI } from '../behaviours/socket/socket.node.ui';

@Component({
  selector: 'node-consoleoutput',
  templateUrl: './node.consoleoutput.ui.html'
})
export class NodeConsoleOutputUI extends NodePrimigenUI {

  @ViewChild('s1') input1: SocketNodeUI | null = null;

  @ViewChild('outarea') outArea: ElementRef<HTMLTextAreaElement> | null = null;

  @ViewChild('isJson') isJson: ElementRef<HTMLInputElement> | null = null;
  @ViewChild('isConsole') isConsole: ElementRef<HTMLInputElement> | null = null;

  constructor(private el: ElementRef
  ) {
    super();
    this.ref = el;
    this.el.nativeElement.classList.add('node');
  }

  public override NodeRepaint(): boolean {
    this.cpm?.changeDetectorRef.detectChanges();
    this.onMouseUp(new MouseEvent('mouseup'));
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

    const ndt = new NodeDataTransfer<any>(null);
    const ia = this.input1?.currentConnector?.nodeA?.GetValueExecution().value || null;

    if (!ia) {
      return ndt;
    }
    if (this.isJson?.nativeElement.checked && this.IsJsonObject(ia)) {
      ndt.value = JSON.stringify(ia, null, 2);
    } else {
      if (this.isJson)this.isJson.nativeElement.checked = false;
      ndt.value = ia;
    }
    if (this.isConsole?.nativeElement.checked) {
      console.log(ndt.value);
    }

    if (this.outArea?.nativeElement) {
    this.outArea.nativeElement.value = ia;
    }
    return ndt;
  }

  private IsJsonObject(obj : any) {
    return typeof obj === 'object' && obj !== null;
  }

}

