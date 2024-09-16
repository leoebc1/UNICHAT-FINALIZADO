import { Conta } from "./Conta"
import { congelaTela, menuBuscarPerfil } from "./Menus"

export class Rede {
    private contas: Conta[] // lista de contas na rede social

    constructor() {
        this.contas = [] // inicia a lista de contas vazia
    }

    getContas(): Array<Conta>{
        return this.contas
    }

    public criarConta(conta: Conta): void{
        this.contas.push(conta)
    }

    public retornaNovoId(): number{
        return this.contas.length + 1
    }

    public login(nomeUsuario: string, senha: string): Conta | null{
        let contaLogada: Conta | null = null
        for(let conta of this.contas){
            if(conta.getNomeUsuario() === nomeUsuario && conta.getSenha() === senha){
                contaLogada = conta
            }
        }
        return contaLogada
    }

    public getContaByNomeUsuario(nomeUsuario: string): Conta {
        for (let conta of this.contas) {
            if (conta.getNomeUsuario() === nomeUsuario) {
                return conta
            }
        }
        throw new Error("Conta não encontrada")
    }
}    