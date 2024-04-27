/**
 * CopyRight (C) 2024 Francisco Lopez
 * Proyecto de Git: https://github.com/FranLopezVal
 * Creado como parte de portafolio de Francisco.
 * 
 * Si usas este código por favor respeta los derechos de autor. (da crédito al autor :D)
 * Este proyecto es de uso libre para fines educativos.
 * 
 * Os quiero mucho.
 */

import { AfterViewInit, Component, ComponentRef, ElementRef, Input, Renderer2, ViewChild, inject } from '@angular/core';
import { NodePrimigenUI } from '../../behaviours/primigen/node.primigen.ui';
import { SocketNodeUI } from '../../behaviours/socket/socket.node.ui';
import { NodeDataTransfer } from '../../../../../Core/Models/NodeDataTransfer.model';

@Component({
  selector: 'node-arrayoperator',
  templateUrl: './node.arrayoperator.ui.html'
})
export class NodeArrayOperatorUI extends NodePrimigenUI {

  @Input() typeNodeA: string = 'text';
  @Input() typeNodeB: string = 'text';
  @Input() typeNodeOut: string = 'text';

  @ViewChild('s1') input1: SocketNodeUI | null = null;
  @ViewChild('s2') input2: SocketNodeUI | null = null;
  @ViewChild('s3') output: SocketNodeUI | null = null;

  @ViewChild('t_select') select: ElementRef<HTMLSelectElement> | null = null;

  requireA: string = 'array';
  requireB: string = 'array';

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

  public onChange_function($event: any) {
    const value = $event.target.value;
    if (!this.output) return;
    switch (value) {
      case 'Concat':
        this.requireA = 'array';
        this.requireB = 'array';
        this.output.type = 'text';
        break;
      case 'DeleteAt':
        this.requireA = 'array';
        this.requireB = 'number';
        this.output.type = 'text';
        break;
      case 'Reverse':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'text';
        break;
      case 'Sort':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'text';
        break;
      case 'Filter':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'text';
        break;
      case 'Map':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'text';
        break;
      case 'Find':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'text';
        break;
      case 'Slice':
        this.requireA = 'array';
        this.requireB = 'number';
        this.output.type = 'text';
        break;
      case 'Shift':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'text';
        break;
      case 'Fill':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'text';
        break;
      case 'SumAll':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'number';
        break;
      case 'Average':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'number';
        break;
      case 'Min':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'number';
        break;
      case 'Max':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'number';
        break;
      case 'Count':
        this.requireA = 'array';
        this.requireB = 'none';
        this.output.type = 'number';
        break;
      case 'FindIndex':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'number';
        break;
      case 'Unshift':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'number';
        break;
      case 'Includes':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'checkbox';
        break;
      case 'ContainsInElement':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'checkbox';
        break;
      case 'Every':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'checkbox';
        break;
      case 'Join':
        this.requireA = 'array';
        this.requireB = 'string';
        this.output.type = 'text';
        break;
      default:
        this.requireA = 'undefined';
        this.requireB = 'undefined';
        this.output.type = 'text';
        break;
    }

    if (this.input2) {

      if (this.requireB === 'none') {
        this.input2.type = 'unknown';
      } else if (this.requireB === 'array') {
        this.input2.type = 'text';
      } else if (this.requireB === 'number') {
        this.input2.type = 'number';
      } else if (this.requireB === 'string') {
        this.input2.type = 'text';
      } else {
        this.input2.type = 'unknown';
      }
    }

    this.NodeRepaint();
  }

  public result: any = null;

