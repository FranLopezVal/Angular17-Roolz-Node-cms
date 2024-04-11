import { AfterViewInit, Component, ComponentRef, ElementRef, Renderer2, inject } from '@angular/core';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';

@Component({
  selector: 'node-operator',
  templateUrl: './node.constant.ui.html'
})
export class NodeConstantUI extends NodePrimigenUI {

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
}

