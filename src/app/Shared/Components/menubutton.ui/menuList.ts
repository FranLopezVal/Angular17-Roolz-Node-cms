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

export class MenuList {
    public id: number = 0;
    public text: string = '';
    public icon?: string = '';
    public child?: MenuList[] = [];
    public levelChild: number = 0;
    public action = () => {};
}