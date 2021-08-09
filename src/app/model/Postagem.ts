import { Comentarios } from "./Comentarios";
import { Tema } from "./Temas";
import { Usuario } from "./Usuario";


export class Postagem{

    public id: number;

    public dataDePostagem: Date;

    public regiao: string;

    public cargo: string;

    public titulo: string;

    public texto: string;

    public midia: string;

    public qtCurtidas: number;

    public tema: Tema;

    public usuario: Usuario;

    public curtidoresPostagem: Usuario[];

    public comentarios: Comentarios[];

}