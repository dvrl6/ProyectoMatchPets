import { ControladorLogIn } from "../../Controlador/ControladorLogIn.js";    

let controlador = new ControladorLogIn();

const botonCambio= document.getElementById('btnRegistrarse');
const panel1= document.getElementById('panel');
botonCambio.addEventListener("click",() => { controlador.encogerPanel(panel1,'600px')});

const boton2= document.getElementById('btnIniciar');
const panel2= document.getElementById('panel');
boton2.addEventListener("click",() => { controlador.encogerPanel(panel2,'400px')});

const toque = document.querySelectorAll(".tabs li");
const contenido = document.querySelectorAll('.content');
// toque.forEach((tab,index)=>{ tab.addEventListener("click",controlador.agregarEventos(toque,contenido,tab,index))});
controlador.agregarEventos(toque,contenido);

/************************Inicio Sesion************************/
const botonInicioSesion=document.getElementById('botonIniciarSesion'); 
const mensajeErrorInicio= document.getElementById('mensajeErrorInicioSesion');
let correoInicio= document.getElementById("CorreoI");
let contraseniaInicio= document.getElementById("ContraseniaI");
botonInicioSesion.addEventListener("click",() => { controlador.validarDatosUsuario(mensajeErrorInicio,correoInicio,contraseniaInicio)});

/**********************Ver Ocultar Contrasenia**********************/
const inputContraseniaInicioSesion=document.getElementById("ContraseniaI");
const botonCheckInicioSesion= document.getElementById('verOcultarContraseniaInicioSesion');
botonCheckInicioSesion.addEventListener("click",() => { controlador.ocultarContrasenia(botonCheckInicioSesion,inputContraseniaInicioSesion)});

const botonCheckRegistro= document.getElementById('verOcultarContraseniaRegistro');
const inputContraseniaRegistro=document.getElementById("ContraseniaR");
botonCheckRegistro.addEventListener("click",() => { controlador.ocultarContrasenia(botonCheckRegistro,inputContraseniaRegistro)});

/************************Registrarse************************************/
const mensajeErrorRegistro= document.getElementById('mensajeErrorRegistro');
let nombreRegistro= document.getElementById('NombreRegistro');
let apellidoRegistro= document.getElementById('ApellidoRegistro');
let correoRegistro= document.getElementById('CorreoR');
let contrasenaRegistro= document.getElementById('ContraseniaR');
let fechaDeNacimientoRegistro= document.getElementById('fechaNacimiento');
const botonRegistro = document.getElementById('botonRegistrarse');
botonRegistro.addEventListener("click",() => { controlador.validarDatosRegistro(mensajeErrorRegistro,nombreRegistro,apellidoRegistro,correoRegistro,contrasenaRegistro,fechaDeNacimientoRegistro)});
