import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ConnectionUI } from '../connection.node.ui/connection.node.ui';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';

@Component({
  selector: 'ui-socket',
  templateUrl: './socket.node.ui.html'
})
export class SocketNodeUI implements AfterViewInit{

  private static TemplateConnector: ConnectionUI | null = null;

  @Input() type: string = 'text';
  @Input() position: 'left' | 'right' = 'left';

  @Input() parentNode: NodePrimigenUI | null = null;
  public currentConnector: ConnectionUI | null = null;
  
  @ViewChild('_content', { read: ViewContainerRef }) public Content: ViewContainerRef | null = null;

  constructor(private ref: ChangeDetectorRef
    , public el: ElementRef
  ) {
  }

  public onClick(event: MouseEvent ): void {
    if (this.parentNode === null) {
      console.error('parentNode is null');
      return;
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

  private CreateConnection(connection: Type<ConnectionUI>,event: MouseEvent): void {
    if (SocketNodeUI.TemplateConnector === null) {
      this.Content?.clear();
    if (this.Content == null || this.parentNode == null) return;

    const compRef = this.Content.createComponent<ConnectionUI>(connection);
    compRef.location.nativeElement.style.position = 'absolute';
    compRef.location.nativeElement.style.display = 'none';
    compRef.instance.setNodeA(this.parentNode,this);

    SocketNodeUI.TemplateConnector = compRef.instance;

    } else {
      if (this.parentNode == null){
        // destroy connection
        this.Content?.clear();
        return;
      }
      SocketNodeUI.TemplateConnector.setNodeB(this.parentNode,this);
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


  ngAfterViewInit(): void {
  }

  public get getStyle(): string {
    return `socket-sock ${this.position} type-${this.type}`;
  }
}

