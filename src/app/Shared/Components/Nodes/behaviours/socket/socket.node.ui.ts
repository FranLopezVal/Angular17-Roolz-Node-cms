import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ConnectionUI } from '../connection/connection.node.ui';
import { NodePrimigenUI } from '../primigen/node.primigen.ui';

@Component({
  selector: 'ui-socket',
  templateUrl: './socket.node.ui.html'
})
export class SocketNodeUI implements AfterViewInit, OnDestroy {

  private static TemplateConnector: ConnectionUI | null = null;

  @Input() type: string = 'text';
  @Input() position: 'left' | 'right' = 'left';

  @Input() parentNode: NodePrimigenUI | null = null;
  public currentConnector: ConnectionUI | null = null;
  public refConnector: ComponentRef<ConnectionUI> | null = null;

  @ViewChild('_content', { read: ViewContainerRef }) public Content: ViewContainerRef | null = null;

  constructor(private ref: ChangeDetectorRef
    , public el: ElementRef
  ) {
  }

  public onClick(event: MouseEvent): void {
    if (this.parentNode === null) {
      console.error('parentNode is null');
      return;
    }
    if (this.currentConnector) {
      this.removeConnection();
    }

    if (SocketNodeUI.TemplateConnector === null) {
      if (this.position === 'right') {
        this.CreateConnection(ConnectionUI, event);
      }
    } else {
      if (this.position === 'left') {

        this.CreateConnection(ConnectionUI, event);
      }
    }
  }

  private CreateConnection(connection: Type<ConnectionUI>, event: MouseEvent): void {

    if (this.currentConnector) {
      this.removeConnection();
    }

    if (SocketNodeUI.TemplateConnector === null) {
      this.Content?.clear();
      if (this.Content == null || this.parentNode == null) return;

      const compRef = this.Content.createComponent<ConnectionUI>(connection);
      compRef.location.nativeElement.style.position = 'absolute';
      compRef.location.nativeElement.style.display = 'none';
      compRef.instance.setNodeA(this.parentNode, this);

      this.refConnector = compRef;

      SocketNodeUI.TemplateConnector = compRef.instance;

    } else {
      if (this.parentNode == null) {
        // destroy connection
        this.Content?.clear();
        return;
      }
      SocketNodeUI.TemplateConnector.setNodeB(this.parentNode, this);
      SocketNodeUI.TemplateConnector.DrawConnection();

      this.currentConnector = SocketNodeUI.TemplateConnector;
      this.parentNode.EventOnMove.subscribe((_ev) => {
        this.currentConnector?.DrawConnection();
      });
      this.currentConnector.socketA?.parentNode?.EventOnMove.subscribe((_ev) => {
        this.currentConnector?.DrawConnection();
      });

      SocketNodeUI.TemplateConnector = null;
    }
  }

  ngOnDestroy(): void {
    this.removeConnection();
  }


  removeConnection(): void {

    if (this.currentConnector !== null) {// remove connection data and angular component
      this.currentConnector.socketA?.refConnector?.destroy();
      this.Content?.clear();
      this.currentConnector = null;
      // SocketNodeUI.TemplateConnector = null;

      this.refConnector = null;
    }

  }


  ngAfterViewInit(): void {
  }

  public get getStyle(): string {
    return `socket-sock ${this.position} type-${this.type}`;
  }
}

