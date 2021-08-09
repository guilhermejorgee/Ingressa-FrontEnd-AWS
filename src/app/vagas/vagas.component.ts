import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Temas';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {

  usuario: Usuario = new Usuario()
  user = environment.id

  postagem: Postagem = new Postagem()
  idPostagem: number;

  postagemSelecionada: Postagem

  tema: Tema = new Tema()
  listaTema: Tema[]
  temaEscolhido: number = -1;

  listaPostagens: Postagem[]

  listaPostagensRegiao: Postagem[]

  listaPostagensAreaCargo: Postagem[]

  listaPostagensAreaCargoERegiao: Postagem[]

  key = 'dataDePostagem'
  reverse = true

  usuario2: Usuario = new Usuario()

  postagemCurtida: Postagem = new Postagem()

  postagensCurtidasUser: Postagem[]


  keyPesquisaCargoArea: string = ''
  keyPesquisaRegiao: string = ''


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private alertas: AlertasService,
    private temaService: TemaService,
    public authService: AuthService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
      this.router.navigate(['/entrar'])

    }

    this.findPostagensVagas()

    this.findTemasVagas()

    this.findByUser()

  }

  pesquisaCargoArea() {


    if (this.keyPesquisaCargoArea != '' && this.keyPesquisaRegiao == '') {

      this.postagemService.getPostagemAreaCargo(this.keyPesquisaCargoArea.toLowerCase()).subscribe((resp: Postagem[]) => {
        this.listaPostagensAreaCargo = resp;
      })
    }
  }

  pesquisaRegiao() {

    if (this.keyPesquisaCargoArea == '' && this.keyPesquisaRegiao != '') {
      this.postagemService.getPostagemByRegiao(this.keyPesquisaRegiao.toLowerCase()).subscribe((resp: Postagem[]) => {
        this.listaPostagensRegiao = resp;
      })
    }

  }

  pesquisaCargoAreaRegiao() {

    if (this.keyPesquisaCargoArea != '' && this.keyPesquisaRegiao != '') {
      this.postagemService.getPostagemAreaCargoRegiao(this.keyPesquisaCargoArea.toLowerCase(), this.keyPesquisaRegiao.toLowerCase()).subscribe((resp: Postagem[]) => {
        this.listaPostagensAreaCargoERegiao = resp;
      })
    }

  }


  verificandoParaTodasPostagens() {

    if (this.keyPesquisaCargoArea == '' && this.keyPesquisaRegiao == '') {
      return true
    }
    return false
  }

  verificandoParaCargoArea() {

    if (this.keyPesquisaCargoArea != '' && this.keyPesquisaRegiao == '') {
      return true
    }
    return false
  }

  verificandoParaRegiao() {

    if (this.keyPesquisaCargoArea == '' && this.keyPesquisaRegiao != '') {
      return true
    }
    return false
  }

  verificandoParaCargoAreaRegiao() {

    if (this.keyPesquisaCargoArea != '' && this.keyPesquisaRegiao != '') {
      return true
    }
    return false
  }


  postVaga() {

    this.tema.id = this.temaEscolhido
    this.postagem.tema = this.tema
    this.usuario.id = this.user
    this.postagem.usuario = this.usuario

    if(this.postagem.cargo == '' || this.postagem.cargo == null){
      this.alertas.showAlertDanger("É obrigatório inserir um cargo")
    }
    else if(this.postagem.regiao == '' || this.postagem.regiao == null){
      this.alertas.showAlertDanger("É obrigatório inserir uma região")
    }
    else{
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        this.tema = new Tema()
        this.temaEscolhido = null;
        this.findPostagensVagas()
        this.alertas.showAlertSuccess('Vaga publicada com sucesso!')
  
      })
    }


  }

  findByIdTema() {
    this.temaService.getByIdTema(this.temaEscolhido).subscribe((resp: Tema) => {
      this.tema = resp
    })

  }

  findTemasVagas() {
    this.temaService.getTemasVagas().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  findPostagensVagas() {
    this.postagemService.getAllPostagensVagas().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  redEditPost(id: number) {
    this.router.navigate(["vagas/", id]);
  }

  findPostagemId() {
    this.idPostagem = this.route.snapshot.params['idpostagem']

    this.postagemService.getPostagemById(this.idPostagem).subscribe((resp: Postagem) => {
      this.postagemSelecionada = resp

    })
  }

  curtidaPostagem(idUserCurtida: number, idPostagemCurtida: number) {
    this.authService.curtirPostagem(idUserCurtida, idPostagemCurtida).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.findByUser()
    })
  }

  descurtidaPostagem(idUserCurtida: number, idPostagemCurtida: number) {
    this.authService.descurtirPostagem(idUserCurtida, idPostagemCurtida).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.findByUser()
    })
  }

  findByUser() {
    this.authService.getByIdUsuario(environment.id).subscribe((resp: Usuario) => {
      this.usuario2 = resp;
      this.postagensCurtidasUser = this.usuario2.postagemCurtidas;
    })
  }

  verificandoCurtidasFeita(id: number) {

    if (this.postagensCurtidasUser == null) {
      return false;
    }
    else if (this.postagensCurtidasUser.length == 0) {
      return false;
    }

    this.postagemCurtida = this.postagensCurtidasUser.find(myObj => myObj.id == id)

    if (this.postagemCurtida == null) {
      return false
    }
    else if (this.postagemCurtida.id == id) {
      return true
    }

    return false;

  }

  verificandoCurtidasNaoFeita(id: number) {
    if (this.postagensCurtidasUser == null) {
      return true;
    }
    else if (this.postagensCurtidasUser.length == 0) {
      return true;
    }

    this.postagemCurtida = this.postagensCurtidasUser.find(myObj => myObj.id == id)

    if (this.postagemCurtida == null) {
      return true
    }
    else if (this.postagemCurtida.id != id) {
      return true
    }

    return false;
  }



}