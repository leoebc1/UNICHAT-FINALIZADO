import { fotos } from "./Artes"
import { Mensagem } from "./Mensagem"
import { Notificacao } from "./Notificacao"
import { Post } from "./Post"

export class Conta {
    private id: number 
    private nomeUsuario: string 
    private senha: string 
    private informacaoAdicional: string 
    private seguidores: Array<Conta> 
    private seguindo: Array<Conta>
    private posts: Array<Post> 
    private mensagens: Array<Mensagem>
    private notificacoes: Array<Notificacao> // notificações recebidas, com conteúdo e ID da conta que gerou a notificação
    private foto: fotos
    //private authService: AuthService

    constructor(nomeUsuario: string, senha: string, informacaoAdicional: string) {
        this.nomeUsuario = nomeUsuario 
        this.senha = senha
        this.informacaoAdicional = informacaoAdicional
        this.seguidores = []
        this.seguindo = []
        this.posts = []
        this.mensagens = [] // inicia o array de mensagens diretas vazio
        this.notificacoes = [] 
        const randomIndex = Math.floor(Math.random() * Object.keys(fotos).length);
        this.foto = Object.values(fotos)[randomIndex];
     //   this.authService = AuthService.getInstance()
    }

    public getFoto(): fotos{
        return this.foto
    }

    public getBio(): string{
        return this.informacaoAdicional
    }

    public setId(id: number): void{
        this.id = id
    }

    public getNomeUsuario(): string{
        return this.nomeUsuario
    }

    public getSenha(): string{
        return this.senha
    }

    public getPosts(): Array<Post>{
        return this.posts
    }

    public getSeguidores(): Array<Conta>{
        return this.seguidores
    }

    public getSeguindo(): Array<Conta>{
        return this.seguindo
    }

    public getNotificacoes(): Array<Notificacao>{
        return this.notificacoes
    }

    public criarNovoPost(post: Post){
        this.posts.push(post)
    }

    public seguir(contaParaSeguir): void{
        this.seguindo.push(contaParaSeguir)
    }

    public novoSeguidor(seguidor: Conta): void{
        this.seguidores.push(seguidor)
    }

    public deixarDeSeguir(contaParaDeixarDeSeguir: Conta): void{
        this.seguindo.splice(this.seguindo.indexOf(contaParaDeixarDeSeguir), 1)
    }

    public perderSeguidor(seguidorPerdido: Conta): void{
        this.seguidores.splice(this.seguindo.indexOf(seguidorPerdido), 1)
    }

    public novaNotificacao(notificacao: Notificacao): void{
        this.notificacoes.push(notificacao)
    }

    public limparNotificacoes(): void{
        this.notificacoes = []
    }

    public novaMensagem(mensagem: Mensagem): void{
        this.mensagens.push(mensagem)
    }

    public getMensagens(): Array<Mensagem>{
        return this.mensagens
    }
/*
    public login(): void {
        // Gerar um token fictício
        const token = `jwt-token-${this.nomeUsuario}`;

        // Salvar o token usando AuthService
        this.authService.login(token);
        
    }
        */
}