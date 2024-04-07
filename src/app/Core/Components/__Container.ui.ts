import { Directive } from "@angular/core";
import { AfterContentInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup, NgForm } from "@angular/forms";


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