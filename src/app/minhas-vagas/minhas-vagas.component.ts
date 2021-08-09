import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Temas';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-minhas-vagas',
  templateUrl: './minhas-vagas.component.html',
  styleUrls: ['./minhas-vagas.component.css']
})
export class MinhasVagasComponent implements OnInit {

  nome = environment.nome
  foto = environment.fotoPerfil

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number = -1;
  temaPostagens: Tema = new Tema()


  usuario: Usuario = new Usuario()
  user = environment.id


  idPostagem: number
  postagem: Postagem[]
  postagemUsuario: Postagem = new Postagem()
  listaVagasTemas: Postagem[]
  postagemConsultaInteressadas: Postagem = new Postagem()

  rastrearOpcaoTema: string = "todos";

  key = 'dataDePostagem'
  reverse = true

  testeTexto: string = this.postagemUsuario.texto;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {


    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
      this.router.navigate(['/entrar'])
    }


    /*  this.getAllPostagensDeUsuario()*/


    // this.findPostagemId()

    this.findVagasById()
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

  findByIdTemaVagas(event: any) {

    if (event.target.value != "todos") {

      this.postagemService.getByIdVagaTema(this.user, event.target.value).subscribe((resp: Postagem[]) => {
        this.listaVagasTemas = resp;
      })
    }
  }

  findVagasById() {
    this.postagemService.getVagasById(this.user).subscribe((resp: Postagem[]) => {
      this.postagem = resp
    })

  }

  redEditPost(id: number) {
    this.router.navigate(["/minhas-vagas", id]);
  }

  findPostagemId() {
    this.idPostagem = this.route.snapshot.params['id']


    this.postagemService.getPostagemById(this.idPostagem).subscribe((resp: Postagem) => {
      this.postagemUsuario = resp

      let postagemConvertEspaco = this.postagemUsuario.texto.replace(/&nbsp;/g, " ");
      let postagemConvertLinha = postagemConvertEspaco.replace(/<br>/g, "\n")
      let postagemComDestaqueUm = postagemConvertLinha.replace(/<strong>/g, "<d>")
      let postagemComDestaqueDois = postagemComDestaqueUm.replace(/<\/strong>/g, "</d>")

      this.postagemUsuario.texto = postagemComDestaqueDois

    })
  }

  findByIdTema() {

    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;

    })
  }

  findAllTemas() {
    this.temaService.getTemasVagas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
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

    if(this.postagemUsuario.titulo == '' || this.postagemUsuario.cargo == '' || this.postagemUsuario.regiao == '' || this.postagemUsuario.texto == ''){
      this.alertas.showAlertDanger('Por favor, não deixe os campos nulos.')
    }
    else{
    this.postagemService.putPostagemDeUsuario(this.postagemUsuario).subscribe((resp: Postagem) => {
      this.postagemUsuario = resp

    this.postagemUsuario = new Postagem()
    this.tema = new Tema()
    this.idTema = -1;
    this.findVagasById()

    this.alertas.showAlertSuccess('Vaga atualizada com sucesso!')

    })
  }
  }

  apagar(id: number) {
    this.postagemService.deletePostagem(id).subscribe(() => {
      this.alertas.showAlertSuccess('Vaga deletada com sucesso!')
    })


  }

  findByIdPostagem(id: number){
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem)=>{
      this.postagemConsultaInteressadas = resp;
    })
  }
}
