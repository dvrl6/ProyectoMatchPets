import {Mascota} from "./Mascota.js";
export class MascotaPropia extends Mascota{
    constructor(id,nombre, especie, color, tipo1, ubicacion, edad, periodo, raza, descripcion, rutaImagen,tipo){
        super(id,nombre, especie, color, tipo1, ubicacion, edad, periodo, raza, descripcion, rutaImagen);
        this.tipo = tipo;
    }
}