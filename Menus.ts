import { logoArte, criarContaArte, contaCriadaArte, loginArte, menuRedeSocialArte, arteMensagens, arteNotificacoes, logoutArte } from "./Artes"
import { Comentario } from "./Comentario"
const ask = require('readline-sync')
import { Conta } from "./Conta"
import { Curtida } from "./Curtida"
import { Mensagem } from "./Mensagem"
import { Notificacao } from "./Notificacao"
import { Post } from "./Post"
import { Rede } from "./Rede"


export function menuInicial(): number {
        console.clear()
        logoArte()
        console.log("╔══════════════════════════╗");
        console.log("║                          ║");
        console.log("║    [1] - Criar conta     ║");
        console.log("║    [2] - Login           ║");
        console.log("║                          ║");
        console.log("╚══════════════════════════╝");

        
        return ask.questionInt("Selecione uma opcao: ")
}

export function menuCriarConta(): Conta {
    console.clear()
    criarContaArte()
    let nomeUsuario = ask.question("Digite o nome de usuario: ")
    let senha = ask.question("Digite a senha: ",{ hideEchoBack: true })
    let bio = ask.question("Digite a bio do seu perfil: ")
    return new Conta(nomeUsuario, senha, bio)    
}

export function mensagemContaCriada(nome: string): void {
    console.clear()
    contaCriadaArte()
    console.log(`\nSeja bem vindo, ${nome}!`)
    congelaTela()
}

export function congelaTela(): void {
    ask.question("Tecle ENTER para continuar...")
    console.clear()
}

export function menuLogin(redeSocial: Rede): Conta | null {
    console.clear();
    loginArte();
    
    while (true) {
        try {
            let nomeUsuario = ask.question("Nome de usuario: ")
            let senha = ask.question("Senha: ", { hideEchoBack: true })

            let contaLogada = redeSocial.login(nomeUsuario, senha)

            if (contaLogada instanceof Conta) {
                return contaLogada
            } else {
                throw new Error("Nome de usuario e/ou senha incorretos.")
            }
        } catch (error) {
            console.clear();
            console.log(error.message);
            congelaTela();
        }
    }
}

export function mensagemNenhumaContaExistente(){
    console.clear()
    console.log("Nenhuma conta cadastrada")
    congelaTela()
}

export function menuRedeSocial(contaLogada: Conta, redeSocial: Rede){
    let sustentaMenuRedeSocial: boolean = true
    while(sustentaMenuRedeSocial){
        console.clear()
        menuRedeSocialArte()
        console.log(`
        ───────────────────────────────────────────────────────
        Olá, ${contaLogada.getNomeUsuario()}

        [1] - Ver feed
        [2] - Buscar perfil
        [3] - Notificações
        [4] - Mensagens
        [0] - Fazer logout
        ───────────────────────────────────────────────────────
        `)
        let opcaoMenuRedeSocial = ask.questionInt(`     Aguardando ordens, ${contaLogada.getNomeUsuario()}: `)
        switch (opcaoMenuRedeSocial){
            case 1:
                menuFeed(contaLogada, redeSocial, 0)
                break
            case 2:
                menuBuscarPerfil(contaLogada, redeSocial)
                break
            case 3:
                menuExibirNotificacoes(contaLogada, redeSocial)
                break
            case 4:
                menuMensagens(contaLogada, redeSocial)
                break
            case 0:
                console.clear()
                logoutArte()
                congelaTela()
                sustentaMenuRedeSocial = false
                break
            default:
                console.log("Opção inválida")
                congelaTela()
                break
        }
    }

}


