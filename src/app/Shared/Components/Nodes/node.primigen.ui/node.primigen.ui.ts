import { Component, ComponentRef, ElementRef, OnChanges, SimpleChanges, ViewContainerRef, inject } from '@angular/core';
import { containerviewComponent } from '../../../../Modules/Global/ContainerViews/containerview.component';

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
  protected ref: ElementRef | null = null;

  // Dragging nodes
  private dragging = false;
  private dragStart = { x: 0, y: 0 };

  private _position: {X:number, Y:number} = {X: 0, Y: 0};
  private _size: {W:number, H:number} = {W: 0, H: 0};

  public get Position(): {X:number, Y:number} {
    return this._position;
  }

  public get Size(): {W:number, H:number} {
    return this._size;
  }

  public set Position(value: {X:number, Y:number}) {
    this._position = value;
  }

  public set Size(value: {W:number, H:number}) {
    this._size = value;
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
  }

  public onMouseUp(): void {
    this.dragging = false;
  }

  public abstract NodeRepaint(): boolean;

  public abstract NodeUpdate(): boolean;

  public abstract NodeDelete(): boolean;

  public abstract NodeCreate(): boolean;

  public abstract NodeSelect(): boolean;

  public abstract NodeDeselect(): boolean;

}

