import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../Classes/users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Users>;
    public currentUser: Observable<Users>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUsersValue(): Users {
    return this.currentUserSubject.value;
}

login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log('currentUser',user); 
            user = JSON.parse(localStorage.getItem('currentUsers'));
            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUsers');
    this.currentUserSubject.next(null);
  }
}