export function menuFeed(contaLogada: Conta, redeSocial: Rede, postASerMostrado: number): void{
    let sustentaMenuFeed: boolean = true
    let indexPostAtual = postASerMostrado
    while (sustentaMenuFeed){
        let postCurtido: boolean = false
        console.clear()
        let postsOrdenados = ordenaPostsPorDataHora(buscaPostsDeSeguindo(contaLogada, redeSocial))
        let postAtual = postsOrdenados[indexPostAtual]
        let contaQuePostou: Conta
        if(postAtual){                                                             //verifica se existe algum post a ser mostrado no feed. interfere no menu a ser exibido
            console.log(`
                ********************************************************
                *  Usuário: ${postAtual.getNomeUsuario()}
                ********************************************************
                *  Conteúdo:
                --------------------------------------------------------
                ${postAtual.getConteudo()}
                --------------------------------------------------------
                *  Curtidas: ${postAtual.getCurtidas().length}
                ********************************************************
                `);
                
                if (postAtual.getComentarios().length > 0) {                    //verifica se há comentários a serem exibidos no post atual
                
                    for (let comentario of postAtual.getComentarios()) {
                        console.log(`
                --------------------------------------------------------
                * ${comentario.getNomeUsuario()}: ${comentario.getConteudo()}
                        `);
                    }
                
                    console.log(`
                --------------------------------------------------------
                `);
                } else {
                    console.log(`Sem comentários.`);
                }
            if(verificaCurtida(contaLogada, postAtual)){                            //verifica se o usuario ja curtiu este post. interfere no menu a ser exibido
                postCurtido = true
            }
            if(!postCurtido){
                console.log(`
                ───────────────────────────────────────────────────────
                [1] - Criar novo post
                [2] - Proximo post
                [3] - Post anterior
                [4] - Curtir
                [5] - Comentar
                [0] - voltar
                ───────────────────────────────────────────────────────
                `)
            } else { 
                console.log(`
                ───────────────────────────────────────────────────────
                [1] - Criar novo post
                [2] - Proximo post
                [3] - Post anterior
                [4] - Retirar Curtida
                [5] - Comentar
                [0] - voltar
                ───────────────────────────────────────────────────────
                    `)
            }
        } else {
            console.log(`
                ───────────────────────────────────────────────────────
                [1] - Criar novo post
                [0] - Voltar
                ───────────────────────────────────────────────────────
                `)
        }

        
        let opcaoMenuFeed = ask.questionInt(`Aguardando ordens, ${contaLogada.getNomeUsuario()}: `)
        switch(opcaoMenuFeed){
            case 1:
                menuNovoPost(contaLogada, redeSocial)
                break
            case 2:
                if(!(indexPostAtual + 1 >= postsOrdenados.length)){
                    indexPostAtual++
                }
                break
            case 3:
                if(indexPostAtual){
                    indexPostAtual --
                }
                break
            case 4:
                if(postAtual){
                    if(!postCurtido){
                        contaQuePostou = redeSocial.getContaByNomeUsuario(postAtual.getNomeUsuario()) 
                        let curtida = new Curtida(contaLogada.getNomeUsuario())
                        postAtual.receberCurtida(curtida)
                        let notificacaoCurtida = new Notificacao(`${contaLogada.getNomeUsuario()} curtiu seu post.`)
                        contaQuePostou.novaNotificacao(notificacaoCurtida)
                    } else {
                        postAtual.removerCurtida(contaLogada)
                    }
                }
                break
            case 5:
                if(postAtual){ 
                    contaQuePostou = redeSocial.getContaByNomeUsuario(postAtual.getNomeUsuario()) 
                    let conteudo = comentar(contaLogada, redeSocial, postAtual)
                    let notificacaoComentario = new Notificacao(`${contaLogada.getNomeUsuario()} comentou no seu post: ${conteudo}`)
                    contaQuePostou.novaNotificacao(notificacaoComentario)
                }
                break
            case 0:
                sustentaMenuFeed = false
                break
        }
    }
}

export function menuNovoPost(contaLogada: Conta, redeSocial: Rede): void{
    console.clear()
    let conteudo = ask.question(`No que voce esta pensando? `)
    let novoPost = new Post(contaLogada.getNomeUsuario(), conteudo)
    contaLogada.criarNovoPost(novoPost)
    console.clear()
    console.log('Postado!')
    congelaTela()
}


export function menuBuscarPerfil(contaLogada: Conta, redeSocial: Rede) {
    let sustentaMenuBuscarPerfil: boolean = true
    while (sustentaMenuBuscarPerfil) {
        console.clear()
        let nomeUsuarioPesquisar = ask.question("Digite o nome do perfil: ").trim()

        if (nomeUsuarioPesquisar === '0') {
            sustentaMenuBuscarPerfil = false
            return
        }
        try {
            let contaBuscada = redeSocial.getContaByNomeUsuario(nomeUsuarioPesquisar)
            console.log(contaBuscada)
            menuPerfilBuscado(contaLogada, redeSocial, contaBuscada)

        } catch (error) {
            console.log(error.message) 
            congelaTela()
        }
    }
}

export function menuPerfilBuscado(contaLogada: Conta, redeSocial: Rede, contaExibida: Conta){
    let sustentaMenuPerfilBuscado: boolean = true
    while(sustentaMenuPerfilBuscado){
        console.clear()
        let estaSeguindo: boolean = verificaSeguindo(contaLogada, contaExibida, redeSocial)
        console.log(`
                ${contaExibida.getFoto()}
                ───────────────────────────────────────────────────────
                ${contaExibida.getNomeUsuario()}
                ${contaExibida.getBio()}

                ${contaExibida.getSeguidores().length} seguidores
                ${contaExibida.getSeguindo().length} seguindo
        `)
        if(!estaSeguindo){
            console.log(`
                ───────────────────────────────────────────────────────
                [1] - Seguir
                [2] - Enviar Mensagem
                [0] - Voltar
                ───────────────────────────────────────────────────────
                `)
        } else {
            console.log(`
                ───────────────────────────────────────────────────────
                [1] - Deixar de seguir
                [2] - Enviar Mensagem
                [0] - Voltar
                ───────────────────────────────────────────────────────
                `)
        }
        let opcaoMenuPerfilBuscado = ask.questionInt("Aguardando ordens: ")
        switch(opcaoMenuPerfilBuscado){
            case 1:
                if(!estaSeguindo){
                    contaLogada.seguir(contaExibida)
                    contaExibida.novoSeguidor(contaLogada)
                    let notificacao = new Notificacao(`Novo seguidor: ${contaLogada.getNomeUsuario()}`)
                    contaExibida.novaNotificacao(notificacao)
                } else {
                    contaLogada.deixarDeSeguir(contaExibida)
                    contaExibida.perderSeguidor(contaLogada)
                }
                break
            case 2: 
                console.clear()
                let conteudoMensagem = ask.question(`Escreva para ${contaExibida.getNomeUsuario()}: `)
                let novaMensagem = new Mensagem(contaLogada.getNomeUsuario(), conteudoMensagem)
                contaExibida.novaMensagem(novaMensagem)
                let notificacaoMensagem = new Notificacao(`Você recebeu uma mensagem de ${contaLogada.getNomeUsuario()}`)
                contaExibida.novaNotificacao(notificacaoMensagem)
                console.clear()
                console.log('Mensagem Enviada!')
                congelaTela()
                break
            case 0:
                sustentaMenuPerfilBuscado = false
                break
            default: 
                console.log("Opção inválida")
                congelaTela()
                break
        }
    }
}