  public async GetValueExecution(): Promise<NodeDataTransfer<any>> {
    let ia;
    let ib;
    await this.input1?.currentConnector?.nodeA?.GetValueExecution().then((data) => ia = data.value);
    await this.input2?.currentConnector?.nodeA?.GetValueExecution().then((data) => ib = data.value);

    const ndt = new NodeDataTransfer<any>(null);
    if (ia === null) {
      return ndt;
    }

    if (!Array.isArray(ia)) {
      return ndt;
    }

    if (typeof ib === 'number') {
      switch (this.select?.nativeElement.value) {
        case 'DeleteAt':
          this.result = this.DelteAt(ia, ib);
          break;
        default:
          this.result = null;
          break;
      }
    } else if (typeof ib === 'string') {
      switch (this.select?.nativeElement.value) {
        case 'Filter':
          this.result = this.Filter(ia, ib);
          break;
        case 'Map':
          this.result = this.Map(ia, ib);
          break;
        case 'Find':
          this.result = this.Find(ia, ib);
          break;
        case 'Slice':
          this.result = this.Slice(ia, 0, parseInt(ib));
          break;
        case 'Fill':
          this.result = this.Fill(ia, ib);
          break;
        case 'FindIndex':
          this.result = this.FindIndex(ia, ib);
          break;
        case 'Includes':
          this.result = this.Includes(ia, ib);
          break;
        case 'ContainsInElement':
          this.result = this.ContainsInElement(ia, ib);
          break;
        case 'Every':
          this.result = this.Every(ia, ib);
          break;
        case 'Join':
          this.result = this.Join(ia, ib);
          break;
        default:
          this.result = null;
          break;
      }
    } else {
      switch (this.select?.nativeElement.value) {
        case 'Concat':
          this.result = this.Concat(ia, ib!);
          break;
        case 'Reverse':
          this.result = this.Reverse(ia);
          break;
        case 'Sort':
          this.result = this.Sort(ia);
          break;
        case 'Shift':
          this.result = this.Shift(ia);
          break;
        case 'SumAll':
          this.result = this.SumAll(ia);
          break;
        case 'Average':
          this.result = this.Average(ia);
          break;
        case 'Min':
          this.result = this.Min(ia);
          break;
        case 'Max':
          this.result = this.Max(ia);
          break;
        case 'Count':
          this.result = this.Count(ia);
          break;
        default:
          this.result = null;
          break;
      }
    }

    // en este caso, si sigue null result, es porque no se ha encontrado la operacion
    // y aqui entran las operaciones en las que el segundo argumento es any
    if (this.result === null) {
      switch (this.select?.nativeElement.value) {
        case 'Unshift':
          this.result = this.Unshift(ia, ib);
          break;
        default:
          this.result = null;
          break;
      }
    }
    if (this.result === undefined || this.result === '') {
      this.result = null;
    }

    ndt.value = this.result;
    console.log(ndt.value);
    this.onMouseUp(new MouseEvent('mouseup')); // simulate mouse up event for redraw connections
    return ndt;
  }

  //#region Array Operations
  //ARAAY RETURNS
  public Concat(arrayA: any[], arrayB: any[]): any[] {
    return arrayA.concat(arrayB);
  }

  public DelteAt(array: any[], index: number): any[] {
    array.splice(index, 1);
    return array;
  }

  public Reverse(array: any[]): any[] {
    return array.reverse();
  }

  public Sort(array: any[]): any[] {
    return array.sort();
  }

  public Filter(array: any[], filter: string): any[] {
    return array.filter((a) => a === filter);
  }

  public Map(array: any[], map: string): any[] {
    return array.map((a) => a === map);
  }

  public Find(array: any[], find: string): any[] {
    return array.find((a) => a === find);
  }

  public Slice(array: any[], start: number, end: number): any[] {
    return array.slice(start, end);
  }

  // public Splice(array: any[], start: number, deleteCount: number): any[] {
  //   return array.splice(start, deleteCount);
  // }

  public Shift(array: any[]): any[] {
    return array.shift();
  }

  public Fill(array: any[], value: any): any[] {
    return array.fill(value);
  }

  //NUMBER RETURNS
  public SumAll(array: any[]): number {

    if (this.input1?.currentConnector?.socketA?.type === 'number') {
      return array.reduce((a, b) => Number(a) + Number(b), 0);
    } else
    return array.reduce((a, b) => {
        return a + b;
    }, 0);
  }

  public Average(array: any[]): number {
    return array.reduce((a, b) => a + b, 0) / array.length;
  }

  public Min(array: any[]): number {
    return Math.min(...array);
  }

  public Max(array: any[]): number {
    return Math.max(...array);
  }

  public Count(array: any[]): number {
    return array.length;
  }

  public FindIndex(array: any[], find: string): number {
    return array.findIndex((a) => a === find);
  }

  public Unshift(array: any[], element: any): number {
    return array.unshift(element);
  }

  public Includes(array: any[], find: string): boolean {
    return array.includes(find);
  }

  public ContainsInElement(array: any[], find: string): boolean {
    return array.some((a) => a.includes(find));
  }

  public Every(array: any[], find: string): boolean {
    return array.every((a) => a === find);
  }

  public Join(array: any[], separator: string): string {
    return array.join(separator);
  }

  public Split(data: string, separator: string): any[] { //not here, move to string operator
    return data.split(separator);
  }

  //#endregion
}