import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
@Injectable()
export class AuthService {
  //private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  loggedIn: BehaviorSubject<boolean>;

  

  constructor(private Token: TokenService) { 
    this.loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
    const authStatus = this.loggedIn.asObservable();
  }
  

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

}
