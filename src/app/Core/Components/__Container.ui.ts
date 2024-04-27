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

import { Directive } from "@angular/core";
import { AbstractControl, FormGroup, NgForm } from "@angular/forms";


declare module "@angular/forms" {
    interface NgForm {
        getAllControls(): AbstractControl[];
    }
  }
  
  NgForm.prototype.getAllControls = function(this:NgForm) {
    let controls : AbstractControl[] = [];
    for(const field in this.form.controls) {
        const control = this.form.get(field);
        if(control) 
        controls.push(control);
    }
    return controls;
}

@Directive()
  export abstract class __ContainerUI {
  
        protected _Form: NgForm | null = null;
        protected _childerns: AbstractControl<any,any>[] | null = null;

        constructor() {
        }

        public Init(_formGroup: FormGroup) {
            this._Form = new NgForm([], []);
            this._Form.form = _formGroup;
            this._childerns = this._Form.getAllControls();
        }  
  }