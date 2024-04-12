import { AfterViewInit, Component, ComponentRef, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';

@Component({
  selector: 'node-operator',
  templateUrl: './node.operator.ui.html'
})
export class NodeOperatorUI extends NodePrimigenUI{

  @Input() typeNodeA: string = 'text';

  @ViewChild('s1') input1: ElementRef | null = null;
  @ViewChild('s2') input2: ElementRef | null = null;
  @ViewChild('s3') output: ElementRef | null = null;


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
  public override GetNodeSocket(id: number): ElementRef | null{
    if (id === 0) {
      return this.output;
    }
    if (id === 1) {
      return this.input1;
    }
    if (id === 2) {
      return this.input2;
    }
    return null;
  }
}

