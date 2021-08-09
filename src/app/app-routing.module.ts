import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { TemaDeleteComponent } from './deletar/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { MinhasVagasComponent } from './minhas-vagas/minhas-vagas.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { TemaComponent } from './tema/tema.component';
import { VagasComponent } from './vagas/vagas.component';

const routes: Routes = [

  {path: '', redirectTo: 'entrar', pathMatch: 'full'},

  {path:'inicio', component: InicioComponent},
  {path:'contato', component: ContatoComponent},
  {path:'sobrenos', component: SobreNosComponent},
  {path:'entrar', component: EntrarComponent},
  {path:'cadastrar', component:CadastrarComponent},
  {path:'vagas/:idpostagem', component:VagasComponent},
  {path: 'minhas-postagens/:id', component: MinhasPostagensComponent},
  {path: 'perfil/:id', component: PerfilComponent},
  {path: 'put-postagens/:id', component: PostagemEditComponent},
  {path: 'tema',component: TemaComponent}, 
  {path: 'tema-edit/:id', component: TemaEditComponent},
	{path: 'tema-delete/:id',component: TemaDeleteComponent},
  {path: 'minhas-vagas/:id', component: MinhasVagasComponent},
  {path: 'perfil-user/:id', component: PerfilUserComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
