import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { __ContainerUI } from '../../../Core/Components/__Container.ui';

@Component({
  selector: 'ui-panel',
  templateUrl: './panel.ui.html'
})
export class PanelUI extends __ContainerUI {
    @Input() titlePanel?: string | null = null;
    @Input() minimizable?: boolean = false;
    @Input() maximizable?: boolean = false;
    @Input() closable?: boolean = false;
    @Input() toggleable?: boolean = false;

    constructor() {
        super();
    }

    public get _ref_form() {return this._Form};
    public get _ref_childrens() {return this._childerns};
}

