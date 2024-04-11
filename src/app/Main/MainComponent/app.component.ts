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
