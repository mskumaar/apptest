// app/button-cell-renderer.component.ts

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: ' <button type="button" (click)="onClick($event)">edit</button>'
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params:any;
  label: string = '';

  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(this.params);

    }
  }
}
