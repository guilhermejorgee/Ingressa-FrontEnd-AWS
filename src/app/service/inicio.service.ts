import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Temas';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(
    private http: HttpClient
  ) { }



}
