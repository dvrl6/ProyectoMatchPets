import {Mascota} from "./Mascota.js";
export class MascotaCallejera extends Mascota{
    constructor(id,nombre, especie, color, tipo1, ubicacion, edad, periodo, raza, descripcion, rutaImagen,ubicacionExacta,tipo){
        super(id,nombre, especie, color, tipo1, ubicacion, edad, periodo, raza, descripcion, rutaImagen);
        this.ubicacionExacta = ubicacionExacta;
        this.tipo = tipo;
    }
}