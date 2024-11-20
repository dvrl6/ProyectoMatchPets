import { Participante } from "../Modelo/Clases/Participante.js";
import { Predeterminado } from "../Modelo/Recursos/Predeterminado.js";
import { Validacion } from "../Modelo/Recursos/Validacion.js";
import { manejoJSON } from "../Modelo/Configuracion/manejoJSON.js";

let manejoDatos = new manejoJSON();
let validar = new Validacion();
let listaParticipantes;
let participanteEnLinea;

listaParticipantes = manejoDatos.obtenerParticipantes("Participantes");// Obtiene los participantes del json
participanteEnLinea = manejoDatos.obtenerParticipantes("ParticipanteEnLinea");

// Si quieren reiniciar los datos del json con los datos predeterminados quiten este comentario de abajo, 
// y ejecuten el html LogIn. Luego de eso lo vuelven a comentar

// ************************************************************************************************
/*     listaParticipantes = manejoDatos.obtenerParticipantes("Participantes");
     manejoDatos.eliminarTodosParticipantes(listaParticipantes);
    let auxPredeterminados = new Predeterminado();
    listaParticipantes = auxPredeterminados.crearPredeterminados();
    manejoDatos.guardarVariosParticipantes(listaParticipantes);
    localStorage.clear(); 
     */
// *************++++*********++++++++++++++++++++++++++********************************************+***

export class ControladorLogIn{
    constructor(){

    }
    encogerPanel(panel2,valor){
        if (panel2){
            panel2.style.height = valor;
            panel2.style.transition='0.5s height ease';
        }
    }
    agregarEventos(toque, contenido){
        // NOTA (NAHOMY): No supe como pasar esta a llamadaEventos.js ¿Se pondria el ciclo forEach alla?
        toque.forEach((tab,index)=>{
            tab.addEventListener("click",()=>{
                //Para remover los activos 
                toque.forEach(tab=> tab.classList.remove("active"));
                //Para activar uno
                tab.classList.add("active");
                //Esconder el previo
                contenido.forEach(c=>c.classList.remove("active"));
                //Mostrar contenido de acuerdo al boton seleccionado
                contenido[index].classList.add("active");
            })
        })
    }
     /*******************************Registrarse**************************/
    validarDatosUsuario(mensajeErrorInicio,correoInicio,contraseniaInicio){
        let casualidad=0;

        if ((correoInicio.value!=="")&&(contraseniaInicio.value!=="")) {
            for (let i=0;i<listaParticipantes.length;i++){
                if ((correoInicio.value===listaParticipantes[i].correo)&&(contraseniaInicio.value===listaParticipantes[i].contrasena)){
                    participanteEnLinea=listaParticipantes[i];
                    // guardarDatosEnLocalStorage(listaParticipantes,participanteEnLinea);
                    manejoDatos.guardarParticipanteEnLinea(participanteEnLinea);
                    casualidad=1;
                    window.open('Principal.html', '_self');
                }
            }
        }else{
            casualidad=2;
        }

        switch (casualidad){
            case 2: mensajeErrorInicio.textContent='Lo sentimos, asegúrese de llenar todas las casillas.';
                break;
            case 0: mensajeErrorInicio.textContent='Lo sentimos, Correo o Contrasenia Incorrectos';
                break;
        }
    } 
    ocultarContrasenia(botonCheckInicioSesion,inputContraseniaInicioSesion){
        if (botonCheckInicioSesion.checked){
            inputContraseniaInicioSesion.type='text';
        }else{
            inputContraseniaInicioSesion.type='password';
        }
    }
    validarDatosRegistro(mensajeErrorRegistro,nombreRegistro,apellidoRegistro,correoRegistro,contrasenaRegistro,fechaDeNacimientoRegistro){
        let date= new Date(fechaDeNacimientoRegistro.value);
        let diaNacimientoRegistro=date.getDate()+1;
        let mesNacimientoRegistro=date.getMonth()+1;
        let anioNaciminetoRegistro=date.getFullYear();
        const fechaActual = new Date();
        let coincidenciaNoValida=0;

        // Nota (Nahomy): La fecha de nacimiento esta dando indefinido, no se registraba el perfil y la quite temporalmente del if para ver si funcionaba el evento
        if ((nombreRegistro.value!=="")&&(apellidoRegistro.value!=="")&&(correoRegistro.value!=="")&&(contrasenaRegistro.value!=="")){  
            if(validar.validarPatronCorreoElectronico(correoRegistro.value)===true){
                for (let i=0;i<listaParticipantes.length;i++){
                    if (correoRegistro.value===listaParticipantes[i].correo){
                        coincidenciaNoValida=1;
                    }
                }
            }else{
                coincidenciaNoValida=3;
            }

            if (((mesNacimientoRegistro>fechaActual.getMonth())&&(anioNaciminetoRegistro=fechaActual.getFullYear()-18))||(anioNaciminetoRegistro>fechaActual.getFullYear()-18)||(anioNaciminetoRegistro<fechaActual.getFullYear()-100)){
                coincidenciaNoValida=2;
            }

        }else{
            coincidenciaNoValida=4;
        }

        /******************Validacion y Verificacion de Correo y Fecha */
        
        switch (coincidenciaNoValida){
            /**Caso Correo Repetido */
            case 1: 
                mensajeErrorRegistro.textContent="Lo sentimos, este correo está siendo usado en otra cuenta.";
            break;
            /**Caso fecha no valida */
            case 2: 
                mensajeErrorRegistro.textContent="Lo sentimos. Su edad debe estar entre los valores dados. Por favor ingrese una fecha válida.";
            break;
            /**Caso Correo con Patron Incorrecto */
            case 3: 
                mensajeErrorRegistro.textContent="Lo sentimos. Correo No Válido";
            break;
            /**Caso Casillas Sin Llenar */
            case 4: 
                mensajeErrorRegistro.textContent="Lo sentimos, asegúrese de llenar todas las casillas.";
            break;
            case 0: 
                let listaMascotaNuevoUsuario = [];
                let listaSolicitudesNuevoUsuario = [];
                let listaAnunciosNuevoUsuario = [];
                let participanteNuevoRegistro= new Participante (listaParticipantes.length + 1,nombreRegistro.value,apellidoRegistro.value,fechaDeNacimientoRegistro.value,correoRegistro.value,contrasenaRegistro.value, listaMascotaNuevoUsuario,listaAnunciosNuevoUsuario,listaSolicitudesNuevoUsuario);
                listaParticipantes.push(participanteNuevoRegistro);
                participanteEnLinea=participanteNuevoRegistro;
                manejoDatos.agregarParticipante(participanteNuevoRegistro);
                manejoDatos.guardarParticipanteEnLinea(participanteEnLinea);
                window.open('Principal.html', '_self');
            break;
        }      
    }
     
}