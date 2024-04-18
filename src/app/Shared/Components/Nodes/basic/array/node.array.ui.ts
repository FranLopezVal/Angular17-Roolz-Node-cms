import { Component, ElementRef, ViewChild } from '@angular/core';
import { NodePrimigenUI } from '../../behaviours/primigen/node.primigen.ui';
import { NodeDataTransfer } from '../../../../../Core/Models/NodeDataTransfer.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'node-array',
  templateUrl: './node.array.ui.html'
})
export class NodeArrayUI extends NodePrimigenUI {

  @ViewChild('s1') output: ElementRef | null = null;
  @ViewChild('t_input') input: ElementRef<HTMLInputElement> | null = null;

  @ViewChild('t_select') select: ElementRef<HTMLSelectElement> | null = null;

  dataForm: FormGroup;

  constructor(private el: ElementRef, private fb: FormBuilder) {
    super();
    this.ref = el;
    this.el.nativeElement.classList.add('node');
    
    this.dataForm = this.fb.group({
      data: this.fb.array([]),
    });
  }

  public override NodeRepaint(): boolean {
    this.cpm?.changeDetectorRef.detectChanges();

    this.onMouseUp(new MouseEvent('mouseup'));
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

  public onChange_Type(event: any) {
    this.dataForm.removeControl('data');
    this.dataForm.addControl('data', this.fb.array([]));
  }

  newData(): FormGroup{
    let defaultvalue: any = '';
    switch (this.select?.nativeElement.value) {
      case 'text':
        defaultvalue = '';
        break;
      case 'number' || 'range':
        defaultvalue = 0;
        break;
      case 'checkbox':
        defaultvalue = false;
        break;
      default:
        defaultvalue = '';
    }

    return this.fb.group({
      value: defaultvalue
    });
  }

  get alldata(): FormArray {
    return this.dataForm.get("data") as FormArray
  }

  newDataset(): FormGroup {
    return this.fb.group({
      data: null,
    })
  }

  addDataset() {
    this.alldata.push(this.newDataset());
  }

  removeDataset(i: number) {
    
    this.alldata.removeAt(i);
  }


  public async GetValueExecution(): Promise<NodeDataTransfer<any>> {

    let ndt = new NodeDataTransfer<any>(null);

    // const val = this.formData.value.data;
    // ndt = new NodeDataTransfer<any>(val);

    //fix array

    const data: any[] = this.dataForm.value.data?.map((d: any,index: number) => {
      if (this.select?.nativeElement.value === 'checkbox')
        {
          return d.data === true;
        }
      return d.data;
    });
    if (!data || !Array.isArray(data) || data.length === 0){
      return ndt;
    
    }
    ndt = new NodeDataTransfer<typeof data[0]>(data);
    return ndt;
  }

}

