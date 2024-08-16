import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/login';
import { getCookie } from '../../utils/cookie';
import { Environment } from '../../../environment/dev.environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private backendUrl: string = `${Environment.http_protocol}${Environment.api_url}` //"http://172.20.10.4:4600/login"//'http://localhost:4600/login'; 

  constructor(
    private http: HttpClient
  ) {
    
  } 

  public login(form: LoginRequest): Observable<LoginResponse>{
    console.log(form)
    return this.http.post<LoginResponse>(`${this.backendUrl}/login`, form, {withCredentials: true})
  }

  public registerUser(form: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.backendUrl}/login/create`, form)
  }


  isSessionValid(): Observable<boolean> {
    const sessionCookie = getCookie('session');
    if (!sessionCookie) {
      return of(false);
    }

    return this.http.get<{ valid: boolean }>(`${this.backendUrl}/session`, { withCredentials: true }).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }
}
