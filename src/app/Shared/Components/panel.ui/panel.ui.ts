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

import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { __ContainerUI } from '../../../Core/Components/__Container.ui';

@Component({
  selector: 'ui-panel',
  templateUrl: './panel.ui.html'
})
export class PanelUI extends __ContainerUI implements AfterViewInit, OnChanges {
    @Input() titlePanel?: string | null = null;
    @Input() minimizable?: boolean = false;
    @Input() closable?: boolean = false;
    @Input() toggleable?: boolean = false;
    @Input() expandable?: boolean = false;

    private _width: number = 0;
    private _height: number = 0;
    private _x: number = 0;
    private _y: number = 0;

  @ViewChild('__idPanel',{static:true}) private _pnl: ElementRef | undefined;

    constructor() {
      super();
    }

    ngAfterViewInit() {
      this._width = this._pnl?.nativeElement.offsetWidth;
      this._height = this._pnl?.nativeElement.offsetHeight;

      this._x = this._pnl?.nativeElement.offsetLeft;
      this._y = this._pnl?.nativeElement.offsetTop;
    }

    ngOnChanges(changes: SimpleChanges): void {      
      this._width = this._pnl?.nativeElement.offsetWidth;
      this._height = this._pnl?.nativeElement.offsetHeight;

      this._x = this._pnl?.nativeElement.offsetLeft;
      this._y = this._pnl?.nativeElement.offsetTop;
    }

    // ...
    public get _ref_form() {return this._Form};
    public get _ref_childrens() {return this._childerns};
}

