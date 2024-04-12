import { Component, ComponentRef, ElementRef, Output, ViewContainerRef, inject, EventEmitter } from '@angular/core';
import { containerviewComponent } from '../../../../Modules/NodeViewer/containerview.component';

@Component({
  selector: 'dynamic',
  templateUrl: './node.primigen.ui.html'
})
export abstract class NodePrimigenUI {

  protected vcr = inject(ViewContainerRef);

  public _id: number = -1;
  public _name: string = '';
  protected _description: string = '';
  protected _icon: string = '';
  protected _color: string = '';

  public Data: any = null;
  protected _container: containerviewComponent | null = null;

  protected cpm: ComponentRef<any> | null = null;
  public ref: ElementRef | null = null;

  @Output() EventOnMove: EventEmitter<any> = new EventEmitter<any>();

  // Dragging nodes
  private dragging = false;
  private dragStart = { x: 0, y: 0 };

  private _position: {X:number, Y:number} = {X: 0, Y: 0};
  // private _size: {W:number, H:number} = {W: 0, H: 0};

  public get Position(): {X:number, Y:number} {
    return this._position;
  }

  public get Size(): { W: number, H: number } {
    const bounding = this.ref?.nativeElement.getBoundingClientRect();
    return { W: bounding?.width || 0, H: bounding?.height || 0};
  }

  public set Position(value: {X:number, Y:number}) {
    this._position = value;
  }

  constructor() {
  }

  public SetRef<T extends NodePrimigenUI>(cpm: ComponentRef<T>): NodePrimigenUI {
    this.cpm = cpm;
    this.ref = cpm.location;
    return this;
  }

  public MoveTo(x: number, y: number): void {
      this.Position = { X: x, Y: y };//@ts-ignore
      const nativeElement: HTMLElement = this.ref.nativeElement;
      // nativeElement.style.position = 'absolute';
      nativeElement.style.left = `${x}px`;
      nativeElement.style.top = `${y}px`;
  }

  public onMouseDown(event: MouseEvent): void {
    this.dragging = true;
    this.dragStart = { x: event.clientX, y: event.clientY };
  }

  public onMouseMove(event: MouseEvent): void {
    if (!this.dragging) {
      return;
    }

    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;

    this.MoveTo(this.Position.X + dx, this.Position.Y + dy);

    this.dragStart = { x: event.clientX, y: event.clientY };

      this.EventOnMove.emit(event);
  }

  public onMouseUp(event: MouseEvent): void {

    this.EventOnMove.emit(event);
    this.dragging = false;
  }

  public abstract NodeRepaint(): boolean;

  public abstract NodeUpdate(): boolean;

  public abstract NodeDelete(): boolean;

  public abstract NodeCreate(): boolean;

  public abstract NodeSelect(): boolean;

  public abstract NodeDeselect(): boolean;

  public abstract GetNodeSocket(id: number): ElementRef | null;

}

