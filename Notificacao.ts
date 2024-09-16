import { Comentario } from "./Comentario";
import { Curtida } from "./Curtida";

export class Notificacao{
    private eventoNotificado: string | Curtida | Comentario

    constructor(eventoNotificado: string | Curtida | Comentario){
        this.eventoNotificado = eventoNotificado
    }

    public getEventoNotificado(): string | Curtida | Comentario{
        return this.eventoNotificado
    }

}