export function verificaSeguindo(contaLogada: Conta, contaBuscada: Conta, redeSocial: Rede): boolean{
    let retorno: boolean = false
    for(let conta of contaLogada.getSeguindo()){
        if(contaBuscada.getNomeUsuario() === conta.getNomeUsuario()){
            retorno = true
        }
    }
    return retorno
}

export function menuExibirNotificacoes(contaLogada: Conta, redeSocial: Rede) {
    console.clear()
    arteNotificacoes()
    let notificacoes = contaLogada.getNotificacoes().slice().reverse(); // Cria uma cópia invertida das notificações
    
    if (notificacoes.length > 0) {
        for (let notificacao of notificacoes) {
            console.log(`
                ${notificacao.getEventoNotificado()}
                ------------------------------------
            `)
        }
        contaLogada.limparNotificacoes();
        congelaTela()
    } else {
        console.log("Sem novas notificações");
        congelaTela()
    }
}


export function ordenaPostsPorDataHora(posts: Array<Post>): Array<Post>{
    let novoArray: Array<Post> = [];

    for (let post of posts) {
        let inserido = false;
        for (let i = 0; i < novoArray.length; i++) {
            if (post.getDataHora() > novoArray[i].getDataHora()) {
                novoArray.splice(i, 0, post);
                inserido = true;
                break;
            }
        }
        if (!inserido) {
            novoArray.push(post);
        }
    }

    return novoArray;
}

export function buscaPostsDeSeguindo(contaLogada: Conta, redeSocial: Rede): Array<Post>{ 
    let retorno: Array<Post> = []
    for(let conta of contaLogada.getSeguindo()){
        for(let post of conta.getPosts()){
            retorno.push(post)
        }
    }
    return retorno
}

export function verificaCurtida(contaLogada: Conta, post: Post): boolean{
    let retorno:boolean = false
    for(let curtida of post.getCurtidas()){
        if(curtida.getNomeUsuario() === contaLogada.getNomeUsuario()){
            retorno = true
        }
    }
    return retorno
}

export function comentar(contaLogada: Conta, redeSocial: Rede, post: Post): string{
    console.clear()
    let conteudo = ask.question("O que gostaria de comentar? ")
    let comentario = new Comentario(contaLogada.getNomeUsuario(), conteudo)
    post.receberComentario(comentario)
    console.clear()
    console.log("Comentário postado!")
    congelaTela()
    return conteudo
}

export function menuMensagens(contaLogada: Conta, redeSocial: Rede): void{
    let sustentaMenuMensagem: boolean = true
    while(sustentaMenuMensagem){
        console.clear()
        arteMensagens()
        console.log(`
            ───────────────────────────────────────────────────────
            [1] - Ver minhas mensagens
            [2] - Enviar mensagem
            [0] - Voltar
            ───────────────────────────────────────────────────────
            `)
        let opcaoMenuMensagem = ask.questionInt("Aguardando ordens: ")
        switch(opcaoMenuMensagem){
            case 1:
                verMensagens(contaLogada)
                break
            case 2:
                menuBuscarPerfil(contaLogada, redeSocial)
                break
            case 0:
                sustentaMenuMensagem = false
                break
            default:
                console.log("Opção inválida.")
                congelaTela()
                break
        }
    }
}

export function verMensagens(contaLogada: Conta) {
    console.clear()
    arteMensagens()
    console.log(`
        ───────────────────────────────────────────────────────
        `)
    let mensagens = contaLogada.getMensagens().reverse(); 
    
    for (let mensagem of mensagens) {
        console.log(`
        ---------------------------------------------
        ${mensagem.getNomeRemetente()}: ${mensagem.getConteudo()} [${mensagem.getDataHora().getHours()}:${mensagem.getDataHora().getMinutes()}]
        `)
    }
    congelaTela()
}





