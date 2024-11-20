import { ControladorPrincipal } from "../../Controlador/ControladorPrincipal.js";

let controlador = new ControladorPrincipal();

controlador.llenarCatalogo();
controlador.llenarFiltrosEdad();
/*****************Navegacion menu superior*****************************/
const tabs = document.querySelectorAll(".tabs button");
const content = document.querySelectorAll('.content');
const editarPerfil= document.getElementById('botonEditarCambiosPerfil');
const mostrarBotonesPerfil= document.getElementById('botonesGuardarCancelar');
const nombreEditarPerfil= document.getElementById('nombrePerfil');
const apellidoEditarPerfil= document.getElementById('apellidoPerfil');
const fechaNacimientoTxtPerfil= document.getElementById('fechaDeNacimientoPerfil');
const fechaNacimientoNuevaPerfil= document.getElementById('nuevaFechaPerfil');
const textoFechaPerfil = document.getElementById('textoFechaNacimiento');
const soloMostrarPerfil= document.getElementById('soloMostrarTexto');
const errorEditarPerfil= document.getElementById('errorEditarPerfil');
const cambiarContraseniaNuevaPerfil= document.getElementById('cambiarContraseniaNueva');
const cambiarContraseniaActualPerfil= document.getElementById('cambiarContraseniaActual');
controlador.agregarEventos(tabs,content,editarPerfil,mostrarBotonesPerfil,nombreEditarPerfil,apellidoEditarPerfil,fechaNacimientoTxtPerfil,fechaNacimientoNuevaPerfil,textoFechaPerfil,soloMostrarPerfil,errorEditarPerfil,cambiarContraseniaNuevaPerfil,cambiarContraseniaActualPerfil);



const especie = document.getElementById("especieMascotaNueva");
const raza = document.getElementById("razaMascotaNueva");
const periodo = document.getElementById("periodoMascotaNueva");
const tiempo = document.getElementById("edadMascotaNueva");
especie.addEventListener('click',() => {  controlador.actualizarEspecies(especie,raza,periodo,tiempo)});


const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener('click' , () => { controlador.cerrarSesion()})
 /**************************Aniadir Mascota************************/
    

 const fotoNueva = document.getElementById('agregarImagenMascotaNueva');
 const img = document.getElementById('imagenPreview');
 fotoNueva.addEventListener('change', (evento) => {
    const archivo = evento.target.files[0];
    controlador.actualizarVistaPreviaImagen(archivo,evento,img);
});

const tipoMascotaNueva = document.getElementById('tipoMascotaNueva');
tipoMascotaNueva.addEventListener('change', () => {controlador.handleTipoMascotaNueva()});


const botonAceptarUbicacion = document.getElementById('boton');
botonAceptarUbicacion.addEventListener('click', () => {
  controlador.asignarSelectedLocation()
    .then((selectedLocation2) => {
      if (selectedLocation2) {
        controlador.hidePopup();
      }
    })
    .catch((error) => {
      console.error('Error al asignar la ubicación:', error);
    });
});


const cerrarMapa = document.getElementById('close-button');
cerrarMapa.addEventListener('click', () => {controlador.hidePopup()} );

const btnAniadirMascotaNueva= document.getElementById('botonnAñadirMascota');
btnAniadirMascotaNueva.addEventListener("click",()=>{controlador.validarCamposMascotaNueva()});

  // Filtros 
let especieFiltro = document.getElementById("especieFiltro");
let edad = document.getElementById("edadFiltro");
// let tipo = document.getElementById("tipoFiltro");
especieFiltro.addEventListener("change",()=> {controlador.especieFiltroFn()});
edad.addEventListener("change",()=> {controlador.edadFiltroFn()});
// tipo.addEventListener("change",()=> {controlador.tipoFiltroFn()});


// cuando carga la pantalla actualiza los datos del perfil, este evento debe
const botonPerfil = document.getElementById("perfil");
botonPerfil.addEventListener('click',()=>{controlador.llenarDatosPerfil()});


// Modal lista solicitudes
var modalListaSolicitudes = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close-button")[0];

closeButton.onclick = function() {
  modalListaSolicitudes.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modalListaSolicitudes) {
    modalListaSolicitudes.style.display = "none";
  }
}
// +++++

