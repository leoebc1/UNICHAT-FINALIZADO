import { Comentario } from "./Comentario"
import { Conta } from "./Conta"
import { Curtida } from "./Curtida"

export class Post{
    private nomeUsuario: string
    private conteudo: string
    private comentarios: Array<Comentario>
    private curtidas: Array<Curtida>
    private dataHora: Date

    constructor(nomeUsuario: string, conteudo: string){
        this.nomeUsuario = nomeUsuario
        this.conteudo = conteudo
        this.comentarios = []
        this.curtidas = []
        this.dataHora = new Date()
    }

    public getConteudo(): string{
        return this.conteudo
    }

    public getDataHora(): Date{
        return this.dataHora
    }

    public getNomeUsuario(): string{
        return this.nomeUsuario
    }

    public getCurtidas(): Array<Curtida>{
        return this.curtidas
    }

    public receberCurtida(curtida: Curtida): void{
        this.curtidas.push(curtida)
    }

    public removerCurtida(contaLogada: Conta): void{
        for(let curtida of this.curtidas){
            if(curtida.getNomeUsuario() === contaLogada.getNomeUsuario()){
                this.curtidas.splice(this.curtidas.indexOf(curtida), 1)
            }
        }
    }

    public receberComentario(comentario: Comentario): void{
        this.comentarios.push(comentario)
    }

    public getComentarios(): Array<Comentario> {
        return this.comentarios
    }


}