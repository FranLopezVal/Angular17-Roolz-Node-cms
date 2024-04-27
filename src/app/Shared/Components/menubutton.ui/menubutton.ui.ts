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

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { __ContainerUI } from '../../../Core/Components/__Container.ui';
import { MenuList } from './menuList';

@Component({
  selector: 'ui-menubutton',
  templateUrl: './menubutton.ui.html'
})
export class ButtonMenuUI {

  @ViewChild('container') private _menu_container: ElementRef | null = null;

  @Input() _menuList?: MenuList[] = [];
  @Input() _isChild: boolean = false;
  @Input() currentMenu: MenuList | null = null;
  private _menuOpen: boolean = false;
  private static _backfaceOpen: boolean = false;

  public get MenuOpen(): boolean {
    return this._menuOpen;
  }

  public get BackfaceOpen(): boolean {
    return ButtonMenuUI._backfaceOpen;
  }

  public get MenuContent(): MenuList[] {
    return this._menuList!;
  }

  public get IsChild(): boolean {
    return this._isChild;
  }

  public get OffsetView(): string {
    //@ts-ignore
    return (this.currentMenu?.levelChild >= 0 ? this.currentMenu?.levelChild * 20 : 0).toString();
  }
  public get ShowBorder(): boolean {
  //@ts-ignore
    return !(this.currentMenu?.levelChild >= 0);
  }

  constructor() {
  }

  public onClick() {
    if (!this.IsChild || this._menuList?.length! > 0)
    {
      this._menuOpen = !this._menuOpen;
      ButtonMenuUI._backfaceOpen = true;
      }
    else {
      this.currentMenu!.action();
    }
  }

  public onBlur() {
    this._menuOpen = false;
    ButtonMenuUI._backfaceOpen = false;
  }

  public AddMenu(menu: MenuList) {
    // menu.levelChild = this._levelChild! + 1;
    if (!this._menuList) {
      this._menuList = [];
    }
    this._menuList.push(menu);
  }
}