const regresar=document.getElementById('botonRegresar');
regresar.addEventListener("click",()=>{controlador.ocultarConsulta()});

const mostrarAdoptivas=document.getElementById('btnAdopcion');
mostrarAdoptivas.addEventListener("click",()=>{controlador.mostrarEnAdopcion()});

const mostrarPerdidos=document.getElementById('btnPerdidas');
mostrarPerdidos.addEventListener("click",()=>{controlador.mostrarPerdidas()});

const mostrarCallejeras=document.getElementById('btnCallejeras');
mostrarCallejeras.addEventListener("click",()=>{controlador.mostrarCallejeras()});

const regresarSolicitud=document.getElementById('btnRegresarSolicitud');
regresarSolicitud.addEventListener("click",()=>{controlador.ocultarSolicitud()});

const regresarPerfil2=document.getElementById('btnRegresarPerfil');
regresarPerfil2.addEventListener("click",()=>{controlador.regresarPerfil()});

const reiniciarFiltros = document.getElementById('btnReiniciarFiltros');
reiniciarFiltros.addEventListener("click",()=>{controlador.llenarCatalogo()});

var gruposOpciones1 = document.getElementsByClassName("grupoOpciones1");
for (var i = 0; i < gruposOpciones1.length; i++) {
    gruposOpciones1[i].addEventListener("click", (e)=> { controlador.deseleccionarOpciones(e)});
}

var gruposOpciones2 = document.getElementsByClassName("grupoOpciones2");
for (var i = 0; i < gruposOpciones2.length; i++) {
    gruposOpciones2[i].addEventListener("click", (e)=>{controlador.deseleccionarOpciones(e)});
}

var gruposOpciones3 = document.getElementsByClassName("grupoOpciones3");
for (var i = 0; i < gruposOpciones3.length; i++) {
    gruposOpciones3[i].addEventListener("click", (e)=>{controlador.deseleccionarOpciones(e)});
}

var formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (event)=>{controlador.cambioBotonesRadio(event)});

const buttonSolicitud = document.getElementById("botonEnviarSolicitud");
buttonSolicitud.addEventListener("click", () => {
  controlador.SendMail();
});

const animalesRadio = document.getElementById('animales');
const infoOtrasMascotasInput = document.getElementById('infoOtrasMascotas');
animalesRadio.addEventListener('change', () => { controlador.animalesRadioE(infoOtrasMascotasInput)});

document.getElementById('noAnimales').addEventListener('change', function() {
    infoOtrasMascotasInput.required = false;
});

/********************************Eliminar Perfil NUEVO ABRAHAM************************/
const panelEliminarPerfil= document.querySelector(".eliminarPerfil");  
const botonEliminarPerfil= document.getElementById('botonEliminarPerfil');
const correoEliminar=document.getElementById('correoEliminarPerfil');
const contraseniaEliminar=document.getElementById('contraseñaEliminarPerfil'); 
const panelConfirmarEliminarPerfil= document.getElementById('confirmarEliminarPerfil'); 
const botonConfirmacion = document.getElementById('botonConfirmarEliminarPerfil');
const panelActual = document.querySelector('.perfilSeccion');
const menuHorizontal= document.querySelector('.menuHorizontal');
const botonCerrarSesion = document.getElementById("cerrarSesion");

botonEliminarPerfil.addEventListener("click",()=>{controlador.cambiarAPanelEliminarPerfil(botonEliminarPerfil,panelEliminarPerfil,panelActual,correoEliminar, menuHorizontal,botonCerrarSesion)});

const errorEliminar =document.getElementById('errorContraseniaIncorrectaEliminarPerfil');
const aceptarEliminar= document.getElementById('botonAceptarEliminarPerfil');
aceptarEliminar.addEventListener("click",()=> {controlador.eliminarPerfil(correoEliminar,contraseniaEliminar,panelConfirmarEliminarPerfil,botonConfirmacion,errorEliminar)});
botonConfirmacion.addEventListener("click",()=>{controlador.eliminarPerfilConfirmar(correoEliminar,contraseniaEliminar)});

