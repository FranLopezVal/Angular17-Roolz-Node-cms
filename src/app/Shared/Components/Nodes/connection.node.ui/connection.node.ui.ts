import { Component } from '@angular/core';
import { containerviewComponent } from '../../../../Modules/Global/ContainerViews/containerview.component';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';

@Component({
  selector: 'dynamic',
  templateUrl: './connection.node.ui.html'
})
export class ConnectionUI {
  // protected _container: containerviewComponent | null = null;

  private nodeA: NodePrimigenUI | null = null; // Is parent
  private nodeB: NodePrimigenUI | null = null;

  private socketIdA: number = 0;
  private socketIdB: number = 0;

  /* En principio este objeto sera hijo de nodeA, 
    nodeB solo lo reciviremos para saber donde está el socket donde conectar
  */
  constructor() {
  }

  public setNodeA(node: NodePrimigenUI, socketId: number) {
    this.nodeA = node;
    this.socketIdA = socketId;
  }

  public setNodeB(node: NodePrimigenUI, socketId: number) {
    this.nodeB = node;
    this.socketIdB = socketId;
  }

  public getNodeA(): NodePrimigenUI | null {
    return this.nodeA;
  }

  public getNodeB(): NodePrimigenUI | null {
    return this.nodeB;
  }

  public ConnectionUpdate() {
    if (this.nodeA && this.nodeB) {
      this.nodeA.NodeUpdate();
      this.nodeB.NodeUpdate();
    }
  }
}

