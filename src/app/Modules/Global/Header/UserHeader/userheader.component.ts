
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../Core/Services/session.service';
import { UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'mod-userheader',
  templateUrl: './userheader.component.html'
})
export class userheaderComponent implements OnInit {

  private _user: UserCredential | null = null;

  constructor(private session: SessionService,
              private router: Router
  ) {    
  }

  ngOnInit(): void {
    this._user = this.session.currentSession
  }

  public get UserIsLogged(): boolean {
    return this.session.userIsLogged();
  }

  public get UserName(): string {
    return this._user?.user.email || '';
  }

  onClick_Logout() {
    this.session.LogoutUser();
  }

  onClick_App() {
    this.router.navigate(['/app']);
  }
}

