import { Postagem } from "./Postagem";
import { Usuario } from "./Usuario";

export class Comentarios{

    public id: number;

    public comentario: string;

    public dataDeComentario: Date;

    public usuario: Usuario;

    public postagem: Postagem;

}