import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin } from '../Models/i-login';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLogged$ = this.isLogged.asObservable();
    url = 'http://localhost:8080/api/auth';
    httpLogin = inject(HttpClient);


    login(userName: string, password: string): Observable<ILogin> {
        return this.httpLogin.post<ILogin>(this.url + '/login', { userName, password });
    }

    saveToken(token: string) {
        localStorage.setItem('Token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('Token');
    }

    isRegistered(): boolean {
        const token = this.getToken();
        const logged = token != null;
        this.isLogged.next(logged);
        return logged;
    }
    logOut() {
        localStorage.removeItem('Token');
    }

}