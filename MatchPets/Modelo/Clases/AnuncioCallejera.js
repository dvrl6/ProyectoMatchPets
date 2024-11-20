import { Anuncio } from "./Anuncio.js";
export class AnuncioCallejera extends Anuncio{
    constructor(participante, mascota,tipo){
        super(participante,mascota);
        this.tipo = tipo;
    }
}