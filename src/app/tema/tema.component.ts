import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Temas';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemasComuns: Tema[]
  listaTemasVagas: Tema[]
  tpTema: boolean
 
  constructor(private router: Router, private temaService: TemaService, private alertas: AlertasService) { }

  ngOnInit(){

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    

    this.findTemasComuns()
    this.findTemasVagas()
  }

  
  findTemasComuns(){
    this.temaService.getTemasComuns().subscribe((resp: Tema[]) => {
      this.listaTemasComuns = resp
    })
  }

  findTemasVagas(){
    this.temaService.getTemasVagas().subscribe((resp: Tema[])=>{
      this.listaTemasVagas = resp
    })
  }

 
  cadastrar(){
    this.tema.tipoTema = this.tpTema

    if (this.tema.tipoTema == null) {
      this.alertas.showAlertDanger('Escolha uma das opções')
    }
    else{

    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso')
      this.findTemasComuns()
      this.findTemasVagas()
      this.tema = new Tema()
      })
    }
  }


  tipoTema(event: any){
    
    if(event.target.value == 'comum'){
      this.tpTema = false;
    }
    else if(event.target.value == 'vaga'){
      this.tpTema = true;
    }
    else{
      this.tpTema = null;
    }
  }

}
