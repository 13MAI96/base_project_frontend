import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../../models/login';
import { Environment } from '../../../environment/dev.environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private backendUrl: string = `${Environment.http_protocol}${Environment.api_url}` //"http://172.20.10.4:4600/login"//'http://localhost:4600/login'; 

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    
  } 

  public startGame(): Observable<DefaultResponse> {
    const token = this.loginService.token

    const header = new HttpHeaders({session: token})
    return this.http.put<DefaultResponse>(`${this.backendUrl}/feed/start`, null, {headers: header});
  }

}