const botonVolver= document.getElementById('botonVolver');
botonVolver.addEventListener('click', ()=>{controlador.volverDeEliminarPerfil (panelEliminarPerfil,panelActual,menuHorizontal,botonCerrarSesion)});

const alternativa = document.getElementById('perfil');
alternativa.addEventListener("click",()=>{controlador.alternativaEliminar(botonEliminarPerfil)});
/********************************Editar Perfil NUEVO ABRAHAM************************/

const editar= document.getElementById('botonEditarCambiosPerfil');
const mostrarBotones= document.getElementById('botonesGuardarCancelar');
const guardar= document.getElementById('botonGuardarCambiosPerfil');
const cancelar=document.getElementById('botonCancelarCambiosPerfil');
const nombreEditar= document.getElementById('nombrePerfil');
const apellidoEditar= document.getElementById('apellidoPerfil');
const fechaNacimientoTxt= document.getElementById('fechaDeNacimientoPerfil');
const fechaDeNacimientoNueva= document.getElementById('nuevaFechaPerfil');
const textoFecha = document.getElementById('textoFechaNacimiento');
const soloMostrar= document.getElementById('soloMostrarTexto');
const errorEditar= document.getElementById('errorEditarPerfil');
const cambiarContraseniaNueva= document.getElementById('nuevaContrasenia');
const cambiarContraseniaActual= document.getElementById('contraseniaActual');
const seccionContraseniaNueva= document.getElementById('cambiarContraseniaNueva');
const seccionContraseniaActual= document.getElementById('cambiarContraseniaActual');
editar.addEventListener('click',()=>{ controlador.editarPerfil(editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual)});
cancelar.addEventListener('click',()=>{ controlador.cancelarEditarPerfil(editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar,errorEditar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual)});
guardar.addEventListener('click',()=>{ controlador.guardarEditarPerfil(editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar, errorEditar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual)}); 

/*************************************************Modificar Mascota*************************/

const modificarEspecie = document.getElementById('especieModificarMascota');
const modificarRaza = document.getElementById('razaModificarMascota');
const modificarPeriodo = document.getElementById('periodoModificarMascota');
const modificaredad = document.getElementById('edadModificarMascota');
modificarEspecie.addEventListener('click',() => { controlador.actualizarEspecies(modificarEspecie,modificarRaza,modificarPeriodo,modificaredad)});

const fotoModificar = document.getElementById('modificarImagenMascotaNueva');
const imgModificar = document.getElementById('imagenPreviewModificar');
fotoModificar.addEventListener('change', (evento) => {
   const archivo = evento.target.files[0];
   controlador.actualizarVistaPreviaImagen(archivo,evento,imgModificar);
});

const botonAceptarUbicacionModificada = document.getElementById('botonModificarUbicacion');
botonAceptarUbicacionModificada.addEventListener('click', () => {
  controlador.asignarSelectedLocationModificada()
    .then((selectedLocation2) => {
      if (selectedLocation2) {
        controlador.hidePopupModificar();
      }
    })
    .catch((error) => {
      console.error('Error al asignar la ubicación:', error);
    });
});

/*****************************************************Alternativa Volver********************************/


const btnIniciar = document.getElementById("inicio");
btnIniciar.addEventListener("click",()=>{controlador.ocultarPerfil()});
const btnAniadir= document.getElementById("aniadir");
btnAniadir.addEventListener("click",()=>{controlador.ocultarPerfil()});
const btnPerfil= document.getElementById("perfil");
btnPerfil.addEventListener("click",()=>{controlador.mostrarPerfil()});

/*******************************************Modificar Solicitud************************** */
const botonVolverSolicitudLlena = document.getElementById("btnRegresarSolicitud2");
botonVolverSolicitudLlena.addEventListener('click' ,() => {controlador.volverPanelModificarSolicitud()});

const tipoMascotaModificada = document.getElementById('tipoModificarMascota');
tipoMascotaModificada.addEventListener('change', () => {controlador.handleTipoMascotaModificada()});

const cerrarMapaModificar = document.getElementById('close-button-modificar');
cerrarMapaModificar.addEventListener('click', () => {controlador.hidePopupModificar()} );

