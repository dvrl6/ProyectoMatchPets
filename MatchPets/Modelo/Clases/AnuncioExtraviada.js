import { Anuncio } from "./Anuncio.js";
export class AnuncioExtraviada extends Anuncio{
    constructor(participante, mascota,tipo){
        super(participante,mascota);
        this.tipo = tipo;
    }
}