

export class Mensagem{
    private nomeRemetente: string
    private conteudo: string
    private dataHora: Date
    
    constructor(nomeRemetente: string, conteudo: string){
        this.nomeRemetente = nomeRemetente
        this.conteudo = conteudo
        this.dataHora = new Date()
    }

    public getNomeRemetente(): string{
        return this.nomeRemetente
    }

    public getConteudo(): string{
        return this.conteudo
    }

    public getDataHora(): Date{
        return this.dataHora
    }
}