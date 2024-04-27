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
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../Core/Services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Angular17 roolz CMS';
  constructor(private session: SessionService)
  {
  }
  ngOnInit(): void {
    this.session.InitOnLoad();
  }
  
}
