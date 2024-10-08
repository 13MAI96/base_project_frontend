import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { LoginRequest, LoginResponse, LoginResponseBody } from '../../models/login';
import { getCookie } from '../../utils/cookie';
import { Environment } from '../../../environment/dev.environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private backendUrl: string = `${Environment.http_protocol}${Environment.api_url}` //"http://172.20.10.4:4600/login"//'http://localhost:4600/login'; 

  private _token: string = "";
  private _user!: LoginResponseBody;
  public user_obs: BehaviorSubject<LoginResponseBody> = new BehaviorSubject(new LoginResponseBody());

  constructor(
    private http: HttpClient
  ) {
    this._token = getCookie('session') ?? "";
  } 

  public login(form: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.backendUrl}/login`, form).pipe(
      map(result => {
        if(result.body) {
          this._token = result.body.token
          this.user = result.body
        }
        return result
      })
    )
  }

  public registerUser(form: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.backendUrl}/login/create`, form)
  }


  isSessionValid(): Observable<boolean> {
    return this.http.get<{ valid: boolean }>(`${this.backendUrl}/login/session`, {headers: new HttpHeaders({session: this._token})}).pipe(
      map(response => response.valid),
      catchError(() => of(false))
    );
  }

  public get token(){
    return this._token
  }

  public set token(token: string){
    this._token = token
  }

  public get user(){
    return this._user
  }

  public set user(user: LoginResponseBody){
    this._user = user
    this.user_obs.next(user)
  }
}
