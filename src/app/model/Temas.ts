import { Postagem } from "./Postagem";

export class Tema{

    public id: number;

    public area: String;

    public palavraChave: String;

    public tipoTema: boolean;

    public postagem: Postagem[];

}