export class Curtida{
    private nomeUsuario: string

    constructor(nomeUsuario: string){
        this.nomeUsuario = nomeUsuario
    }

    getNomeUsuario(): string{
        return this.nomeUsuario
    }
    
}