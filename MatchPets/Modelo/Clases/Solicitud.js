import { manejoJSON } from "../Configuracion/manejoJSON.js";
let manejoDatos = new manejoJSON();

export class Solicitud{
    constructor(nroId,mascota, estatus, vivienda, tipoVivienda, conJardin, autorizadoEnAlquiler, horarioLaboral,
         situacionVacaciones, motivoAdopcion, familiarResponsable, desicionCompartida, lugarDeDormir, otrosAnimales, 
         descripcionOtrosAnimales, caracterMascota){
        this.nroId = nroId;
        this.mascota = mascota;
        this.estatus = estatus;
        this.vivienda = vivienda;
        this.tipoVivienda = tipoVivienda;
        this.conJardin = conJardin;
        this.autorizadoEnAlquiler = autorizadoEnAlquiler;
        this.horarioLaboral = horarioLaboral;
        this.situacionVacaciones = situacionVacaciones;
        this.motivoAdopcion = motivoAdopcion;
        this.familiarResponsable = familiarResponsable;
        this.desicionCompartida = desicionCompartida;
        this.lugarDeDormir = lugarDeDormir;
        this.otrosAnimales = otrosAnimales;
        this.descripcionOtrosAnimales = descripcionOtrosAnimales;
        this.caracterMascota = caracterMascota;
    }

    registrarSolicitud(participanteEnLinea,listaParticipantes,solicitud){
        participanteEnLinea.listaSolicitudes.push(solicitud);
        manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea);
        for (let i=0; i<listaParticipantes.length; i++){
            if(listaParticipantes[i].correo === participanteEnLinea.correo){
                listaParticipantes[i].listaSolicitudes.push(solicitud);
                manejoDatos.actualizarParticipante(listaParticipantes[i]);
            }
        }
    }
  
}