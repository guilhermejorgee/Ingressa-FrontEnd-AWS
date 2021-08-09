import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Temas';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {

    let regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\-]+\?v=|embed\/|v\/))(\S+)?$/

    if (regex.test(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else {
      return null;
    }


  }
}

@Component({
  selector: 'app-minhas-postagens',
  templateUrl: './minhas-postagens.component.html',
  styleUrls: ['./minhas-postagens.component.css']
})
export class MinhasPostagensComponent implements OnInit {

  nome = environment.nome
  foto = environment.fotoPerfil

  tema: Tema = new Tema()
  listaTemas: Tema[]
  
  postagensTema: Postagem[]


  usuario: Usuario = new Usuario()
  user = environment.id


  idPostagem:number
  postagem: Postagem[]
  postagemUsuario: Postagem = new Postagem()
  idTema: number = -1;

  rastrearOpcaoTema: string = "todos";

  key = 'dataDePostagem'
  reverse = true

  testeTexto: string = this.postagemUsuario.texto;

  constructor(
    private router:Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
      this.router.navigate(['/entrar'])


    }


  /*  this.getAllPostagensDeUsuario()*/

    
   // this.findPostagemId()

   this.findAllPostagensComumDeUsuario()
   this.findAllTemas()

  }

  verificaPostagemTema() {

    if (this.rastrearOpcaoTema != "todos") {
      return true;
    }

    return false;

  }

  verificaPostagemGeral() {

    if (this.rastrearOpcaoTema == "todos") {
      return true;
    }

    return false;

  }

  findByIdTemaPostagens(event: any) {

    if (event.target.value != "todos") {

      this.postagemService.getByIdUserByIdTema(this.user, event.target.value).subscribe((resp: Postagem[]) => {
        this.postagensTema = resp;
      

      })}
  }

  findAllPostagensComumDeUsuario(){
    this.postagemService.getPostagemComumDeUsuario(this.user).subscribe((resp: Postagem[])=>{
      this.postagem = resp
    })

  }

  redEditPost(id: number){
    this.router.navigate(["minhas-postagens/", id]);
  }

  findPostagemId(){
    this.idPostagem = this.route.snapshot.params['id']


    this.postagemService.getPostagemById(this.idPostagem).subscribe((resp:Postagem)=>{
      this.postagemUsuario = resp

      console.log(this.postagemUsuario.tema.id);

    let postagemConvertEspaco = this.postagemUsuario.texto.replace(/&nbsp;/g," ");
    let postagemConvertLinha = postagemConvertEspaco.replace(/<br>/g,"\n")
    let postagemComDestaqueUm = postagemConvertLinha.replace(/<strong>/g,"<d>")
    let postagemComDestaqueDois = postagemComDestaqueUm.replace(/<\/strong>/g,"</d>")

    this.postagemUsuario.texto = postagemComDestaqueDois

    })
  }

  findByIdTema() {
  
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;

    })
  }


 findAllTemas(){
   this.temaService.getTemasComuns().subscribe((resp: Tema[])=>{
     this.listaTemas = resp;
   })
 }

 verificandoVideo(url: string) {

  let regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\-]+\?v=|embed\/|v\/))(\S+)?$/

  if (regex.test(url)) {
    return true
  }
  else {
    return false;
  }

}


 atualizar() {

  if(this.idTema == -1){
    this.idTema = this.postagemUsuario.tema.id;
  }

  this.tema.id = this.idTema

  this.postagemUsuario.tema = this.tema

  this.usuario.id = this.user

  this.postagemUsuario.usuario = this.usuario

  this.postagemUsuario.qtCurtidas = null;

  this.postagemService.putPostagemDeUsuario(this.postagemUsuario).subscribe((resp: Postagem) => {
    this.postagemUsuario = resp

    this.postagemUsuario = new Postagem()
    this.tema = new Tema()
    this.idTema = -1;
    this.findAllPostagensComumDeUsuario()

    this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')

  })
}

apagar(id:number){
  this.postagemService.deletePostagem(id).subscribe(()=>{
    this.findAllPostagensComumDeUsuario()
    this.alertas.showAlertSuccess('Postagem deletada com sucesso!')
  })


}

}
