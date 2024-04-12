import { Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { containerviewComponent } from '../../../../Modules/NodeViewer/containerview.component';
import { NodePrimigenUI } from '../node.primigen.ui/node.primigen.ui';
import { SocketNodeUI } from '../socket.node.ui/socket.node.ui';
import { Console } from 'console';

@Component({
  selector: 'dynamic',
  templateUrl: './connection.node.ui.html'
})
export class ConnectionUI  {
  
  @ViewChild('svgContainer', { static: true }) svgContainer?: ElementRef<SVGElement>;

  // protected _container: containerviewComponent | null = null;

  private nodeA: NodePrimigenUI | null = null; // Is parent
  private nodeB: NodePrimigenUI | null = null;

  public socketA?: SocketNodeUI;
  public socketB?: SocketNodeUI;

  /* En principio este objeto sera hijo de nodeA, 
    nodeB solo lo reciviremos para saber donde está el socket donde conectar
  */
  constructor(private el: ElementRef) {
  }

  public getBoundingBoxOfNodes() {
    if (this.nodeA && this.nodeB) {
      
      const as = this.nodeA.Size;
      const ap = this.nodeA.Position;
      const bs = this.nodeB.Size;
      const bp = this.nodeB.Position;
      
      let x = 0;
      let y = 0;
      let w = 0;
      let h = 0;

      if (ap.X >= bp.X) {
        x = ap.X;
        w = ap.X + as.W - bp.X;
      } else {
        x = bp.X;
        w = bp.X + bs.W - ap.X;
      }
      if (ap.Y >= bp.Y) {
        y = bp.Y;
        h = ap.Y + as.H - bp.Y;
      } else {
        y = ap.Y;
        h = bp.Y + bs.H - ap.Y;
      }
      return { x, y, w, h };
    }
    return { x: 0, y: 0, w: 0, h: 0 };
  }


  public setNodeA(node: NodePrimigenUI, socket: SocketNodeUI) {
    this.nodeA = node;
    this.socketA = socket;
  }

  public setNodeB(node: NodePrimigenUI, socket: SocketNodeUI) {
    this.nodeB = node;
    this.socketB = socket;
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

  public DrawConnection() {
    if (!this.nodeA && !this.nodeB && !this.svgContainer) {
      return;
    }
    this.el.nativeElement.style.display = 'block';
    // this.el.nativeElement.style.pointerevents = 'none';
    this.el.nativeElement.style.top = '0';
    this.el.nativeElement.style.left = '0';
    const svg = this.svgContainer?.nativeElement;

    if (!svg) {
      return;
    }

    //clear all svg children
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const posX_socketA = this.socketA?.el.nativeElement.getBoundingClientRect().left;
    const posY_socketA = this.socketA?.el.nativeElement.getBoundingClientRect().top;

    const posX_socketB = this.socketB?.el.nativeElement.getBoundingClientRect().left;
    const posY_socketB = this.socketB?.el.nativeElement.getBoundingClientRect().top;

    let a = { x: posX_socketA || 0, y: posY_socketA || 0 };
    let b = { x: posX_socketB || 0, y: posY_socketB || 0 };

    let fixtop = 0;
    if (b.y < a.y) {
      fixtop = -(a.y-b.y);
      // a.y = a.y + fixtop;
    }

    svg.style.position = 'absolute';
    // svg.style.top = '5px';
    // svg.style.left = '12px';

    const positionSvg = this.el.nativeElement.getBoundingClientRect();
    a = { x: a.x - positionSvg.left, y: a.y - positionSvg.top };
    a = { x: a.x + 16, y: a.y + 8};
    b = { x: b.x - positionSvg.left, y: b.y - positionSvg.top };
    b.y = b.y + 8;
    // b = { x: b.x - 12, y: b.y +2};

    const points = [[a.x, a.y - fixtop], [b.x, b.y - fixtop]]; // Puntos inicial y final

    // Calcular los puntos de control para la spline
    const controlPoints = this.calculateControlPoints(points[0], points[1]);

    // Dibujar la spline en el SVG
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'steelblue');
    path.setAttribute('stroke-width', '2');

    const d = `M${points[0][0]},${points[0][1]} C${controlPoints[0][0]},${controlPoints[0][1]} ${controlPoints[1][0]},${controlPoints[1][1]} ${points[1][0]},${points[1][1]}`;
    path.setAttribute('d', d);
    svg.appendChild(path);
    this.svgResizeToBoundingBox(fixtop);
  }

  svgResizeToBoundingBox(fixTop = 0) {
    if (this.svgContainer) {
      const svg = this.svgContainer.nativeElement;
      const bbox = this.getBoundingBoxOfNodes();

      svg.style.top = `${fixTop}px`;

      svg.setAttribute('width', `${bbox.w}`);
      svg.setAttribute('height', `${bbox.h}`);
    }
  }

  svgResizeToBezierCurve(path: SVGPathElement) {
    if (this.svgContainer) {
      const svg = this.svgContainer.nativeElement;
      const bbox = path.getBBox();
      const Contentbbox = this.getBoundingBoxOfNodes();
      console.log(Contentbbox);

      svg.setAttribute('width', `${bbox.width +10}`);
      svg.setAttribute('height', `${bbox.height +10}`);
    }
  }

  calculateControlPoints(startPoint: number[], endPoint: number[]): number[][] {
    const controlPoint1 = [
      startPoint[0] + (endPoint[0] - startPoint[0]) / 3,
      startPoint[1]
    ];
    const controlPoint2 = [
      endPoint[0] - (endPoint[0] - startPoint[0]) / 3,
      endPoint[1]
    ];
    return [controlPoint1, controlPoint2];
  }
}

