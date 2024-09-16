export class Comentario{
    private nomeUsuario: string
    private dataHora: Date
    private conteudo: string

    constructor(nomeUsuario: string, conteudo: string){
        this.nomeUsuario = nomeUsuario
        this.dataHora = new Date()
        this.conteudo = conteudo
    }

    public getNomeUsuario(): string{
        return this.nomeUsuario
    }

    public getConteudo(): string{
        return this.conteudo
    }

}