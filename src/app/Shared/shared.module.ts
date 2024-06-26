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
import { ConnectionUI } from './Components/Nodes/behaviours/connection/connection.node.ui';
import { SocketNodeUI } from './Components/Nodes/behaviours/socket/socket.node.ui';
import { NodeOperatorUI } from './Components/Nodes/basic/operator/node.operator.ui';
import { NodeConstantUI } from './Components/Nodes/basic/constant/node.constant.ui';
import { NodeArrayUI } from './Components/Nodes/basic/array/node.array.ui';
import { NodeArrayOperatorUI } from './Components/Nodes/basic/ArrayOperator/node.arrayoperator.ui';
import { NodeConsoleOutputUI } from './Components/Nodes/basic/consoleoutput/node.consoleoutput.ui';
import { NodeFetchUI } from './Components/Nodes/comm/fetch/node.fetch.ui';
import { NodeSerialhUI } from './Components/Nodes/comm/serial/node.serial.ui';
import { SerialPort } from '../Core/Components/__Serial.comm';

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
    NodeArrayUI,
    SocketNodeUI,
    NodeArrayOperatorUI,
    NodeConsoleOutputUI,
    NodeFetchUI,
    NodeSerialhUI,

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
    NodeArrayUI,
    SocketNodeUI,
    NodeArrayOperatorUI,
    NodeConsoleOutputUI,
    NodeFetchUI,
    NodeSerialhUI,

    //Components
    headerComponent,
    userheaderComponent,
  ],
  providers: [
    
  ]
})
export class SharedModule { }
