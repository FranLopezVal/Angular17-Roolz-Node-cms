
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PanelUI } from './Components/panel.ui/panel.ui';
import { headerComponent } from '../Modules/Global/Header/header.component';
import { ButtonGlassUI } from './Components/button.glass.ui/button.glass.ui';
import { ButtonFlatUI } from './Components/button.flat.ui/button.flat.ui';
import { userheaderComponent } from '../Modules/Global/Header/UserHeader/userheader.component';
import { containerviewComponent } from '../Modules/NodeViewer/containerview.component';
import { ButtonMenuUI } from './Components/menubutton.ui/menubutton.ui';
import { ConnectionUI } from './Components/Nodes/connection.node.ui/connection.node.ui';
import { SocketNodeUI } from './Components/Nodes/socket.node.ui/socket.node.ui';
import { NodeOperatorUI } from './Components/Nodes/node.operator.ui/node.operator.ui';
import { NodeConstantUI } from './Components/Nodes/node.constant.ui/node.constant.ui';

@NgModule({
  declarations: [
    // UI
    PanelUI,
    ButtonGlassUI,
    ButtonFlatUI,
    ButtonMenuUI,

    //UI NODES
    // NodePrimigenUI, (Lo ponemos como referencia, pero es abstracto, no se puede instanciar)
    NodeOperatorUI,
    NodeConstantUI,
    SocketNodeUI,

    // Components
    headerComponent,
    userheaderComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,

    //UI
    PanelUI,
    ButtonGlassUI,
    ButtonFlatUI,
    ButtonMenuUI,

    //UI NODES
    // NodePrimigenUI,
    NodeOperatorUI,
    NodeConstantUI, 
    SocketNodeUI,

    //Components
    headerComponent,
    userheaderComponent,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
