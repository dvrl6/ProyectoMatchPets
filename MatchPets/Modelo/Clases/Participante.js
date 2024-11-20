export class Participante{
    constructor(id,nombre,apellido,fechaDeNacimiento, correo,contrasena, listaMascota,listaAnuncios,listaSolicitudes){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.listaMascota = listaMascota;
        this.listaAnuncios = listaAnuncios;
        this.listaSolicitudes = listaSolicitudes;
    }
}