import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  user = environment.id

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private alertas: AlertasService,
    private router: Router,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == ''){
        this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
        this.router.navigate(['/entrar'])
    }

      this.usuario.usuarioAdmin = false;
      this.idUsuario = this.route.snapshot.params['id']
      this.findByIdUsuario(this.idUsuario)
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  verificaPerfilUsuario(){

    if(this.idUsuario == environment.id){
      return true
    }
    return false;
  }
}
