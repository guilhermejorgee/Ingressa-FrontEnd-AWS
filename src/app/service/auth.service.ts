import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  entrar(userLogin: UserLogin): Observable<UserLogin> {

    return this.http.post<UserLogin>('https://redeingressa.herokuapp.com/usuarios/logar', userLogin);

  }

  cadastrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>('https://redeingressa.herokuapp.com/usuarios/cadastrar', usuario);

  }

  atualizar(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>('https://redeingressa.herokuapp.com/usuarios', usuario, { headers: new HttpHeaders().set('Authorization', environment.token) });

  }

  logado() {

    let ok: boolean = false

    if (environment.token != '') {
        ok = true;
      }

    return ok;

  }


  admin() {



    if (environment.usuarioAdmin == true) {

      return true;
    }
    return false
  }


  empregador() {



    if (environment.usuarioEmpregador == true) {

      return true;
    }
    return false
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://redeingressa.herokuapp.com/usuarios/${id}`,
      { headers: new HttpHeaders().set('Authorization', environment.token) }
    )
  }

  curtirPostagem(idUsuario: number, idPostagem: number): Observable<Usuario> {
    return this.http.put<Usuario>(`https://redeingressa.herokuapp.com/usuarios/adicionarcurtida/${idUsuario}/${idPostagem}`, null, { headers: new HttpHeaders().set('Authorization', environment.token) })
  }

  descurtirPostagem(idUsuario: number, idPostagem: number): Observable<Usuario> {
    return this.http.put<Usuario>(`https://redeingressa.herokuapp.com/usuarios/removercurtida/${idUsuario}/${idPostagem}`, null, { headers: new HttpHeaders().set('Authorization', environment.token) })
  }

  getTopUsuariosEmpregadores(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('https://redeingressa.herokuapp.com/usuarios/tops', { headers: new HttpHeaders().set('Authorization', environment.token) } )
  }


  
}



