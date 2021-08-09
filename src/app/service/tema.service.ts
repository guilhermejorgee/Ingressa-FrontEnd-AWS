import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`https://redeingressa.herokuapp.com/tema/${id}`, {headers: new HttpHeaders().set('Authorization', environment.token)}
    );
  }

  getTemasComuns(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://redeingressa.herokuapp.com/tema/comuns', {headers: new HttpHeaders().set('Authorization', environment.token)})
  }

  getTemasVagas(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://redeingressa.herokuapp.com/tema/vagas', {headers: new HttpHeaders().set('Authorization', environment.token)})
  }

  getAllTemas(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://redeingressa.herokuapp.com/tema', {headers: new HttpHeaders().set('Authorization', environment.token)})
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://redeingressa.herokuapp.com/tema', tema, {headers: new HttpHeaders().set('Authorization', environment.token)});
  }

  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>('https://redeingressa.herokuapp.com/tema', tema, {headers: new HttpHeaders().set('Authorization', environment.token)});
  }
  
  deleteTema(id: number){
    return this.http.delete(`https://redeingressa.herokuapp.com/tema/${id}`, {headers: new HttpHeaders().set('Authorization', environment.token)});
  }

}
