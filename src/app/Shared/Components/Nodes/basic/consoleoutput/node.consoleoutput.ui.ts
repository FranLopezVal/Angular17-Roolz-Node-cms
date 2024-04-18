import { Component, ElementRef, ViewChild } from '@angular/core';
import { NodePrimigenUI } from '../../behaviours/primigen/node.primigen.ui';
import { NodeDataTransfer } from '../../../../../Core/Models/NodeDataTransfer.model';
import { SocketNodeUI } from '../../behaviours/socket/socket.node.ui';
import { containerviewComponent } from '../../../../../Modules/NodeViewer/containerview.component';

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

  public async GetValueExecution(): Promise<NodeDataTransfer<any>> {

    containerviewComponent.Instance?.InitExecutionTimer();

    const ndt = new NodeDataTransfer<any>(null);
    let ia;
    await this.input1?.currentConnector?.nodeA?.GetValueExecution().then((data) => ia = data.value);

    if (!ia) {
      containerviewComponent.Instance?.EndExecutionTimer();
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
    containerviewComponent.Instance?.EndExecutionTimer();
    return ndt;
  }

  private IsJsonObject(obj: any) {
    containerviewComponent.Instance?.EndExecutionTimer();
    return typeof obj === 'object' && obj !== null;
  }

}

