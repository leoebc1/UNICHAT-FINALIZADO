import { Rede } from "./Rede"
import { menuInicial, menuCriarConta, mensagemContaCriada, menuLogin, mensagemNenhumaContaExistente, menuRedeSocial } from "./Menus"
import { Conta } from "./Conta"

function main(){
    const redeSocial = new Rede

    let sustentaMenuInicial = true
    while(sustentaMenuInicial){
        let opcaoMenuInicial = menuInicial()
        switch (opcaoMenuInicial) {

            //criar nova conta
            case 1: 
                let novaConta = menuCriarConta()                              
                novaConta.setId(redeSocial.retornaNovoId())                   
                redeSocial.criarConta(novaConta)                              
                mensagemContaCriada(novaConta.getNomeUsuario())
                break
                
            //login
            case 2:
                let contaLogada: Conta 
                let tentativaContaLogada: Conta | null
                if(redeSocial.getContas().length){
                    tentativaContaLogada = menuLogin(redeSocial)
                    if(tentativaContaLogada instanceof Conta){
                        contaLogada = tentativaContaLogada
                        menuRedeSocial(contaLogada, redeSocial)
                    }
                } else {
                    mensagemNenhumaContaExistente()
                }
                break
            default: //opção invalida
                break
        }
    }
}
main()