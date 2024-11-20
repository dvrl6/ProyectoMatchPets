import { Anuncio } from "../Modelo/Clases/Anuncio.js";
import { AnuncioCallejera } from "../Modelo/Clases/AnuncioCallejera.js";
import { Mascota } from "../Modelo/Clases/Mascota.js";
import { Solicitud } from "../Modelo/Clases/Solicitud.js";
import { manejoJSON } from "../Modelo/Configuracion/manejoJSON.js";
import { MascotaCallejera } from "../Modelo/Clases/MascotaCallejera.js";
import { MascotaExtraviada } from "../Modelo/Clases/MascotaExtraviada.js";
import { MascotaPropia } from "../Modelo/Clases/MascotaPropia.js";
import { AnuncioExtraviada } from "../Modelo/Clases/AnuncioExtraviada.js";
import { Participante } from "../Modelo/Clases/Participante.js";

let manejoDatos = new manejoJSON();
let participanteEnLinea;
let listaParticipantes;
listaParticipantes = manejoDatos.obtenerParticipantes("Participantes");
participanteEnLinea = manejoDatos.obtenerParticipantes("ParticipanteEnLinea");
let solicitudAux = new Solicitud();
let solicitudParticipanteDueno = 0;
let solicitudMascotaSoli = 0;
let cantidadSolicitudes = obtenerCantidadSolicitudes();
/* let solicitudesAceptadas = []; 
let solicitudesRechazadas = [];  */
let solicitudesAceptadas = JSON.parse(localStorage.getItem('solicitudesAceptadas')) || [];
let solicitudesRechazadas = JSON.parse(localStorage.getItem('solicitudesRechazadas')) || [];
let map;
let currentMarker = null;
let selectedLocation;
const places = google.maps.importLibrary("places");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const { Map } = await google.maps.importLibrary("maps");

export class ControladorPrincipal{
    constructor( ){
        
    }

    agregarEventos(tabs, content,editarPerfil,mostrarBotonesPerfil,nombreEditarPerfil,apellidoEditarPerfil,fechaNacimientoTxtPerfil,fechaNacimientoNuevaPerfil,textoFechaPerfil,soloMostrarPerfil,errorEditarPerfil,cambiarContraseniaNuevaPerfil,cambiarContraseniaActualPerfil){
        

        tabs.forEach((tab,index)=>{
            // NOTA (NAHOMY): No supe como pasar esta a llamadaEventos.js ¿Se pondria el ciclo forEach alla?
                tab.addEventListener('click',()=>{
                    editarPerfil.style.display='flex';
                    mostrarBotonesPerfil.style.display='none';
                    nombreEditarPerfil.value='';
                    nombreEditarPerfil.disabled= true;
                    nombreEditarPerfil.style.cursor='default';
                    apellidoEditarPerfil.value='';
                    apellidoEditarPerfil.disabled= true;
                    apellidoEditarPerfil.style.cursor='default';
                    fechaNacimientoTxtPerfil.disabled= true;
                    fechaNacimientoTxtPerfil.style.display='inline-block';
                    fechaNacimientoNuevaPerfil.style.display='none';
                    textoFechaPerfil.style.display='none';
                    soloMostrarPerfil.style.display='flex';
                    errorEditarPerfil.textContent='';
                    errorEditarPerfil.style.display='none';
                    cambiarContraseniaNuevaPerfil.style.display='none';
                    cambiarContraseniaActualPerfil.style.display='none';
                    
                    //Para remover los activos 
                    tabs.forEach(tab=> tab.classList.remove("active"));
                    //Para activar uno
                    tab.classList.add("active");
                    //Esconder el previo
                    content.forEach(c=>c.classList.remove("active"));
                    //Mostrar contenido de acuerdo al boton seleccionado
                    content[index].classList.add("active");
                })
            })
    }

    cerrarSesion(){
        manejoDatos.eliminarParticipanteEnLinea(participanteEnLinea);
    }

    actualizarEspecies(especie,raza,periodo,tiempo){
        raza.innerHTML = ""; 
        this.agregarOpcion("Selecciona la Raza",raza,true,true);
        switch(especie.value) {
            case "Perro":this.agregarOpcion("Labrador", raza,false,false);
                this.agregarOpcion("Bulldog", raza,false,false);
                this.agregarOpcion("Pastor Alemán", raza,false,false);
                this.agregarOpcion("Golden Retriever", raza,false,false);
                this.agregarOpcion("Boxer", raza,false,false);
                this.agregarOpcion("Cocker", raza,false,false);
                this.agregarOpcion("Bichon Maltes", raza,false,false);
                this.agregarOpcion("Pug", raza,false,false);
                this.agregarOpcion("Beagle", raza,false,false);
                this.agregarOpcion("Yorkshire terrier", raza,false,false);
                this.agregarOpcion("Bulldog francés", raza,false,false);
                this.agregarOpcion("Mestizo", raza,false,false);
                this.agregarOpcion("Desconocida", raza,false,false);
                this.actualizarEdad(13,periodo,tiempo);
            break;

            case "Gato":this.agregarOpcion("Siamés", raza,false,false);
                this.agregarOpcion("Persa",raza,false,false);
                this.agregarOpcion("Bengala", raza,false,false);
                this.agregarOpcion("Maine Coon", raza,false,false);
                this.agregarOpcion("Ragdoll",raza,false,false);
                this.agregarOpcion("Abisinio", raza,false,false);
                this.agregarOpcion("Birmano", raza,false,false);
                this.agregarOpcion("Mestizo", raza,false,false);
                this.agregarOpcion("Desconocida", raza,false,false);
                this.actualizarEdad(18,periodo,tiempo);
            break;

            case "Ave": this.agregarOpcion("Canario", raza,false,false);
                this.agregarOpcion("Perico",raza,false,false);
                this.agregarOpcion("Loro", raza,false,false);
                this.agregarOpcion("Diamante", raza,false,false);
                this.agregarOpcion("Jilguero",raza,false,false);
                this.agregarOpcion("Agaporni", raza,false,false);
                this.agregarOpcion("Ninfa", raza,false,false);
                this.agregarOpcion("Cotorra",raza,false,false);
                this.agregarOpcion("Cacatúa", raza,false,false);
                this.agregarOpcion("Yaco", raza,false,false);
                this.agregarOpcion("Guacamayo",raza,false,false);
                this.agregarOpcion("Eclectus", raza,false,false);
                this.agregarOpcion("Mestizo", raza,false,false);
                this.agregarOpcion("Desconocida", raza,false,false);
                this.actualizarEdad(10,periodo,tiempo);
            break;

            case "Roedor":this.agregarOpcion("Raton", raza,false,false);
                this.agregarOpcion("Ramster",raza,false,false);
                this.agregarOpcion("Rata", raza,false,false);
                this.agregarOpcion("Degú ", raza,false,false);
                this.agregarOpcion("Jerbo",raza,false,false);
                this.agregarOpcion("Chinchilla", raza,false,false);
                this.agregarOpcion("Cobaya", raza,false,false);
                this.agregarOpcion("Mestizo", raza,false,false);
                this.agregarOpcion("Desconocida", raza,false,false);
                this.actualizarEdad(3,periodo,tiempo);
            break;
        }
    }
    colocarAnioMes(numero,tiempo,periodo){
        tiempo.innerHTML = "";
        this.colocarTiempo("Edad", tiempo, true, true);
        
        switch (periodo.value) {
            case "Años":for (let i = 1; i <= numero; i++) {
                this.colocarTiempo(i.toString(), tiempo, false, false);
            }
            break;
            case "Meses":for (let i = 1; i <= 12; i++) {
                this.colocarTiempo(i.toString(), tiempo, false, false);
            }
            break;
        }
    }
    agregarOpcion(valor, select, disabled, selected) {
        const opcion = document.createElement("option");
        opcion.text = valor;
        opcion.disabled = disabled;
        opcion.selected = selected;
        select.add(opcion);
    }
    actualizarEdad(numero,periodo,tiempo) {
        periodo.innerHTML = "";
        this.colocarTiempo("Período",periodo, true, true);
        this.colocarTiempo("Años",periodo,false, false);
        this.colocarTiempo("Meses",periodo,false, false);
        periodo.addEventListener('click',()=>{ this.colocarAnioMes(numero,tiempo,periodo)});
        // Nota(Nahomy): No supe como mandar este evento a el llamado de eventos
    }
    colocarTiempo(valor, select, disabled, selected) {
        const opcion = document.createElement("option");
        opcion.text = valor;
        opcion.disabled = disabled;
        opcion.selected = selected;
        select.add(opcion);
    }
    /**************************Aniadir Mascota************************/
    actualizarVistaPreviaImagen(archivo,e,img){
        const defaultImagen = new Image();
        defaultImagen.src = "../Imagenes/defaultImagen.png";
        if (archivo){
            const reader = new FileReader();
            reader.onload = function(e){
                img.src = e.target.result;
            } 
            reader.readAsDataURL(e.target.files[0]);
        }else{
            img.src = defaultImagen.src;
        }
    }
    llenarCatalogoConFiltros(funcionFiltro){
        let contenedorDeTarjetas = document.getElementsByClassName('container-mascotas');
        while (contenedorDeTarjetas[0].firstChild) {
            contenedorDeTarjetas[0].removeChild(contenedorDeTarjetas[0].firstChild);
          }
        while (contenedorDeTarjetas[1].firstChild) {
        contenedorDeTarjetas[1].removeChild(contenedorDeTarjetas[1].firstChild);
        }
        while (contenedorDeTarjetas[2].firstChild) {
            contenedorDeTarjetas[2].removeChild(contenedorDeTarjetas[2].firstChild);
        }
        for (let i = 0; i < listaParticipantes.length; i++){
            let participante = listaParticipantes[i];
            for (let j = 0; j < participante.listaMascota.length; j++){

                if (funcionFiltro(participante.listaMascota[j])){
                    let mascota = participante.listaMascota[j];
                    let tarjeta = document.createElement("div");
                    let containerImg = document.createElement("div");
                    let img = document.createElement("img");
                    let nombre = document.createElement("h1");
                    let tipo = document.createTextNode(mascota.tipo);
                    let ubicacion = document.createElement("div");
                    let icono = document.createElement("i");
                    let textoUbicacion = document.createTextNode(mascota.ubicacion);
                    let botonVerMas = document.createElement("div");
                    // le asigna las clases de estilo
                    botonVerMas.className = "botonNaranja2 botonConsultar";
                    tarjeta.className = "tarjetaMascota";
                    containerImg.className = "container-img";
                    nombre.className = "titulo";
                    ubicacion.className = "desTarjeta";
                    img.src = mascota.rutaImagen;
                    icono.className = "fa-solid fa-location-dot";
                    icono.style.marginRight = "8px";

                    // guarda los indices en cada boton determinado para conseguir a la mascota despues 
                    botonVerMas.dataset.indiceParticipante = i; 
                    botonVerMas.dataset.indiceMascota = j;

                    // le agrega texto y los elementos hijos
                    botonVerMas.textContent = "Ver más";
                    nombre.textContent = mascota.nombre;
                    ubicacion.appendChild(icono);
                    ubicacion.appendChild(textoUbicacion);
                    containerImg.appendChild(img);

                    //agrega los elementos a la tarjeta
                    tarjeta.appendChild(containerImg);
                    tarjeta.appendChild(nombre);
                    tarjeta.appendChild(tipo);
                    tarjeta.appendChild(ubicacion);
                    tarjeta.appendChild(botonVerMas);

                    // Este evento es cuando hay un click en el boton para consultar, activa la funcion mostrarConsulta 
                    //y manda por parametros cual es la mascota que desea consultar
                    botonVerMas.addEventListener("click", ()=>{this.mostrarConsulta(botonVerMas.dataset.indiceParticipante, botonVerMas.dataset.indiceMascota)});

                    // Agrega la tarjeta a su contenedor determinado
                    if (mascota.tipo === "Extraviada"){
                        contenedorDeTarjetas[1].appendChild(tarjeta);
                    }else{
                        if(mascota.tipo === "Propia"){
                            contenedorDeTarjetas[0].appendChild(tarjeta);
                        }else{
                            contenedorDeTarjetas[2].appendChild(tarjeta);
                        }
                    }
                }
                
            }
        }
    }
    validarCamposMascotaNueva(){
        let nombreMascotaNueva= document.getElementById('indiqueNombreMascota');
        let especieMascotaNueva= document.getElementById('especieMascotaNueva');
        let colorMascotaNueva= document.getElementById('colorMascotaNueva');
        let tipoMascotaNueva= document.getElementById('tipoMascotaNueva');
        let ubicacionMascotaNueva= document.getElementById('ubicacionNuevaMascota');
        let periodoMascotaNueva= document.getElementById('periodoMascotaNueva');
        let edadMascotaNueva = document.getElementById('edadMascotaNueva');
        let razaMascotaNueva= document.getElementById('razaMascotaNueva');
        let descripcionMascotaNueva= document.getElementById('descripcionMascota');
        let imagenCargada = document.getElementById('agregarImagenMascotaNueva');
        let imageFile = imagenCargada.files[0];
        const imagen= document.getElementById('imagenPreview');
        let rutaImagenNueva;

        const mensajeError= document.getElementById('mensajeErrorNuevaMascota');
        if (nombreMascotaNueva.value!=="" && especieMascotaNueva.value!=="Selecciona la Especie" && colorMascotaNueva.value!=="Selecciona el Color" && tipoMascotaNueva.value!=="Selecciona el Tipo" && ubicacionMascotaNueva.value!=="" &&periodoMascotaNueva.value!=="Período" && edadMascotaNueva.value!=="Edad" && razaMascotaNueva.value!=="Selecciona la Raza" && descripcionMascotaNueva.value!==""){
            let MascotaNueva = new Mascota(participanteEnLinea.listaMascota.length + 1,nombreMascotaNueva.value,especieMascotaNueva.value,colorMascotaNueva.value,tipoMascotaNueva.value,ubicacionMascotaNueva.value,edadMascotaNueva.value,periodoMascotaNueva.value,razaMascotaNueva.value,descripcionMascotaNueva.value,"");
            let mascotaNoPropia = false;
            let anuncio;
            let ubicacionExacta = this.asignarUbicacionExacta();
            if( imageFile === undefined){
                rutaImagenNueva = "../Imagenes/defaultImagen.png";
            }else{
                rutaImagenNueva = `../Imagenes/${imageFile.name}`;
                manejoDatos.guardarImagen(imageFile);
            }
            if (MascotaNueva.tipo === "Callejera"){
                MascotaNueva = new MascotaCallejera(participanteEnLinea.listaMascota.length + 1,nombreMascotaNueva.value,especieMascotaNueva.value,colorMascotaNueva.value,tipoMascotaNueva.value,ubicacionMascotaNueva.value,edadMascotaNueva.value,periodoMascotaNueva.value,razaMascotaNueva.value,descripcionMascotaNueva.value,rutaImagenNueva,ubicacionExacta, "Callejera");
                let participanteAux = JSON.parse(JSON.stringify(participanteEnLinea));
                anuncio = new AnuncioCallejera(participanteAux,MascotaNueva,"Callejera");
                participanteEnLinea.listaAnuncios.push(anuncio);
                mascotaNoPropia = true;
            }else{
                if (MascotaNueva.tipo === "Extraviada"){
                    MascotaNueva = new MascotaExtraviada(participanteEnLinea.listaMascota.length + 1,nombreMascotaNueva.value,especieMascotaNueva.value,colorMascotaNueva.value,tipoMascotaNueva.value,ubicacionMascotaNueva.value,edadMascotaNueva.value,periodoMascotaNueva.value,razaMascotaNueva.value,descripcionMascotaNueva.value,rutaImagenNueva, "Extraviada");
                    let participanteAux = JSON.parse(JSON.stringify(participanteEnLinea));  
                    anuncio = new AnuncioExtraviada(participanteAux,MascotaNueva,"Extraviada");
                    participanteEnLinea.listaAnuncios.push(anuncio);
                    mascotaNoPropia = true;
                }else{
                    if (MascotaNueva.tipo === "Propia"){
                        MascotaNueva = new MascotaPropia(participanteEnLinea.listaMascota.length + 1,nombreMascotaNueva.value,especieMascotaNueva.value,colorMascotaNueva.value,tipoMascotaNueva.value,ubicacionMascotaNueva.value,edadMascotaNueva.value,periodoMascotaNueva.value,razaMascotaNueva.value,descripcionMascotaNueva.value,rutaImagenNueva, "Propia");
                    }
                }
            }
            participanteEnLinea.listaMascota.push(MascotaNueva);
            manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea);
            for (let i=0;i<listaParticipantes.length;i++){
                if (listaParticipantes[i].correo === participanteEnLinea.correo){
                    if (mascotaNoPropia === true){
                        listaParticipantes[i].listaAnuncios.push(anuncio);
                        
                    }
                    listaParticipantes[i].listaMascota.push(MascotaNueva);
                    manejoDatos.actualizarParticipante(listaParticipantes[i]);

                    imagen.src= "../Imagenes/defaultImagen.png";
                    mensajeError.style.display='none';
                    nombreMascotaNueva.value = "";
                    especieMascotaNueva.value="Selecciona la Especie";
                    colorMascotaNueva.value="Selecciona el Color";
                    tipoMascotaNueva.value="Selecciona el Tipo";
                    ubicacionMascotaNueva.value = "";
                    periodoMascotaNueva.value="Período";
                    edadMascotaNueva.value="Edad";
                    razaMascotaNueva.value="Selecciona la Raza";
                    descripcionMascotaNueva.value= "";
                }
            }
            
            
            
        }else{
            mensajeError.style.display='block';
        }
        this.llenarCatalogoConFiltros(function retornaTrue(mascota){
            return true;
        });
    }
    llenarCatalogo(){
        // guardarDatosJSON();
        let contenedorDeTarjetas = document.getElementsByClassName('container-mascotas');
        while (contenedorDeTarjetas[0].firstChild) {
            contenedorDeTarjetas[0].removeChild(contenedorDeTarjetas[0].firstChild);
          }
        while (contenedorDeTarjetas[1].firstChild) {
        contenedorDeTarjetas[1].removeChild(contenedorDeTarjetas[1].firstChild);
        }
        while (contenedorDeTarjetas[2].firstChild) {
            contenedorDeTarjetas[2].removeChild(contenedorDeTarjetas[2].firstChild);
        }
        for (let i = 0; i < listaParticipantes.length; i++){
            let participante = listaParticipantes[i];
            for (let j = 0; j < participante.listaMascota.length; j++){

                // crea los elementos
                let mascota = participante.listaMascota[j];
                let tarjeta = document.createElement("div");
                let containerImg = document.createElement("div");
                let img = document.createElement("img");
                let nombre = document.createElement("h1");
                let ubicacion = document.createElement("div");
                let tipoDiv = document.createElement("div");
                let tipo = document.createTextNode(mascota.tipo);
                let icono = document.createElement("i");
             //   let textoUbicacion = document.createTextNode("");
                let textoUbicacion = document.createTextNode(mascota.ubicacion);
                let botonVerMas = document.createElement("div");
                
/*                 if (!mascota.ubicacionExacta || !mascota.ubicacionExacta.name) {
                    textoUbicacion.data = mascota.ubicacion;
                } else {
                    textoUbicacion.data = mascota.ubicacionExacta.name;
                } */

                // le asigna las clases de estilo
                botonVerMas.className = "botonNaranja2 botonConsultar";
                tarjeta.className = "tarjetaMascota";
                containerImg.className = "container-img";
                nombre.className = "titulo";
                ubicacion.className = "desTarjeta";
                tipoDiv.className = "tipoMascotaTarjeta";
                img.src = mascota.rutaImagen;
                icono.className = "fa-solid fa-location-dot";
                icono.style.marginRight = "8px";

                // guarda los indices en cada boton determinado para conseguir a la mascota despues 
                botonVerMas.dataset.indiceParticipante = i; 
                botonVerMas.dataset.indiceMascota = j;

                // le agrega texto y los elementos hijos
                botonVerMas.textContent = "Ver más";
                nombre.textContent = mascota.nombre;
                ubicacion.appendChild(icono);
                ubicacion.appendChild(textoUbicacion);
                tipoDiv.appendChild(tipo);
                containerImg.appendChild(img);

                //agrega los elementos a la tarjeta
                tarjeta.appendChild(containerImg);
                tarjeta.appendChild(nombre);
                tarjeta.appendChild(ubicacion);
                tarjeta.appendChild(tipoDiv);
                tarjeta.appendChild(botonVerMas);

                // Este evento es cuando hay un click en el boton para consultar, activa la funcion mostrarConsulta 
                //y manda por parametros cual es la mascota que desea consultar
                botonVerMas.addEventListener("click", ()=>{this.mostrarConsulta(botonVerMas.dataset.indiceParticipante, botonVerMas.dataset.indiceMascota)});

                // Agrega la tarjeta a su contenedor determinado
                if (mascota.tipo === "Extraviada"){
                    contenedorDeTarjetas[1].appendChild(tarjeta);
                }else{
                    if(mascota.tipo === "Propia"){
                        contenedorDeTarjetas[0].appendChild(tarjeta);
                    }else{
                        contenedorDeTarjetas[2].appendChild(tarjeta);
                    }
                }
            }
        }
    }
    llenarFiltrosEdad(){
            
        var select = document.getElementById("edadFiltro");

        // Elimina todas las opciones
        var length = select.options.length;
        for (var i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }
        var edad = document.createElement("option");
        edad.text = "Edad";
        edad.value = 300; // Convertir años a meses
        select.add(edad);
        // Añade las opciones para los meses
        for (var i = 1; i <= 12; i++) {
            var option = document.createElement("option");
            option.text = "Hasta " + i + " mes(es)";
            option.value = i;
            select.add(option);
        }
        
        // Añade las opciones para los años
        for (var i = 0; i <= 20; i++) {
            var option = document.createElement("option");
            option.text = "Hasta " + i + " año(s)";
            option.value = i * 12; // Convertir años a meses
            select.add(option);
        }
    }
    //Nota(Nahomy)Esto lo acomodare despues con calma, se que se repite mucho codigo
     
    // Si desean agregar otro filtro simplemente creen un objeto donde pidan la clase del boton
    // y le aplican lo mismo, solo cambien lo que se compara en cada funcion
    especieFiltroFn(){
        let especieFiltro = document.getElementById("especieFiltro");
        let edad = document.getElementById("edadFiltro");
        // let tipo = document.getElementById("tipoFiltro");
        let especieValor = especieFiltro.value;
        let edadValor = edad.value;
        // let tipoValor = tipo.value;
        this.llenarCatalogoConFiltros(function comparar(mascota){
            var coincideEspecie = (especieValor === 'Especie' || especieValor === mascota.especie);
            var coincideEdad = (edadValor === 'Edad' || edadValor > mascota.edad*12);
            // var coincideTipo = (tipoValor === 'Tipo' || tipoValor === mascota.tipo);
            return coincideEspecie && coincideEdad;
        })
    }
    edadFiltroFn(){
        let especieFiltro = document.getElementById("especieFiltro");
        let edad = document.getElementById("edadFiltro");
        // let tipo = document.getElementById("tipoFiltro");
        let especieValor = especieFiltro.value;
        let edadValor = edad.value;
        // let tipoValor = tipo.value;
        this.llenarCatalogoConFiltros(function comparar(mascota){
            var coincideEspecie = (especieValor === 'Especie' || especieValor === mascota.especie);
            var coincideEdad = (edadValor === 'Edad' || edadValor > mascota.edad*12);
            // var coincideTipo = (tipoValor === 'Tipo' || tipoValor === mascota.tipo);

            return coincideEspecie && coincideEdad;
            
        });
    }
    tipoFiltroFn(){
        let especieFiltro = document.getElementById("especieFiltro");
        let edad = document.getElementById("edadFiltro");
        // let tipo = document.getElementById("tipoFiltro");
        let especieValor = especieFiltro.value;
        let edadValor = edad.value;
        // let tipoValor = tipo.value;
        this.llenarCatalogoConFiltros(function comparar(mascota){
            var coincideEspecie = (especieValor === 'Especie' || especieValor === mascota.especie);
            var coincideEdad = (edadValor === 'Edad' || edadValor > mascota.edad*12);
            // var coincideTipo = (tipoValor === 'Tipo' || tipoValor === mascota.tipo);
            return coincideEspecie && coincideEdad;
        });
    }
    
//    // Muestra la informacion de la mascota detallada
    mostrarConsulta(indiceParticipante, indiceMascota){

        let mascota = listaParticipantes[indiceParticipante].listaMascota[indiceMascota];

        console.log(listaParticipantes[indiceParticipante]);
        console.log(listaParticipantes[indiceParticipante].listaMascota[indiceMascota]);

        document.getElementById('catalogoMostrado').style.display = 'none';
        document.getElementById('consultarEscondido').style.display = 'block';
        document.getElementsByClassName('conteiner-solicitar')[0].style.display = 'block';

        let imagen = document.querySelector(".images img");
        let nombre = document.querySelector(".conteiner-informacion .nombre");
        let raza = document.querySelector(".conteiner-informacion .raza");
        let tipo = document.querySelector(".conteiner-informacion .tipo");
        let ubicacion = document.querySelector(".conteiner-informacion .ubicacion");
        let edad = document.querySelector(".conteiner-informacion .edad");
        let descripcion = document.querySelector(".conteiner-informacion .descripcion");
        if( mascota.tipo === "Callejera" || mascota.tipo === "Extraviada"){
            document.getElementsByClassName('conteiner-solicitar')[0].style.display = 'none';
        }

        if(mascota.tipo === "Callejera"){
            let ubicacionExactaCallejera = mascota.ubicacionExacta;
            console.log(ubicacionExactaCallejera);
            this.crearMapaPreview(ubicacionExactaCallejera);
            document.getElementsByClassName('container-mapa-consulta')[0].style.display = 'block';
        } else {
            document.getElementsByClassName('container-mapa-consulta')[0].style.display = 'none';
        }

        imagen.src = mascota.rutaImagen;
        nombre.textContent = mascota.nombre;
        raza.textContent = mascota.raza;
        tipo.textContent = mascota.tipo;
/*         if (!mascota.ubicacionExacta.name){
            ubicacion.textContent = mascota.ubicacion;
        }else{
            ubicacion.textContent = mascota.ubicacionExacta.name;
        } */
        ubicacion.textContent = mascota.ubicacion;
        edad.textContent = mascota.edad + " " + mascota.periodo;
        descripcion.textContent = mascota.descripcion;

        let botonSolicitud = document.getElementById("botonMostrarSolicitud");

        botonSolicitud.addEventListener("click", () => {
            this.mostrarSolicitud();
            solicitudParticipanteDueno = indiceParticipante;
            solicitudMascotaSoli = indiceMascota; 
        });
    }
    // Llenar los datos de perfil con la persona que inicio sesion
    llenarDatosPerfil(){
        // Seccion del perfil
        document.getElementById("nombrePerfil").placeholder = participanteEnLinea.nombre;
        document.getElementById("apellidoPerfil").placeholder = participanteEnLinea.apellido;
        document.getElementById("correoPerfil").placeholder = participanteEnLinea.correo;
        
        // esto es para dar la fecha escritra
        var fechaNacimiento = new Date(participanteEnLinea.fechaDeNacimiento); 
        var opciones = {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        };
        var fechaEnEspañol = fechaNacimiento.toLocaleDateString('es-ES', opciones);
        /////
        document.getElementById("fechaDeNacimientoPerfil").placeholder = fechaEnEspañol;

        // Seccion de mis mascotas
        let listaMascotasPerfil = document.querySelector(".listaMascotas");
        let listaAnunciosPerfil = document.querySelector(".listaAnuncios");
        listaMascotasPerfil.innerHTML = '';
        listaAnunciosPerfil.innerHTML = '';
        if (participanteEnLinea.listaMascota.length === 0){
            let seccionMascota = document.createElement("section");
            let texto = document.createElement("span");

            texto.textContent = "No ha añadido mascotas todavía...";
            seccionMascota.appendChild(texto);
            listaMascotasPerfil.appendChild(seccionMascota);
        }else{
            listaMascotasPerfil.innerHTML = '';
            let contador=0;
            for (let mascota of participanteEnLinea.listaMascota){               
                
                // Crear elementos
                
                let imagenMascota = document.createElement("img");
                let seccionMascota = document.createElement("section");
                let seccionInfo = document.createElement("section");
                let seccionTotal = document.createElement("seccionTotal");
                let nombre = document.createElement("h2");
                let raza = document.createElement("p");
                let container = document.createElement("div");
                let tipo = document.createElement("h2");
                let ubicacion = document.createElement("h1");
                let edad = document.createElement("h1");
                let descripcion = document.createElement("h1");

                //Configura Eliminar Mascota
                let botonEliminarMascota= document.createElement("button");
                let botonModificarMascota= document.createElement("button");
                let seccionConfirmacion= document.createElement("section");
                let botonConfirmarEliminarMascota= document.createElement("button");
                let botonCancelarEliminarMascota=document.createElement("button");
                let seccionGestionMascota=document.createElement("section");
                let seccionBotonesModificarEliminar=document.createElement("section");
                let imagenEliminar= document.createElement("img");
                imagenEliminar.src="../Imagenes/papelera.png";
                imagenEliminar.style.width="30px";
                imagenEliminar.style.height="30px";

                botonEliminarMascota.appendChild(imagenEliminar);

                botonEliminarMascota.addEventListener("mouseenter", function() {
                    imagenEliminar.classList.add("imagenEliminarMascota");
                });
                  
                botonEliminarMascota.addEventListener("mouseleave", function() {
                    imagenEliminar.classList.remove("imagenEliminarMascota");
                });

                let imagenModificar= document.createElement("img");
                imagenModificar.src="../Imagenes/IconoEditar.png";
                imagenModificar.style.width="30px";
                imagenModificar.style.height="30px";
    
                botonModificarMascota.appendChild(imagenModificar);
    
                botonModificarMascota.addEventListener("mouseenter", function() {
                    imagenModificar.classList.add("imagenEliminarMascota");
                });
                      
                botonModificarMascota.addEventListener("mouseleave", function() {
                    imagenModificar.classList.remove("imagenEliminarMascota");
                });

                seccionBotonesModificarEliminar.appendChild(botonEliminarMascota);
                seccionBotonesModificarEliminar.appendChild(botonModificarMascota);
                seccionGestionMascota.appendChild(seccionBotonesModificarEliminar);
                seccionGestionMascota.appendChild(seccionConfirmacion);
                botonModificarMascota.className="botonModificarMascota";
                botonEliminarMascota.className="botonEliminarMascota";
                seccionConfirmacion.className="confirmacionEliminarMascota";
                
                
                
                botonConfirmarEliminarMascota.className="botonConfirmarEliminarMascota";
                botonCancelarEliminarMascota.className="botonCancelarEliminarMascota";
                let mensajeConfirmacion = document.createElement("h1");

                mensajeConfirmacion.textContent="¿Eliminar la Mascota?";
                mensajeConfirmacion.style.fontSize="15px";
                mensajeConfirmacion.style.color="#E87229";
                seccionConfirmacion.appendChild(mensajeConfirmacion);
                seccionConfirmacion.appendChild(botonConfirmarEliminarMascota);
                seccionConfirmacion.appendChild(botonCancelarEliminarMascota);
                botonModificarMascota.dataset.indiceMascota=contador;
                botonConfirmarEliminarMascota.dataset.indiceMascota=contador;
                this.personalizarGestionMascota (seccionBotonesModificarEliminar,botonEliminarMascota,botonModificarMascota,seccionConfirmacion,seccionGestionMascota,botonConfirmarEliminarMascota,botonCancelarEliminarMascota);

                let botonListaSolicitudes = document.createElement('button');
                botonListaSolicitudes.textContent = "Ver solicitudes pendientes";
                botonListaSolicitudes.className = "botonVerSolicitudes";
                botonListaSolicitudes.addEventListener('click', () => { this.mostrarModal(mascota)});

                //Nahomy
                seccionInfo.className = "seccionInfo";
                nombre.textContent = mascota.nombre;
                raza.textContent = mascota.raza;
                tipo.textContent = mascota.tipo;
                ubicacion.textContent = mascota.ubicacion;
                edad.textContent = mascota.edad + " " + mascota.periodo;
                descripcion.textContent = mascota.descripcion;


                imagenMascota.src = mascota.rutaImagen;
                seccionMascota.appendChild(imagenMascota);
                container.appendChild(tipo);
                container.appendChild(ubicacion);
                container.appendChild(edad);
                container.appendChild(descripcion);
                seccionInfo.appendChild(nombre);
                seccionInfo.appendChild(raza);
                seccionInfo.appendChild(container);
                seccionInfo.style.width="300px";
                seccionTotal.className = "miMascota";
                //agregar elementos
                
                seccionTotal.style.padding="10px";
                seccionTotal.appendChild(seccionMascota);
                seccionTotal.appendChild(seccionInfo);                
                seccionTotal.appendChild(seccionGestionMascota);
                listaMascotasPerfil.appendChild(seccionTotal);
                if (mascota.tipo === "Callejera" || mascota.tipo === "Extraviada"){
                    listaAnunciosPerfil.appendChild(seccionTotal);
                }else{
                    seccionTotal.appendChild(botonListaSolicitudes);
                   listaMascotasPerfil.appendChild(seccionTotal); 
                }
                contador++;
            }
        
        }
        // Seccion de mis solicitudes
        let listaSolicitudesPerfil = document.querySelector(".listaSolicitudes");
        if (participanteEnLinea.listaSolicitudes.length === 0){
            listaSolicitudesPerfil.innerHTML = '';
            let seccionMiSolicitudTotal = document.createElement("section");
            let texto = document.createElement("span");
            texto.textContent = "No ha realizado solicitudes todavía...";
            seccionMiSolicitudTotal.appendChild(texto);
            listaSolicitudesPerfil.appendChild(seccionMiSolicitudTotal);
        }else{
            listaSolicitudesPerfil.innerHTML = '';
            for (let i = 0 ; i < participanteEnLinea.listaSolicitudes.length ; i++){
                let solicitud = participanteEnLinea.listaSolicitudes[i];
                // crear elementos
                let seccionMiSolicitudTotal = document.createElement("section");
                let seccionImg = document.createElement("section");
                let imagenSoli = document.createElement("img");
                let nombreSoli = document.createElement("span");
                let iconoSoli = document.createElement("i");
                let ubicacionSoli = document.createElement("span");
                let textoUbicacionSoli = document.createTextNode(solicitud.mascota.ubicacion);
                let estatusSoli = document.createElement("span");
                let botonVerSoli = document.createElement("span");

                //configurar Eliminar y Modificar Solicitud
                let botonEliminarSolicitud= document.createElement("botonEliminarSolicitud");
                let botonModificarSolicitud= document.createElement("botonModificarSolicitud");

                let seccionConfirmacionSolicitud = document.createElement("section");
                let botonConfirmarEliminarSolicitud= document.createElement("button");
                let botonCancelarEliminarSolicitud=document.createElement("button");
                let seccionGestionSolicitud=document.createElement("section");
                let seccionBotonesModificarEliminarSolicitud =document.createElement("section");

                

                let imagenEliminar= document.createElement("img");
                imagenEliminar.src="../Imagenes/papelera.png";
                imagenEliminar.style.width="30px";
                imagenEliminar.style.height="30px";

                botonEliminarSolicitud.appendChild(imagenEliminar);

                botonEliminarSolicitud.addEventListener("mouseenter", function() {
                    imagenEliminar.classList.add("imagenEliminarSolicitud");
                });
                  
                botonEliminarSolicitud.addEventListener("mouseleave", function() {
                    imagenEliminar.classList.remove("imagenEliminarSolicitud");
                });

                let imagenModificar= document.createElement("img");
                imagenModificar.src="../Imagenes/IconoEditar.png";
                imagenModificar.style.width="30px";
                imagenModificar.style.height="30px";
    
                botonModificarSolicitud.appendChild(imagenModificar);
    
                botonModificarSolicitud.addEventListener("mouseenter", function() {
                    imagenModificar.classList.add("imagenEliminarSolicitud");
                });
                      
                botonModificarSolicitud.addEventListener("mouseleave", function() {
                    imagenModificar.classList.remove("imagenEliminarSolicitud");
                });

                seccionBotonesModificarEliminarSolicitud.appendChild(botonEliminarSolicitud);
                seccionBotonesModificarEliminarSolicitud.appendChild(botonModificarSolicitud);
                seccionGestionSolicitud.appendChild(seccionBotonesModificarEliminarSolicitud);
                seccionGestionSolicitud.appendChild(seccionConfirmacionSolicitud);
                botonModificarSolicitud.className="botonModificarSolicitud";
                botonEliminarSolicitud.className="botonEliminarSolicitud";
                seccionConfirmacionSolicitud.className="confirmacionEliminarolicitud";
                
                botonConfirmarEliminarSolicitud.className="botonConfirmarEliminarSolicitud";
                botonCancelarEliminarSolicitud.className="botonCancelarEliminarSolicitud";
                let mensajeConfirmacionSolicitud = document.createElement("h1");

                mensajeConfirmacionSolicitud.textContent="¿Eliminar la Solicitud?";
                mensajeConfirmacionSolicitud.style.fontSize="15px";
                mensajeConfirmacionSolicitud.style.color="#E87229";
                seccionConfirmacionSolicitud.appendChild(mensajeConfirmacionSolicitud);
                seccionConfirmacionSolicitud.appendChild(botonConfirmarEliminarSolicitud);
                seccionConfirmacionSolicitud.appendChild(botonCancelarEliminarSolicitud);
                let indiceSolicitud = participanteEnLinea.listaSolicitudes.indexOf(solicitud);
                
                botonModificarSolicitud.dataset.indiceSolicitud= indiceSolicitud;
                console.log(botonModificarSolicitud.dataset.indiceSolicitud);

                botonConfirmarEliminarSolicitud.dataset.indiceSolicitud= indiceSolicitud;
                this.personalizarGestionSolicitud(seccionBotonesModificarEliminarSolicitud,botonEliminarSolicitud,botonModificarSolicitud,seccionConfirmacionSolicitud,seccionGestionSolicitud,botonConfirmarEliminarSolicitud,botonCancelarEliminarSolicitud);


                seccionMiSolicitudTotal.className = "miSolicitudTotal";
                seccionImg.className ="miSolicitud";
                iconoSoli.className = "fa-solid fa-location-dot";
                ubicacionSoli.className = "info";
                estatusSoli.className = "info";
                botonVerSoli.className = "btnMostrarSolicitudRealizada";

                imagenSoli.src = solicitud.mascota.rutaImagen;
                seccionImg.appendChild(imagenSoli);
                nombreSoli.textContent = solicitud.mascota.nombre;
                ubicacionSoli.appendChild(iconoSoli);
                ubicacionSoli.appendChild(textoUbicacionSoli);
                estatusSoli.textContent = "Estatus: " + solicitud.estatus;
                botonVerSoli.textContent = "Ver solicitud";

                botonVerSoli.dataset.indiceSolicitud = i; 

                botonVerSoli.addEventListener("click", () => { this.mostrarSolicitudRealizada(botonVerSoli.dataset.indiceSolicitud)});

                seccionMiSolicitudTotal.appendChild(seccionImg);
                seccionMiSolicitudTotal.appendChild(nombreSoli);
                seccionMiSolicitudTotal.appendChild(ubicacionSoli);
                seccionMiSolicitudTotal.appendChild(estatusSoli);
                seccionMiSolicitudTotal.appendChild(botonVerSoli);
                seccionMiSolicitudTotal.appendChild(seccionGestionSolicitud);
                listaSolicitudesPerfil.appendChild(seccionMiSolicitudTotal);
        }
    }
}

mostrarModal(mascota){
    let solicitudAceptada = false;
    var modalListaSolicitudes = document.getElementById("myModal");
    var listaSolicitudesModal = document.getElementById("listaSolicitudesModal");
    modalListaSolicitudes.style.display = "block";
    listaSolicitudesModal.innerHTML=`
    <div id="encabezadoModal"> 
        <img src="${mascota.rutaImagen}" alt="" id="imagenModal" id="imagenModal">
        <h2 id="nombreModal">${mascota.nombre}</h2>
    </div>
    <div id="solicitudesModal">Mis solicitudes</div>
    <div id="solicitudesLista">
        
    </div>
    `
    let solicitudesLista = document.getElementById("solicitudesLista");
    let haySolicitudes = false;
    let cont = 0;
    for (let i=0 ; i<listaParticipantes.length ; i++){
        let participante = listaParticipantes[i];
        for (let j=0 ; j < participante.listaSolicitudes.length ; j++){
            if (participante.listaSolicitudes[j].mascota.nombre === mascota.nombre){
                solicitudesLista.innerHTML +=`
                <div class="solicitud">
                    <h3 class="textoModal">Realizada por: ${participante.nombre}</h2>
                    <h3 class="textoModal">Estatus: ${participante.listaSolicitudes[j].estatus}</h3>
                    <h3 class="textoModal">Correo: ${participante.correo}</h3>


                </div>
                `     

                const grupoBotonesModal = document.createElement('div');
                grupoBotonesModal.classList.add('grupoBotonesModal');
                const botonAceptar = document.createElement('button');
                botonAceptar.classList.add('botonesModal');
                botonAceptar.classList.add('botonesAceptar');
                botonAceptar.textContent = 'Aceptar';
                botonAceptar.dataset.indiceSolicitud = participante.listaSolicitudes[j].nroId;
                botonAceptar.dataset.indiceParticipante = i;

                const botonRechazar = document.createElement('button');
                botonRechazar.classList.add('botonesModal');
                botonRechazar.classList.add('botonesRechazar');
                botonRechazar.textContent = 'Rechazar';
                botonRechazar.dataset.indiceSolicitud = participante.listaSolicitudes[j].nroId;
                botonRechazar.dataset.indiceParticipante = i;


                if (!this.haySolicitudAceptada(participante.listaSolicitudes)){
                    grupoBotonesModal.appendChild(botonAceptar);
                }
                grupoBotonesModal.appendChild(botonRechazar);
                

                const solicitudNro = document.getElementsByClassName("solicitud")[cont];
                solicitudNro.appendChild(grupoBotonesModal);
                cont++;
                haySolicitudes = true;

            }
         }
    }

    if(!haySolicitudes){
        solicitudesLista.innerHTML =`
            <span class="textoModal">No hay solicitudes pendientes </span>
            `
    }else{
        const botonesAceptar = document.getElementsByClassName("botonesAceptar");
        const botonesRechazar = document.getElementsByClassName("botonesRechazar");
        for (let i = 0; i < botonesAceptar.length; i++) {
            if(solicitudesAceptadas.includes(botonesAceptar[i].dataset.indiceSolicitud)){
                botonesAceptar[i].style.display = 'none';
                botonesRechazar[i].style.display = 'none';
            }
            botonesAceptar[i].addEventListener('click', () => {
                this.aceptarSolicitud(botonesAceptar[i].dataset.indiceSolicitud, botonesAceptar[i].dataset.indiceParticipante, mascota);
                botonesAceptar[i].style.display = 'none';
                botonesRechazar[i].style.display = 'none';
            });
        }
    
        for (let i = 0; i < botonesRechazar.length; i++) {
            if(solicitudesRechazadas.includes(botonesRechazar[i].dataset.indiceSolicitud)){
                botonesAceptar[i].style.display = 'none';
                botonesRechazar[i].style.display = 'none';
            }
            botonesRechazar[i].addEventListener('click', () => {
                this.rechazarSolicitud(botonesRechazar[i].dataset.indiceSolicitud, botonesRechazar[i].dataset.indiceParticipante, mascota);
                botonesAceptar[i].style.display = 'none';
                botonesRechazar[i].style.display = 'none';
            });
        }
    }
}

haySolicitudAceptada(listaSolicitudes){
    for (let i = 0 ; i < listaSolicitudes.length ; i++){
        if (listaSolicitudes[i].estatus === "Aprobada"){
            return true;
        }
    }
    return false;
}

aceptarSolicitud(indiceSolicitud,indiceParticipante,mascota){
    let solicitudEncontrada = this.buscarParticipantePorSolicitud(indiceSolicitud);
    let correoDuenoSolicitud;


     for (let i=0 ; i<listaParticipantes.length ; i++){
        let participante = listaParticipantes[i];
        for (let j=0 ; j < participante.listaSolicitudes.length ; j++){
            if (participante.listaSolicitudes[j].mascota.nombre === mascota.nombre){
               correoDuenoSolicitud =  participante.correo;
            }
        }
    }
    
    listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].estatus = "Aprobada";
    manejoDatos.actualizarParticipante(listaParticipantes[indiceParticipante]);
    solicitudesAceptadas.push(indiceSolicitud);
    localStorage.setItem('solicitudesAceptadas', JSON.stringify(solicitudesAceptadas));
    this.enviarCorreoSolicitudEstatus(this.obtenerParametrosSolicitudEstatus(correoDuenoSolicitud,listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].estatus, mascota));
    this.mostrarModal(listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].mascota);
}

        enviarCorreoSolicitudEstatus(params){
            emailjs.init('AfYUc2SOn7tBoVtYy');
            emailjs.send("service_qylt8ci", "template_vf801q9", params);

        }

        rechazarSolicitud(indiceSolicitud, indiceParticipante, mascota){
            let solicitudEncontrada = this.buscarParticipantePorSolicitud(indiceSolicitud);
            let correoDuenoSolicitud;

            for (let i=0 ; i<listaParticipantes.length ; i++){
                let participante = listaParticipantes[i];
                for (let j=0 ; j < participante.listaSolicitudes.length ; j++){
                    if (participante.listaSolicitudes[j].mascota.nombre === mascota.nombre){
                    correoDuenoSolicitud =  participante.correo;
                    }
                }
            } 

            listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].estatus = "Rechazada";
            manejoDatos.actualizarParticipante(listaParticipantes[indiceParticipante]);
            solicitudesRechazadas.push(indiceSolicitud);
            localStorage.setItem('solicitudesRechazadas', JSON.stringify(solicitudesRechazadas));
            this.enviarCorreoSolicitudEstatus(this.obtenerParametrosSolicitudEstatus(correoDuenoSolicitud, listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].estatus , mascota));
            this.mostrarModal(listaParticipantes[indiceParticipante].listaSolicitudes[solicitudEncontrada].mascota);
        }

    obtenerParametrosSolicitudEstatus(correo,estatus,mascota){
        const solicitudParticipante = listaParticipantes[solicitudParticipanteDueno];  

        return {
            correoParticipante : correo,
            estatusSolicitud : estatus,
            participanteDuenoNombre: solicitudParticipante.nombre,
            participanteDuenoCorreo: solicitudParticipante.correo,
            mascotaNombre: mascota.nombre,
            participanteEnLineaNombre: participanteEnLinea.nombre,
            participanteEnLineaCorreo: participanteEnLinea.correo,
        };
    }

    buscarParticipantePorSolicitud(indiceNumeroSolicitud){
        let solicitudIndice;
        for( let i = 0 ; i< listaParticipantes.length ; i++){
            let participante = listaParticipantes[i];
            for (let j = 0 ; j < participante.listaSolicitudes.length ; j++){
                if (String(participante.listaSolicitudes[j].nroId) === String(indiceNumeroSolicitud)){
                    solicitudIndice = j;
                    break;
                }
            }
        }
        return solicitudIndice;
    }
    personalizarGestionMascota (seccionBotonesModificarEliminar,botonEliminarMascota,botonModificarMascota,seccionConfirmacion,seccionGestionMascota,botonConfirmarEliminarMascota,botonCancelarEliminarMascota){
        //Edicion Boton Eliminar
        botonEliminarMascota.style.width="60px";
        botonEliminarMascota.style.height="40px";
        botonEliminarMascota.style.position="static";
        botonEliminarMascota.style.float="right";
        botonEliminarMascota.style.borderRadius="30px";
        botonEliminarMascota.style.border="none";
        botonEliminarMascota.style.display = "flex";
        botonEliminarMascota.style.alignItems = "center";
        botonEliminarMascota.style.justifyContent = "center";
        botonEliminarMascota.style.gap = "8px";
        
        botonEliminarMascota.addEventListener("mouseenter", function() {
            this.classList.add("hover-style");
        });
          
        botonEliminarMascota.addEventListener("mouseleave", function() {
            this.classList.remove("hover-style");
        });
        //Edicion Boton Modificar  
        botonModificarMascota.style.width="60px";
        botonModificarMascota.style.height="40px";
        botonModificarMascota.style.position="absolute";
        botonModificarMascota.style.float="right";
        botonModificarMascota.style.borderRadius="30px";
        botonModificarMascota.style.border="none";
        botonModificarMascota.style.display = "flex";
        botonModificarMascota.style.alignItems = "center";
        botonModificarMascota.style.justifyContent = "center";
        botonModificarMascota.style.gap = "8px";
        botonModificarMascota.style.top = "50%";
        botonModificarMascota.style.left = "50%";
        botonModificarMascota.style.transform = "translate(-140%, -125%)";

        botonModificarMascota.addEventListener("mouseenter", function() {
            this.classList.add("hover-style");
        });
          
        botonModificarMascota.addEventListener("mouseleave", function() {
            this.classList.remove("hover-style");
        });
        
        //Edicion Botones Eliminar Modificar
        seccionBotonesModificarEliminar.style.width="150px";
        seccionBotonesModificarEliminar.style.height="40px";
        seccionBotonesModificarEliminar.style.position="relative";
        seccionBotonesModificarEliminar.style.float="right";
        seccionBotonesModificarEliminar.style.display="block";

        //Edicion Seccion Gestionar Mascota
        seccionGestionMascota.style.width="150px";
        seccionGestionMascota.style.height="100px";
        seccionGestionMascota.style.position = "static";

        //Edicion Seccion Confirmar Eliminar Mascota
        seccionConfirmacion.style.width="200px";
        seccionConfirmacion.style.position="static";
        seccionConfirmacion.style.float="right";
        seccionConfirmacion.style.display="none";

        //Edicion Boton Confirmar
        botonConfirmarEliminarMascota.style.width="100px";
        botonConfirmarEliminarMascota.style.height="30px";
        botonConfirmarEliminarMascota.textContent="Confirmar";
        botonConfirmarEliminarMascota.style.fontSize="15px";
        botonConfirmarEliminarMascota.style.fontWeight="600";
        botonConfirmarEliminarMascota.style.color="black";
        botonConfirmarEliminarMascota.style.borderRadius="30px";
        botonConfirmarEliminarMascota.style.border="none";
        botonConfirmarEliminarMascota.style.margin="3px";

        //Edicion Boton Cancelar
        botonCancelarEliminarMascota.style.width="100px";
        botonCancelarEliminarMascota.style.height="30px";
        botonCancelarEliminarMascota.textContent="Cancelar";
        botonCancelarEliminarMascota.style.fontSize="15px";
        botonCancelarEliminarMascota.style.fontWeight="600";
        botonCancelarEliminarMascota.style.color="black";
        botonCancelarEliminarMascota.style.borderRadius="30px";
        botonCancelarEliminarMascota.style.border="none";
        botonCancelarEliminarMascota.style.margin="3px";

        botonConfirmarEliminarMascota.addEventListener("mouseenter", function() {
            this.classList.add("hover-style");
        });
          
        botonConfirmarEliminarMascota.addEventListener("mouseleave", function() {
            this.classList.remove("hover-style");
        });

        botonCancelarEliminarMascota.addEventListener("mouseenter", function() {
            this.classList.add("hover-style");
        });
          
        botonCancelarEliminarMascota.addEventListener("mouseleave", function() {
            this.classList.remove("hover-style");
        });

        //Eliminar Mascota
        botonEliminarMascota.addEventListener("click",()=>this.eliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,seccionConfirmacion));
        botonCancelarEliminarMascota.addEventListener("click",()=>this.cancelarEliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,seccionConfirmacion));
        botonConfirmarEliminarMascota.addEventListener("click",()=>this.confirmarEliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,botonCancelarEliminarMascota,botonConfirmarEliminarMascota,seccionConfirmacion,botonConfirmarEliminarMascota.dataset.indiceMascota));
        
                
        //Modificar Mascota
        botonModificarMascota.addEventListener("click",()=>{this.cambiarPanelModificarMascota(botonConfirmarEliminarMascota.dataset.indiceMascota)});
    }

    personalizarGestionSolicitud(seccionBotonesModificarEliminarSolicitud,botonEliminarSolicitud,botonModificarSolicitud,seccionConfirmacionSolicitud,seccionGestionSolicitud,botonConfirmarEliminarSolicitud,botonCancelarEliminarSolicitud){
        console.log('entra en solicitudes');
          //Edicion Boton Eliminar
      botonEliminarSolicitud.style.width="60px";
      botonEliminarSolicitud.style.height="40px";
      botonEliminarSolicitud.style.position="relative";
      botonEliminarSolicitud.style.float="right";
      botonEliminarSolicitud.style.borderRadius="30px";
      botonEliminarSolicitud.style.border="none";
      botonEliminarSolicitud.style.display = "flex";
      botonEliminarSolicitud.style.alignItems = "center";
      botonEliminarSolicitud.style.justifyContent = "center";
     // botonEliminarSolicitud.style.gap = "8px";
      
      botonEliminarSolicitud.addEventListener("mouseenter", function() {
          this.classList.add("hover-style");
      });
        
      botonEliminarSolicitud.addEventListener("mouseleave", function() {
          this.classList.remove("hover-style");
      });
      //Edicion Boton Modificar  
      botonModificarSolicitud.style.width="60px";
      botonModificarSolicitud.style.height="40px";
      botonModificarSolicitud.style.position="relative";
      botonModificarSolicitud.style.float="right";
      botonModificarSolicitud.style.borderRadius="30px";
      botonModificarSolicitud.style.border="none";
      botonModificarSolicitud.style.display = "flex";
      botonModificarSolicitud.style.alignItems = "center";
      botonModificarSolicitud.style.justifyContent = "center";
      botonModificarSolicitud.style.gap = "8px";
      botonModificarSolicitud.style.top = "50%";
      botonModificarSolicitud.style.left = "50%";
      botonModificarSolicitud.style.transform = "translate(-140%, -50%)";

      botonModificarSolicitud.addEventListener("mouseenter", function() {
          this.classList.add("hover-style");
      });
        
      botonModificarSolicitud.addEventListener("mouseleave", function() {
          this.classList.remove("hover-style");
      });
      
      //Edicion Botones Eliminar Modificar
      seccionBotonesModificarEliminarSolicitud.style.width="150px";
      seccionBotonesModificarEliminarSolicitud.style.height="40px";
      seccionBotonesModificarEliminarSolicitud.style.position="relative";
      seccionBotonesModificarEliminarSolicitud.style.float="right";
      seccionBotonesModificarEliminarSolicitud.style.display="block";
      seccionBotonesModificarEliminarSolicitud.style.top = 0; 
      seccionBotonesModificarEliminarSolicitud.styleright = 0; 

      //Edicion Seccion Gestionar Mascota
      seccionGestionSolicitud.style.width="150px";
      seccionGestionSolicitud.style.height="190px";
      seccionGestionSolicitud.style.position = "static";

      //Edicion Seccion Confirmar Eliminar Mascota
      seccionConfirmacionSolicitud.style.width="200px";
      seccionConfirmacionSolicitud.style.position="static";
      seccionConfirmacionSolicitud.style.float="right";
      seccionConfirmacionSolicitud.style.display="none";

      //Edicion Boton Confirmar
      botonConfirmarEliminarSolicitud.style.width="100px";
      botonConfirmarEliminarSolicitud.style.height="30px";
      botonConfirmarEliminarSolicitud.textContent="Confirmar";
      botonConfirmarEliminarSolicitud.style.fontSize="15px";
      botonConfirmarEliminarSolicitud.style.fontWeight="600";
      botonConfirmarEliminarSolicitud.style.color="black";
      botonConfirmarEliminarSolicitud.style.borderRadius="30px";
      botonConfirmarEliminarSolicitud.style.border="none";
      botonConfirmarEliminarSolicitud.style.margin="3px";

      //Edicion Boton Cancelar
      botonCancelarEliminarSolicitud.style.width="100px";
      botonCancelarEliminarSolicitud.style.height="30px";
      botonCancelarEliminarSolicitud.textContent="Cancelar";
      botonCancelarEliminarSolicitud.style.fontSize="15px";
      botonCancelarEliminarSolicitud.style.fontWeight="600";
      botonCancelarEliminarSolicitud.style.color="black";
      botonCancelarEliminarSolicitud.style.borderRadius="30px";
      botonCancelarEliminarSolicitud.style.border="none";
      botonCancelarEliminarSolicitud.style.margin="3px";

      botonConfirmarEliminarSolicitud.addEventListener("mouseenter", function() {
          this.classList.add("hover-style");
      });
        
      botonConfirmarEliminarSolicitud.addEventListener("mouseleave", function() {
          this.classList.remove("hover-style");
      });

      botonCancelarEliminarSolicitud.addEventListener("mouseenter", function() {
          this.classList.add("hover-style");
      });
        
      botonCancelarEliminarSolicitud.addEventListener("mouseleave", function() {
          this.classList.remove("hover-style");
      });

      botonEliminarSolicitud.addEventListener("click",()=>this.eliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarEliminarSolicitud,botonConfirmarEliminarSolicitud,seccionConfirmacionSolicitud));
      botonCancelarEliminarSolicitud.addEventListener("click",()=>this.cancelarEliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarEliminarSolicitud,botonConfirmarEliminarSolicitud,seccionConfirmacionSolicitud));
      botonConfirmarEliminarSolicitud.addEventListener("click",()=>this.confirmarEliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarEliminarSolicitud,botonConfirmarEliminarSolicitud,seccionConfirmacionSolicitud,botonConfirmarEliminarSolicitud.dataset.indiceSolicitud));
      botonModificarSolicitud.addEventListener("click",()=>{this.cambiarPanelModificarSolicitud(botonModificarSolicitud.dataset.indiceSolicitud)});
      }


    mostrarSolicitudRealizada(indiceSolicitud){
        // indiceSolicitud te sirve para ubicar la solicitud cuando 
        //muestra verSolicitud y accedes asi participanteEnLinea.listaSolicitudes[indiceSolicitud]
        let mascota = participanteEnLinea.listaSolicitudes[indiceSolicitud].mascota;

        document.getElementById('solicitudConsultada').style.display = 'block';
        document.getElementById('perfilGeneral').style.display = 'none';

         let imagen = document.querySelector(".container-consultar img");
        let nombre = document.querySelector("#nombreMascota");
        let especie = document.querySelector(".especie");
        let edad= document.querySelector(".container-consultar .edad");
        let ubicacion = document.querySelector(".container-consultar .ubicacion");

        imagen.src = mascota.rutaImagen;
        nombre.textContent = mascota.nombre;
        especie.textContent = mascota.especie;
        edad.textContent = mascota.edad;
        ubicacion.textContent = mascota.ubicacion;

        let solicitud = participanteEnLinea.listaSolicitudes[indiceSolicitud];

        let tipoVivienda = document.querySelector(".tipoVivienda");
        let vivienda = document.querySelector(".viviendaPropia");
        let landlord = document.querySelector(".alquilado");
        let jardin = document.querySelector(".jardin");
        let horario = document.querySelector(".horario");
        let vacaciones = document.querySelector(".vacaciones");
        let razon = document.querySelector(".razonAdopcion");
        let responsable = document.querySelector(".responsable");
        let decision = document.querySelector(".compartenDecision");
        let sleepPlace = document.querySelector(".sleepPlace");
        let animales = document.querySelector(".animalesActuales");
        let infoMascotas = document.querySelector(".infoMascotas");
        let caracter = document.querySelector(".caracterMascota");

        tipoVivienda.textContent = solicitud.vivienda;
        vivienda.textContent = solicitud.tipoVivienda;
        landlord.textContent = solicitud.autorizadoEnAlquiler;
        jardin.textContent = solicitud.conJardin;
        horario.textContent = solicitud.horarioLaboral;
        vacaciones.textContent = solicitud.situacionVacaciones;
        razon.textContent = solicitud.motivoAdopcion;
        responsable.textContent = solicitud.familiarResponsable;
        decision.textContent = solicitud.decisionCompartida;
        sleepPlace.textContent = solicitud.lugarDeDormir;
        animales.textContent = solicitud.otrosAnimales;
        infoMascotas.textContent = solicitud.descripcionOtrosAnimales;
        caracter.textContent = solicitud.caracterMascota;
    }

    ocultarConsulta(){
        document.getElementById('consultarEscondido').style.display = 'none';
        document.getElementById('catalogoMostrado').style.display = 'block';
    }
    // Mostrar y ocultar solicitud 
    mostrarSolicitud(){
        document.getElementById('consultarEscondido').style.display = 'none';
        document.getElementById('solicitudEscondida').style.display = 'block';
    }
    ocultarSolicitud(){
        document.getElementById('solicitudEscondida').style.display = 'none';
        document.getElementById('consultarEscondido').style.display = 'block';
    }
    // Mostrar mascotas en adopcion o perdidas
    mostrarEnAdopcion(){
        document.getElementById('mascotasPerdidas').style.display = 'none';
        document.getElementById('mascotasEnAdopcion').style.display = 'block';
        document.getElementById('mascotasCallejeras').style.display = 'none';
    }
    mostrarPerdidas(){
        document.getElementById('mascotasEnAdopcion').style.display = 'none';
        document.getElementById('mascotasPerdidas').style.display = 'block';
        document.getElementById('mascotasCallejeras').style.display = 'none';
    }
    mostrarCallejeras(){
        document.getElementById('mascotasPerdidas').style.display = 'none';
        document.getElementById('mascotasEnAdopcion').style.display = 'none';
        document.getElementById('mascotasCallejeras').style.display = 'block';
    }
    regresarPerfil(){
        document.getElementById('solicitudConsultada').style.display = 'none';
        document.getElementById('perfilGeneral').style.display = 'block';
    }
        /*********Validaciones del Formulario********/

    //Valida que haya sido seleccionado el CheckBox Condicion antes de enviar el formulario

    //Permite elegir solo un Radio Button de cada grupo de opciones dado
    deseleccionarOpciones(event){
        var botonesOpcion = event.target.parentNode.getElementsByClassName(event.target.className);
        for (var i = 0; i < botonesOpcion.length; i++) {
            if (botonesOpcion[i].checked) {
                botonesOpcion[i].checked = false;
            }
        }
        event.target.checked = true;
    }
    // Registra el evento de cambio en los botones de radio
    cambioBotonesRadio(event){
        event.preventDefault();

        const selectTipoVivienda = document.getElementById("selectTipoVivienda").value;
        const radioPropia = document.getElementById("propia");
        const radioAlquiler = document.getElementById("alquiler");
        const radioJardin = document.getElementById("jardin");
        const radioNoJardin = document.getElementById("noJardin");
        const radioLandlord = document.getElementById("landlord");
        const radioLandlordNo = document.getElementById("landlordNo");
    
        radioPropia.addEventListener("change", function() {
        if (radioPropia.checked) {
            const valorSeleccionado = radioPropia.value;
        } else {
            const valorSeleccionado = radioAlquiler.value;
        }
        });
    }
    //Funcion para guardar el radioButton elegido en un grupo de ellos.
     getRadioValue(groupName) {
    var radioGroup = document.getElementsByName(groupName);
    for (var i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
            return radioGroup[i].value;
        }
    }
    return null; 
    }
    

    ocultarSolicitudRegresarPerfil(){
        document.getElementById('solicitudEscondida').style.display = "none";
        document.getElementById('catalogoMostrado').style.display = "block";
        console.log("entra aqui yea");
        //Limpiar los campos de texto
        document.getElementById("selectTipoVivienda").value = "";
        document.getElementById("horarioLaboral").value = "";
        document.getElementById("vacacionesMascota").value = "";
        document.getElementById("razonAdopcion").value = "";
        document.getElementById("responsableMascota").value = "";
        document.getElementById("lugarDormir").value = "";
        document.getElementById("infoOtrasMascotas").value = "";
        document.getElementById("caracterMascota").value = "";
    
        // Restablecer los valores de los radio buttons
        document.querySelector("input[name='grupoOpciones1'][value='']").checked = true;
        document.querySelector("input[name='grupoOpciones2'][value='']").checked = true;
        document.querySelector("input[name='grupoOpciones3'][value='']").checked = true;
        document.querySelector("input[name='grupoOpciones4'][value='']").checked = true;
        document.querySelector("input[name='grupoOpciones5'][value='']").checked = true;
  
        // Restablecer el estado del checkbox
        document.getElementById("checkboxCondicion").checked = false;
    }
    SendMail() {
        const checkboxCondicion = document.getElementById('cbCondicion');
        if (!checkboxCondicion.checked) {
            this.mostrarMensajeError('Por favor, debe aceptar las condiciones antes de enviar el formulario.');
            return;
        }
    
        if (!this.validarCamposRequeridos()) {
            mostrarMensajeError('Por favor complete todos los campos requeridos antes de enviar el formulario.');
            return;
        }
    
        const params = this.obtenerParametros();
        this.enviarCorreo(params);

    }
    mostrarMensajeError(mensaje) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: mensaje,
          confirmButtonColor: '#E87229'
        });
        }
        
    validarCamposRequeridos() {
        const requiredFields = [
        "selectTipoVivienda",
        "horarioLaboral",
        "vacacionesMascota",
        "razonAdopcion",
        "responsableMascota",
        "lugarDormir",
        "caracterMascota"
        ];
    
        for (const field of requiredFields) {
            if (!document.getElementById(field).value) {
                return false;
        }

        if (!document.querySelector('input[name="grupoOpciones1"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpciones2"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpciones3"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpciones4"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpciones5"]:checked')) {
            return false;
        }
        }
        return true;
    }

    obtenerParametros() {
        const solicitudParticipante = listaParticipantes[solicitudParticipanteDueno];
        const mascota = solicitudParticipante.listaMascota[solicitudMascotaSoli];
    
        const viviendaSeleccionado = document.getElementById("selectTipoVivienda").value;
        const horario = document.getElementById("horarioLaboral").value;
        const vacaciones = document.getElementById("vacacionesMascota").value;
        const razonAdopcion = document.getElementById("razonAdopcion").value;
        const responsableMascota = document.getElementById("responsableMascota").value;
        const lugarDeDormir = document.getElementById("lugarDormir").value;
        const infoOtrasMascotas = document.getElementById("infoOtrasMascotas").value || 'N/A';
        const caracterMascota = document.getElementById("caracterMascota").value;
        const viviendaValue = this.getRadioValue("grupoOpciones1");
        const jardinValue = this.getRadioValue("grupoOpciones2");
        const landlordValue = this.getRadioValue("grupoOpciones3");
        const decisionValue = this.getRadioValue("grupoOpciones4");
        const animalesValue = this.getRadioValue("grupoOpciones5");
        cantidadSolicitudes = obtenerCantidadSolicitudes();
        let solicitud = new Solicitud(cantidadSolicitudes + 1,mascota, "Enviada", viviendaSeleccionado,viviendaValue,jardinValue,landlordValue,horario,vacaciones,razonAdopcion,responsableMascota,decisionValue,lugarDeDormir,animalesValue,infoOtrasMascotas,caracterMascota);
        solicitudAux.registrarSolicitud(participanteEnLinea,listaParticipantes,solicitud);
    
        return {
            participanteDuenoNombre: solicitudParticipante.nombre,
            participanteDuenoCorreo: solicitudParticipante.correo,
            mascotaNombre: mascota.nombre,
            participanteEnLineaNombre: participanteEnLinea.nombre,
            participanteEnLineaCorreo: participanteEnLinea.correo,
            viviendaSeleccionado,
            horario,
            vacaciones,
            razonAdopcion,
            responsableMascota,
            lugarDeDormir,
            infoOtrasMascotas,
            caracterMascota,
            viviendaValue,
            jardinValue,
            landlordValue,
            decisionValue,
            animalesValue
        };
    }

    
    enviarCorreo(params) {
        emailjs.init("pW34_L8jRcVMNMKaB");
        emailjs.send("service_z0sppkf", "template_p8n72ev", params)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Su solicitud fue enviada.',
              confirmButtonColor: '#E87229'
            }).then(() => {
            //   Swal.getConfirmButton().addEventListener('click', this.ocultarSolicitudRegresarPerfil.bind(this));
            this.ocultarSolicitudRegresarPerfil();
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'ERROR!',
              text: 'No se pudo enviar el correo' + error,
              confirmButtonColor: '#E87229'
            });
          });
        }

            enviarCorreoSolicitudEliminada(params){
                emailjs.init("pW34_L8jRcVMNMKaB");
                emailjs.send("service_z0sppkf", "template_jij9tq5", params)
            }

            obtenerParametrosSolicitudEliminada() {
                const solicitudParticipante = listaParticipantes[solicitudParticipanteDueno];
                const mascota = solicitudParticipante.listaMascota[solicitudMascotaSoli];
            
                return {
                    participanteDuenoNombre: solicitudParticipante.nombre,
                    participanteDuenoCorreo: solicitudParticipante.correo,
                    mascotaNombre: mascota.nombre,
                    participanteEnLineaNombre: participanteEnLinea.nombre,
                    participanteEnLineaCorreo: participanteEnLinea.correo,
                };
            }

    animalesRadioE(infoOtrasMascotasInput){
        if (this.value === 'Si') {
            infoOtrasMascotasInput.required = true;
          } else {
            infoOtrasMascotasInput.required = false;
          }
    }
      


    //*********************************************Nuevo**************************************/
    editarPerfil (editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual){
        editar.style.display='none';
        mostrarBotones.style.display='block';
        nombreEditar.disabled=false;
        nombreEditar.style.cursor='text';
        apellidoEditar.disabled=false;
        apellidoEditar.style.cursor='text';
        fechaNacimientoTxt.style.display= 'none';
        fechaDeNacimientoNueva.value="";
        fechaDeNacimientoNueva.style.display='flex';
        textoFecha.style.display='flex';
        soloMostrar.style.display='none';
        botonEliminarPerfil.style.display='none';
        seccionContraseniaNueva.style.display='inline-block';
        seccionContraseniaActual.style.display='inline-block';

    }
    cancelarEditarPerfil (editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar,errorEditar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual){
        editar.style.display='flex';
        mostrarBotones.style.display='none';
        nombreEditar.value='';
        nombreEditar.disabled= true;
        nombreEditar.style.cursor='default';
        apellidoEditar.value='';
        apellidoEditar.disabled= true;
        apellidoEditar.style.cursor='default';
        fechaNacimientoTxt.disabled= true;
        fechaNacimientoTxt.style.display='inline-block';
        fechaDeNacimientoNueva.style.display='none';
        textoFecha.style.display='none';
        soloMostrar.style.display='flex';
        errorEditar.textContent='';
        errorEditar.style.display='none';
        botonEliminarPerfil.style.display='flex';
        seccionContraseniaNueva.style.display='none';
        seccionContraseniaActual.style.display='none';
    }
    
    retornarNombreMes(mes) {
        let respuesta= "";
        switch (mes){
            case 1: respuesta= "Enero";
                    break;
            case 2: respuesta= "Febrero";
                    break;
            case 3: respuesta= "Marzo";
                    break;
            case 4: respuesta= "Abril";
                    break;
            case 5: respuesta="Mayo";
                    break;
            case 6: respuesta= "Junio";
                    break;
            case 7: respuesta= "Julio";
                    break;
            case 8: respuesta= "Agosto";
                    break;
            case 9: respuesta= "Septiembre";
                    break;
            case 10: respuesta= "Octubre";
                    break;
            case 11: respuesta= "Noviembre";
                    break;
            case 12: respuesta= "Diciembre";
                    break;
        }
        return respuesta;

    }
    guardarEditarPerfil (editar,mostrarBotones, guardar, cancelar, nombreEditar,apellidoEditar, fechaNacimientoTxt,fechaDeNacimientoNueva,textoFecha,soloMostrar, errorEditar,botonEliminarPerfil,cambiarContraseniaNueva,cambiarContraseniaActual,seccionContraseniaNueva,seccionContraseniaActual){
        
        const fechaActual = new Date();
        const date= new Date(fechaDeNacimientoNueva.value);
        let diaNacimiento=date.getDate()+1;
        let mesNacimiento= date.getMonth()+1;
        let anioNacimiento=date.getFullYear();
        let nombreMes = this.retornarNombreMes(date.getMonth()+1);
        let todoBien=true;

        if ((!isNaN(diaNacimiento))&&(!isNaN(diaNacimiento))&&(!isNaN(anioNacimiento))){
            if (((mesNacimiento>fechaActual.getMonth())&&(anioNacimiento=fechaActual.getFullYear()-18))||(anioNacimiento>fechaActual.getFullYear()-18)||(anioNacimiento<fechaActual.getFullYear()-100)){
                errorEditar.style.display='flex';
                errorEditar.textContent="Lo sentimos. Su edad debe estar entre los valores dados. Por favor ingrese una fecha válida.";
                todoBien=false;
            }else{
                if (fechaDeNacimientoNueva.value!==""){
                    participanteEnLinea.fechaDeNacimiento=fechaDeNacimientoNueva.value;
                }
            }
        } 

        if (nombreEditar.value!==""){
            participanteEnLinea.nombre=nombreEditar.value;
        }
        if (apellidoEditar.value!==""){
            participanteEnLinea.apellido=apellidoEditar.value;
        }         
        
        if (cambiarContraseniaNueva.value!==""){
            if (cambiarContraseniaActual.value!==""){
                if (cambiarContraseniaActual.value===participanteEnLinea.contrasena){
                    participanteEnLinea.contrasena=cambiarContraseniaNueva.value;
                }else{
                    errorEditar.style.display='flex';
                    errorEditar.textContent="Lo sentimos, contraseña actual incorrecta";
                    todoBien=false;
                }
            }else{
                errorEditar.style.display='flex';
                errorEditar.textContent="Asegurese de colocar la contraseña actual en caso de cambiarla";
                todoBien=false;
            }
        }

        if (todoBien===true){
            for (let i=0;i<listaParticipantes.length;i++){
                console.log("2");
                if (listaParticipantes[i].correo===participanteEnLinea.correo){
                    console.log("3");
                    listaParticipantes[i]=participanteEnLinea;
                    manejoDatos.actualizarParticipante(listaParticipantes[i]);
                    manejoDatos.actualizarParticipanteEnLinea(listaParticipantes[i]);
                    

                    nombreEditar.placeholder=participanteEnLinea.nombre;
                    apellidoEditar.placeholder=participanteEnLinea.apellido;
                    editar.style.display='flex';
                    mostrarBotones.style.display='none';
                    nombreEditar.value='';
                    nombreEditar.disabled= true;
                    nombreEditar.style.cursor='default';
                    apellidoEditar.value='';
                    apellidoEditar.disabled= true;
                    apellidoEditar.style.cursor='default';
                    fechaNacimientoTxt.disabled= true;
                    fechaNacimientoTxt.style.display='inline-block';
                    if ((!isNaN(diaNacimiento))&&(!isNaN(diaNacimiento))&&(!isNaN(anioNacimiento))){
                        fechaNacimientoTxt.placeholder=diaNacimiento+" de "+nombreMes+" de "+anioNacimiento;
                    }
                    cambiarContraseniaActual.value="";
                    cambiarContraseniaNueva.value="";
                    fechaDeNacimientoNueva.style.display='none';
                    textoFecha.style.display='none';
                    soloMostrar.style.display='flex';
                    errorEditar.textContent='';
                    errorEditar.style.display='none';
                    botonEliminarPerfil.style.display='flex';
                    seccionContraseniaNueva.style.display='none';
                    seccionContraseniaActual.style.display='none';
                    editar.style.display='flex';
                    mostrarBotones.style.display='none';
                }                
            }
        }

        
    }

    
    cambiarAPanelEliminarPerfil(botonEliminarPerfil,panelEliminarPerfil,panelActual,correoEliminar, menuHorizontal,botonCerrarSesion){
        panelEliminarPerfil.style.display='flex';
        panelActual.style.display='none';
        correoEliminar.placeholder=participanteEnLinea.correo;
        menuHorizontal.style.display='none';
        botonCerrarSesion.style.display='none';
    }
    eliminarPerfil(correoEliminar,contraseniaEliminar,panelConfirmarEliminarPerfil,botonConfirmacion,errorEliminar){
        let contrasenaCorrecta= false;
        for (let i=0;i<listaParticipantes.length;i++){
            if (listaParticipantes[i].contrasena===contraseniaEliminar.value){
                panelConfirmarEliminarPerfil.style.display='block';
                botonConfirmacion.style.display='flex';  
                contrasenaCorrecta=true;  
                errorEliminar.style.display='none';  
                return i;
            }
        }
        if (contrasenaCorrecta=== false){
            errorEliminar.style.display='block';    
        }
        
    }
    eliminarPerfilConfirmar(correoEliminar,contraseniaEliminar){
        
        for (let i=0;i<listaParticipantes.length;i++){
            if (listaParticipantes[i].contrasena===contraseniaEliminar.value){
                manejoDatos.eliminarParticipante(listaParticipantes[i])
                manejoDatos.eliminarParticipanteEnLinea(participanteEnLinea);
                window.open('LogIn.html', '_self');
            }
        }
    }
    volverDeEliminarPerfil (panelEliminarPerfil,panelActual,menuHorizontal,botonCerrarSesion){
        panelEliminarPerfil.style.display='none';
        panelActual.style.display='block';
        menuHorizontal.style.display='block';
        botonCerrarSesion.style.display='block';
    }
    alternativaEliminar(botonEliminarPerfil){
        botonEliminarPerfil.style.display="flex";
    }

    //NUEVO PARA LA UBICACION POR DIANA
        hidePopup() {
        const popup = document.getElementById("popup");
        popup.style.display = "none";
    }
  
     handleTipoMascotaNueva() {
      const ubicacionNuevaMascota = document.getElementById('ubicacionNuevaMascota');
      const input = document.getElementById('input-with-icon');
      const iconMapMarker = ubicacionNuevaMascota.parentElement.querySelector('.fa-map-marker-alt');
      const selectedOption = tipoMascotaNueva.value;
  
      if (selectedOption === 'Callejera') {
        ubicacionNuevaMascota.placeholder = 'Ubicación Exacta';
        iconMapMarker.style.display = 'inline-block';
        this.showPopupHandler = (event) => {
            this.showPopup();
          };
          input.addEventListener('click', this.showPopupHandler);
    }   else {
        ubicacionNuevaMascota.placeholder = 'Ubicación';
        iconMapMarker.style.display = 'none';
        input.removeEventListener('click', this.showPopupHandler);
      }
    }

    showPopup = () => {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        this.initMap();
      }
    

 initMap() {
  const position = { lat: 10.4806, lng: -66.9036 };
  const grandCaracasBounds = {
    north: 10.6308,
    south: 10.1940,
    west: -67.1538,
    east: -66.6728,
  };
  
   this.crearMapa(position, grandCaracasBounds);
   this.crearSearchBox();
   this.crearClickListener();
}

 crearMapa(position, grandCaracasBounds) {
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: position,
    mapId: "DEMO_MAP_ID",

    restriction: {
      latLngBounds: grandCaracasBounds,
      strictBounds: true,
    },
  }); 
}


  crearSearchBox() {
    const input = document.getElementById("search-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    autocomplete.bindTo("bounds", map);
  
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
  
      this.handleSearchResults([place]);
    });
  }

   crearClickListener() {
        map.addListener("click", (event) => {
          if (currentMarker) {
            currentMarker.setMap(null);
          }
          const { lat, lng } = event.latLng.toJSON();
          currentMarker = new AdvancedMarkerElement({
            map: map,
            position: { lat, lng },
            title: "Selected Location",
          });
      
         selectedLocation = {
            lat: currentMarker.position.lat,
            lng: currentMarker.position.lng
          };
          console.log("Location selected by clicking on the map:", selectedLocation);
        });
      }

   handleSearchResults(places) {
    if (places.length === 0) {
      return;
    }
  
    const bounds = new google.maps.LatLngBounds();
  
    const filteredPlaces = places.filter((place) => this.checkPlaceInBounds(place, bounds));
  
    if (filteredPlaces.length === 0) {
        console.log("No hay resultados dentro de los límites de Caracas.");
        return;
      }
    
      map.fitBounds(bounds);
    
      if (currentMarker) {
        currentMarker.setMap(null);
      }
    
      currentMarker = new AdvancedMarkerElement({
        map: map,
        position: filteredPlaces[0].geometry.location,
        title: filteredPlaces[0].name,
      });
    
      // Save the selected location
      selectedLocation = {
        lat: currentMarker.position.lat,
        lng: currentMarker.position.lng,
        name: currentMarker.title
      };
      console.log("Location selected using the search bar:", selectedLocation);
      // You can also save the selectedLocation object to a JSON file or send it to the server

      map.setCenter(currentMarker.position);
      map.setZoom(14); 
    }
   
checkPlaceInBounds(place, bounds) {
    const grandCaracasBounds = {
      north: 10.6308,
      south: 10.1940,
      west: -67.1538,
      east: -66.6728,
    };
  
    if (
      place.geometry.location.lat() >= grandCaracasBounds.south &&
      place.geometry.location.lat() <= grandCaracasBounds.north &&
      place.geometry.location.lng() >= grandCaracasBounds.west &&
      place.geometry.location.lng() <= grandCaracasBounds.east
    ) {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      return true;
    }
    return false;
  }

  asignarSelectedLocation() {
    return new Promise((resolve, reject) => {
      if (currentMarker) {
        selectedLocation = {
          lat: currentMarker.position.lat,
          lng: currentMarker.position.lng,
          name: currentMarker.title
        };
  
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: selectedLocation }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const selectedLocation2 = results[0].formatted_address;
              const ubicacionMascotaNueva = document.getElementById('ubicacionNuevaMascota');
              ubicacionMascotaNueva.value = selectedLocation2;
              resolve(selectedLocation2);
            } else {
              reject(null);
            }
          } else {
            console.log("Geocoding falló con el siguiente estado:", status);
            reject(null);
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'No hay una ubicación seleccionada.'
        });
        reject(null);
      }
    });
  }

    asignarUbicacionExacta(){
        if (currentMarker) {
            selectedLocation = {
            lat: currentMarker.position.lat,
            lng: currentMarker.position.lng,
            name: currentMarker.title
        };
        console.log('funcion:' + selectedLocation);
        return selectedLocation;    
    }
}

   /*************Para consultar mascota callejera*****************/
    crearMapaPreview(ubicacion) {
        const posicion = { lat: ubicacion.lat, lng: ubicacion.lng };
        const mapaPreview = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 10,
        center: posicion,
        mapId: "roadmap",
        });
    
        new google.maps.marker.AdvancedMarkerElement({
        position: posicion,
        map: mapaPreview,
        title: ubicacion.name,
        });
    }

    /*****************Para Crear Mapa en Modificar Mascota *****************/
    showPopupModificar() {
        const popup = document.getElementById("popupModificar");
        popup.style.display = "block";
        this.initMapModificar();
      }
    
    hidePopupModificar() {
        const popup = document.getElementById("popupModificar");
        popup.style.display = "none";
    }
  
     handleTipoMascotaModificada() {
      const ubicacionMascotaModificada = document.getElementById('ubicacionModificarMascota');
      const input = document.getElementById('input-with-icon-modificar');
      const iconMapMarker = ubicacionModificarMascota.parentElement.querySelector('.fa-map-marker-alt');
      const tipoMascota = document.getElementById('tipoModificarMascota');
      const selectedOption = tipoMascota.value;
  
      if (selectedOption === 'Callejera') {
        ubicacionMascotaModificada.placeholder = 'Ubicación Exacta';
        iconMapMarker.style.display = 'inline-block';
        this.showPopupHandler = (event) => {
            this.showPopupModificar();
          };
          input.addEventListener('click', this.showPopupHandler);
    }   else {
      //  ubicacionMascotaModificada.placeholder = 'Ubicación General';
        iconMapMarker.style.display = 'none';
        input.removeEventListener('click', this.showPopupHandler);
      }
    }
    

 initMapModificar() {
  const position = { lat: 10.4806, lng: -66.9036 };
  const grandCaracasBounds = {
    north: 10.6308,
    south: 10.1940,
    west: -67.1538,
    east: -66.6728,
  };
  
   this.crearMapaModificar(position, grandCaracasBounds);
   this.crearSearchBoxModificar();
   this.crearClickListener();
}

 crearMapaModificar(position, grandCaracasBounds) {

  map = new Map(document.getElementById("mapModificar"), {
    zoom: 11,
    center: position,
    mapId: "DEMO_MAP_ID",

    restriction: {
      latLngBounds: grandCaracasBounds,
      strictBounds: true,
    },
  }); 
}


  crearSearchBoxModificar() {
    const input = document.getElementById("search-input-modificar");
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    autocomplete.bindTo("bounds", map);
  
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
  
      this.handleSearchResults([place]);
    });
  }

  asignarSelectedLocationModificada() {
    return new Promise((resolve, reject) => {
      if (currentMarker) {
        selectedLocation = {
          lat: currentMarker.position.lat,
          lng: currentMarker.position.lng,
          name: currentMarker.title
        };
  
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: selectedLocation }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const selectedLocation2 = results[0].formatted_address;
              const ubicacionMascotaModificada = document.getElementById('ubicacionModificarMascota');
              ubicacionMascotaModificada.value = selectedLocation2;
              resolve(selectedLocation2);
            } else {
              reject(null);
            }
          } else {
            console.log("Geocoding falló con el siguiente estado:", status);
            reject(null);
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'No hay una ubicación seleccionada.'
        });
        reject(null);
      }
    });
  }

    /****************************EliminarMascota***********************/
    eliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,seccionConfirmacion){
        botonEliminarMascota.style.display="none";
        seccionConfirmacion.style.display="block";
        seccionBotonesModificarEliminar.style.display="none";
        
    }
    cancelarEliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,seccionConfirmacion){
        botonEliminarMascota.style.display="flex";
        seccionBotonesModificarEliminar.style.display="block";
        seccionConfirmacion.style.display="none";
    }

    
    confirmarEliminarMascota(botonEliminarMascota,seccionBotonesModificarEliminar,botonCancelarEliminarMascota,botonConfirmarEliminarMascota,seccionConfirmacion,j){
        botonEliminarMascota.style.display="flex";
        seccionBotonesModificarEliminar.style.display="block";
        seccionConfirmacion.style.display="none";
        participanteEnLinea.listaMascota.splice(j,1);
        manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea);
        for (let i=0;i<listaParticipantes.length;i++){
            if (listaParticipantes[i].correo===participanteEnLinea.correo){

                listaParticipantes[i].listaMascota=participanteEnLinea.listaMascota;
                manejoDatos.actualizarParticipante(listaParticipantes[i]);
            }
        }
        this.llenarCatalogoConFiltros(function retornaTrue(a){
            return true;
        });
        this.llenarDatosPerfil();
    }

    validarCamposModificarMascota(i){
        let datosCompletos=true;
        let modificarNombreMascota= document.getElementById('indiqueModificarNombreMascota');
        let modificarEspecieMascota= document.getElementById('especieModificarMascota');
        let modificarColorMascota= document.getElementById('colorModificarMascota');
        let modificarTipoMascota= document.getElementById('tipoModificarMascota');
        let modificarUbicacionMascota= document.getElementById('ubicacionModificarMascota');
        let modificarPeriodoMascota= document.getElementById('periodoModificarMascota');
        let modificarEdadMascota = document.getElementById('edadModificarMascota');
        let modificarRazaMascota= document.getElementById('razaModificarMascota');
        let modificarDescripcionMascota= document.getElementById('descripcionModificarMascota');
        const imgModificar = document.getElementById('modificarImagenMascotaNueva');
        const mensajeErrorModificarMascota= document.getElementById('mensajeErrorModificarMascota');
        let imageFile = imgModificar.files[0];

        if (modificarNombreMascota.value!==""){
            participanteEnLinea.listaMascota[i].nombre=modificarNombreMascota.value;  
            datosCompletos=true;          
        } 
        if(modificarUbicacionMascota.value!==""){
            participanteEnLinea.listaMascota[i].ubicacion=modificarUbicacionMascota.value;
            let ubicacionExactaModificada = this.asignarUbicacionExacta();
            participanteEnLinea.listaMascota[i].ubicacionExacta=ubicacionExactaModificada;
            datosCompletos=true;
        } 
        if (modificarColorMascota.value!==participanteEnLinea.listaMascota[i].color){ 
            participanteEnLinea.listaMascota[i].color=modificarColorMascota.value;
            datosCompletos=true;
        }
        if (modificarTipoMascota.value!==participanteEnLinea.listaMascota[i].tipo){
            participanteEnLinea.listaMascota[i].tipo=modificarTipoMascota.value;
            datosCompletos=true;
        } 

        if (modificarDescripcionMascota.value!==""){
            participanteEnLinea.listaMascota[i].descripcion=modificarDescripcionMascota.value;
            datosCompletos=true;
        }   
        if (razaMascotaNueva.value!==participanteEnLinea.listaMascota[i].raza){
            participanteEnLinea.listaMascota[i].raza=modificarRazaMascota.value;
            datosCompletos=true;
        }

        if (modificarEdadMascota.value!==participanteEnLinea.listaMascota[i].raza){
            participanteEnLinea.listaMascota[i].edad=modificarEdadMascota.value;
            datosCompletos=true;
        }
        //Validar al cambiar la especie
        if (modificarEspecieMascota.value!==participanteEnLinea.listaMascota[i].especie){
            if (modificarRazaMascota.value==="Raza"){
                mensajeErrorModificarMascota.textContent="Asegúrese de elegir la raza al cambiar la especie.";
                mensajeErrorModificarMascota.style.display="block";    
                datosCompletos=false;
            }
            if (modificarRazaMascota.value!=="Raza"){
                participanteEnLinea.listaMascota[i].raza=modificarRazaMascota.value;
                participanteEnLinea.listaMascota[i].especie=modificarEspecieMascota.value;
                datosCompletos=true;

                //Validar al cambiar el periodo 
                if (modificarPeriodoMascota.value==="Período"){
                    mensajeErrorModificarMascota.textContent="Asegúrese de elegir el período al cambiar la especie.";
                    mensajeErrorModificarMascota.style.display="block";    
                    datosCompletos=false;
                }else{
                    if (modificarEdadMascota.value==="Edad"){
                        mensajeErrorModificarMascota.textContent="Asegúrese de elegir la edad al cambiar el período.";
                        mensajeErrorModificarMascota.style.display="block";    
                        datosCompletos=false;
                    }else{
                        participanteEnLinea.listaMascota[i].edad=modificarEdadMascota.value;
                        participanteEnLinea.listaMascota[i].periodo=modificarPeriodoMascota.value;
                        datosCompletos=true;
                    }
                }
            }   
        }else{
            if (modificarRazaMascota.value==="Raza"){
                mensajeErrorModificarMascota.textContent="Asegúrese de elegir la raza al cambiar la especie.";
                mensajeErrorModificarMascota.style.display="block";    
                datosCompletos=false;
            }
            if (modificarRazaMascota.value!=="Raza"){
                participanteEnLinea.listaMascota[i].raza=modificarRazaMascota.value;
                datosCompletos=true;
            }  
            //Validar al cambiar el periodo 
            if (modificarPeriodoMascota.value==="Período"){
                mensajeErrorModificarMascota.textContent="Asegúrese de elegir el período al cambiar la especie.";
                mensajeErrorModificarMascota.style.display="block";    
                datosCompletos=false;
            }else{
                if (modificarEdadMascota.value==="Edad"){
                    mensajeErrorModificarMascota.textContent="Asegúrese de elegir la edad al cambiar el período.";
                    mensajeErrorModificarMascota.style.display="block";    
                    datosCompletos=false;
                }else{
                    participanteEnLinea.listaMascota[i].edad=modificarEdadMascota.value;
                    participanteEnLinea.listaMascota[i].periodo=modificarPeriodoMascota.value;
                    datosCompletos=true;
                }
            }
        }
        if(imageFile !== undefined){
            participanteEnLinea.listaMascota[i].rutaImagen="../Imagenes/"+imageFile.name;
            manejoDatos.guardarImagen(imageFile);
        }
        
        console.log(datosCompletos);
        //Valida que todo este en orden para modificar
        if (datosCompletos===true){
            manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea);
            mensajeErrorModificarMascota.textContent="";
            mensajeErrorModificarMascota.style.display="none";

            for (let i=0;i<listaParticipantes.length;i++){
                if (listaParticipantes[i].correo===participanteEnLinea.correo){
                    listaParticipantes[i].listaMascota=participanteEnLinea.listaMascota;
                    manejoDatos.actualizarParticipante(listaParticipantes[i]);
                }
            }
            this.llenarCatalogoConFiltros(function retornaTrue(a){
                return true;
            });
            this.llenarDatosPerfil();

            const panelModificarMascota=document.querySelector(".modificarMascota");
            const panelActual=document.querySelector('.perfilSeccion');
            const menuHorizontal=document.querySelector('.menuHorizontal');
            panelModificarMascota.style.display='none';
            panelActual.style.display='block';
            menuHorizontal.style.display='block';
        }
        
    }

    cambiarPanelModificarMascota(i){
        //const ubicacionMascotaModificada = document.getElementById('ubicacionModificarMascota');
        const iconMapMarker = ubicacionModificarMascota.parentElement.querySelector('.fa-map-marker-alt');
        const tipoMascota = document.getElementById('tipoModificarMascota');
        const selectedOption = tipoMascota.value;
        const imgModificar = document.getElementById('imagenPreviewModificar');
        imgModificar.src=participanteEnLinea.listaMascota[i].rutaImagen;
        
        const panelModificarMascota=document.querySelector(".modificarMascota");
        const panelActual=document.querySelector('.perfilSeccion');
        const menuHorizontal=document.querySelector('.menuHorizontal');
        panelModificarMascota.style.display='block';
        panelActual.style.display = 'none';
        menuHorizontal.style.display='none';
        this.llenarValoresModificarMascota(i); 
        if (selectedOption === 'Callejera') {
            iconMapMarker.style.display = 'inline-block';
        }   else {
            iconMapMarker.style.display = 'none';
          }
        let botonModificarMascota=document.getElementById("botonModificarMascota");
        botonModificarMascota.dataset.indiceMascota=i;
        botonModificarMascota.addEventListener("click",()=>{this.validarCamposModificarMascota(botonModificarMascota.dataset.indiceMascota)});
    }

    llenarValoresModificarMascota(i){
        let modificarNombreMascota=document.getElementById("indiqueModificarNombreMascota");
        let modificarEspecieMascota= document.getElementById('especieModificarMascota');
        let modificarColorMascota= document.getElementById('colorModificarMascota');
        let modificarTipoMascota= document.getElementById('tipoModificarMascota');
        let modificarUbicacionMascota= document.getElementById('ubicacionModificarMascota');
        let modificarPeriodoMascota= document.getElementById('periodoModificarMascota');
        let modificarEdadMascota = document.getElementById('edadModificarMascota');
        let modificarRazaMascota= document.getElementById('razaModificarMascota');
        let modificarDescripcionMascota= document.getElementById('descripcionModificarMascota');


        modificarNombreMascota.placeholder = participanteEnLinea.listaMascota[i].nombre;
        modificarDescripcionMascota.placeholder=participanteEnLinea.listaMascota[i].descripcion;
        modificarColorMascota.value=participanteEnLinea.listaMascota[i].color;
        modificarTipoMascota.value=participanteEnLinea.listaMascota[i].tipo;
        modificarUbicacionMascota.placeholder=participanteEnLinea.listaMascota[i].ubicacion;
        modificarEspecieMascota.value = participanteEnLinea.listaMascota[i].especie;

        if (participanteEnLinea.listaMascota[i].especie==="Ave"){
            this.agregarOpcion("Canario", modificarRazaMascota,false,false);
                this.agregarOpcion("Perico",modificarRazaMascota,false,false);
                this.agregarOpcion("Loro", modificarRazaMascota,false,false);
                this.agregarOpcion("Diamante", modificarRazaMascota,false,false);
                this.agregarOpcion("Jilguero",modificarRazaMascota,false,false);
                this.agregarOpcion("Agaporni", modificarRazaMascota,false,false);
                this.agregarOpcion("Ninfa", modificarRazaMascota,false,false);
                this.agregarOpcion("Cotorra",modificarRazaMascota,false,false);
                this.agregarOpcion("Cacatúa", modificarRazaMascota,false,false);
                this.agregarOpcion("Yaco", modificarRazaMascota,false,false);
                this.agregarOpcion("Guacamayo",modificarRazaMascota,false,false);
                this.agregarOpcion("Eclectus", modificarRazaMascota,false,false);
                this.agregarOpcion("Mestizo", modificarRazaMascota,false,false);
                this.agregarOpcion("Desconocida", modificarRazaMascota,false,false);
                this.actualizarEdad(10,modificarPeriodoMascota,modificarEdadMascota);
                if (participanteEnLinea.listaMascota[i].periodo==="Años"){
                    this.llenarEdadDeLaMascotaModificada(10,modificarEdadMascota);
                }else{
                    this.llenarEdadDeLaMascotaModificada(12,modificarEdadMascota);
                }
        }

        if (participanteEnLinea.listaMascota[i].especie==="Perro"){
                this.agregarOpcion("Labrador", modificarRazaMascota,false,false);
                this.agregarOpcion("Bulldog", modificarRazaMascota,false,false);
                this.agregarOpcion("Pastor Alemán", modificarRazaMascota,false,false);
                this.agregarOpcion("Golden Retriever",modificarRazaMascota,false,false);
                this.agregarOpcion("Boxer", modificarRazaMascota,false,false);
                this.agregarOpcion("Cocker", modificarRazaMascota,false,false);
                this.agregarOpcion("Bichon Maltes",modificarRazaMascota,false,false);
                this.agregarOpcion("Pug", modificarRazaMascota,false,false);
                this.agregarOpcion("Beagle", modificarRazaMascota,false,false);
                this.agregarOpcion("Yorkshire terrier", modificarRazaMascota,false,false);
                this.agregarOpcion("Bulldog francés",modificarRazaMascota,false,false);
                this.agregarOpcion("Mestizo",modificarRazaMascota,false,false);
                this.agregarOpcion("Desconocida",modificarRazaMascota,false,false);
                this.actualizarEdad(13,modificarPeriodoMascota,modificarEdadMascota);
                if (participanteEnLinea.listaMascota[i].periodo==="Años"){
                    this.llenarEdadDeLaMascotaModificada(13,modificarEdadMascota);
                }else{
                    this.llenarEdadDeLaMascotaModificada(12,modificarEdadMascota);
                }
        }

        if (participanteEnLinea.listaMascota[i].especie==="Gato"){
                this.agregarOpcion("Siamés",modificarRazaMascota,false,false);
                this.agregarOpcion("Persa",modificarRazaMascota,false,false);
                this.agregarOpcion("Bengala",modificarRazaMascota,false,false);
                this.agregarOpcion("Maine Coon",modificarRazaMascota,false,false);
                this.agregarOpcion("Ragdoll",modificarRazaMascota,false,false);
                this.agregarOpcion("Abisinio",modificarRazaMascota,false,false);
                this.agregarOpcion("Birmano",modificarRazaMascota,false,false);
                this.agregarOpcion("Mestizo",modificarRazaMascota,false,false);
                this.agregarOpcion("Desconocida",modificarRazaMascota,false,false);
                this.actualizarEdad(18,modificarPeriodoMascota,modificarEdadMascota);
                if (participanteEnLinea.listaMascota[i].periodo==="Años"){
                    this.llenarEdadDeLaMascotaModificada(18,modificarEdadMascota);
                }else{
                    this.llenarEdadDeLaMascotaModificada(12,modificarEdadMascota);
                }
        }
        if (participanteEnLinea.listaMascota[i].especie==="Roedor"){
                this.agregarOpcion("Raton", modificarRazaMascota,false,false);
                this.agregarOpcion("Ramster",modificarRazaMascota,false,false);
                this.agregarOpcion("Rata",modificarRazaMascota,false,false);
                this.agregarOpcion("Degú ", modificarRazaMascota,false,false);
                this.agregarOpcion("Jerbo",modificarRazaMascota,false,false);
                this.agregarOpcion("Chinchilla",modificarRazaMascota,false,false);
                this.agregarOpcion("Cobaya",modificarRazaMascota,false,false);
                this.agregarOpcion("Mestizo", modificarRazaMascota,false,false);
                this.agregarOpcion("Desconocida",modificarRazaMascota,false,false);
                this.actualizarEdad(3,modificarPeriodoMascota,modificarEdadMascota);
                if (participanteEnLinea.listaMascota[i].periodo==="Años"){
                    this.llenarEdadDeLaMascotaModificada(3,modificarEdadMascota);
                }else{
                    this.llenarEdadDeLaMascotaModificada(12,modificarEdadMascota);
                }
        }

        modificarRazaMascota.value=participanteEnLinea.listaMascota[i].raza;
        modificarPeriodoMascota.value=participanteEnLinea.listaMascota[i].periodo;
        modificarEdadMascota.value=participanteEnLinea.listaMascota[i].edad;
        
       
    }
    
    llenarEdadDeLaMascotaModificada(j,edad){
        for (let i=0;i<j;i++){
            this.colocarTiempo(i.toString(), edad, false, false);
        }
    }

    //Eliminar Solicitud
    eliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarSolicitud,botonConfirmarSolicitud,seccionConfirmacionSolicitud){
        botonEliminarSolicitud.style.display="none";
        seccionConfirmacionSolicitud.style.display="block";
        seccionBotonesModificarEliminarSolicitud.style.display="none";
    }

    cancelarEliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarSolicitud,botonConfirmarSolicitud,seccionConfirmacionSolicitud){
        botonEliminarSolicitud.style.display="flex";
        seccionBotonesModificarEliminarSolicitud.style.display="block";
        seccionConfirmacionSolicitud.style.display="none";
    }

    confirmarEliminarSolicitud(botonEliminarSolicitud,seccionBotonesModificarEliminarSolicitud,botonCancelarEliminarSolicitud,botonConfirmarEliminarSolicitud,seccionConfirmacionSolicitud,j){
        botonEliminarSolicitud.style.display="flex";
        seccionBotonesModificarEliminarSolicitud.style.display="block";
        seccionConfirmacionSolicitud.style.display="none";

       participanteEnLinea.listaSolicitudes.splice(j,1);
        manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea);
        for (let i=0;i<listaParticipantes.length;i++){
            if (listaParticipantes[i].correo===participanteEnLinea.correo){

                listaParticipantes[i].listaSolicitudes = participanteEnLinea.listaSolicitudes;
                manejoDatos.actualizarParticipante(listaParticipantes[i]);
            }
        }
        this.llenarCatalogoConFiltros(function retornaTrue(a){
            return true;
        });
        this.llenarDatosPerfil();

        if (participanteEnLinea.listaSolicitudes[j].estatus == "Enviada" || "Pendiente"){
            this.enviarCorreoSolicitudEliminada(this.obtenerParametrosSolicitudEliminada);
        }
    }

    //Modificar Solicitud
    cambiarPanelModificarSolicitud(indiceSolicitud){
        const panelModificarSolicitudLleno = document.querySelector(".modificarSolicitud");
        const panelActual=document.querySelector('.perfilSeccion');
        const menuHorizontal=document.querySelector('.menuHorizontal');

        panelModificarSolicitudLleno.style.display = "block";
        panelActual.style.display = 'none';
        menuHorizontal.style.display='none';

        this.llenarValoresModificarSolicitud(indiceSolicitud); 
        let botonModificarSolicitud=document.getElementById("botonGuardarCambiosSolicitud");
        botonModificarSolicitud.dataset.indiceSolicitud=indiceSolicitud;
        botonModificarSolicitud.addEventListener("click",(event)=>{
            event.preventDefault();
            this.validarCamposModificarSolicitud(botonModificarSolicitud.dataset.indiceSolicitud)});
    }

    llenarValoresModificarSolicitud(i){     
        let modificarHorarioLaboral = document.getElementById("horarioLaboralModificado");
        let modificarVacacionesMascota = document.getElementById("vacacionesMascotaModificado");
        let modificarRazonAdopcion = document.getElementById("razonAdopcionModificado");
        let modificarResponsableMascota = document.getElementById("responsableMascotaModificado");
        let modificarLugarDormir = document.getElementById("lugarDormirModificado");
        let modificarInfoOtrasMascotas = document.getElementById("infoOtrasMascotasModificado");
        let modificarCaracterMascota = document.getElementById("caracterMascotaModificado");
        let modificarTipoVivienda = document.getElementById("selectTipoViviendaModificada");

        modificarHorarioLaboral.value = participanteEnLinea.listaSolicitudes[i].horarioLaboral;
      //  modificarVacacionesMascota.textContent = participanteEnLinea.listaSolicitudes[i].situacionVacaciones;
        modificarVacacionesMascota.value = participanteEnLinea.listaSolicitudes[i].situacionVacaciones;
     //   modificarRazonAdopcion.textContent = participanteEnLinea.listaSolicitudes[i].motivoAdopcion;
     modificarRazonAdopcion.value = participanteEnLinea.listaSolicitudes[i].motivoAdopcion;
      //  modificarResponsableMascota.textContent = participanteEnLinea.listaSolicitudes[i].familiarResponsable;
      modificarResponsableMascota.value = participanteEnLinea.listaSolicitudes[i].familiarResponsable;
      //  modificarLugarDormir.textContent = participanteEnLinea.listaSolicitudes[i].lugarDeDormir;
      modificarLugarDormir.value = participanteEnLinea.listaSolicitudes[i].lugarDeDormir;
      //  modificarInfoOtrasMascotas.textContent = participanteEnLinea.listaSolicitudes[i].descripcionOtrosAnimales;
      modificarInfoOtrasMascotas.value = participanteEnLinea.listaSolicitudes[i].descripcionOtrosAnimales;
        modificarCaracterMascota.value = participanteEnLinea.listaSolicitudes[i].caracterMascota;
        modificarTipoVivienda.value = participanteEnLinea.listaSolicitudes[i].vivienda;

        let modificarInfoVivienda = document.querySelector('input[name="grupoOpcionesInfoVivienda"]:checked');
        if (modificarInfoVivienda) {
        modificarInfoVivienda.value = participanteEnLinea.listaSolicitudes[i].tipoVivienda;
        } else {
        let radioButton1 = document.querySelector('input[name="grupoOpcionesInfoVivienda"][value="' + participanteEnLinea.listaSolicitudes[i].tipoVivienda + '"]');
        if (radioButton1) {
            radioButton1.checked = true;
        }
        }

        let modificarLandlord = document.querySelector('input[name="grupoOpcionesLandlordModificado"]:checked');
        if (modificarLandlord) {
        modificarLandlord.value = participanteEnLinea.listaSolicitudes[i].autorizadoEnAlquiler;
        } else {
        let radioButton2 = document.querySelector('input[name="grupoOpcionesLandlordModificado"][value="' + participanteEnLinea.listaSolicitudes[i].autorizadoEnAlquiler + '"]');
        if (radioButton2) {
            radioButton2.checked = true;
        }
        }

        let modificarJardin = document.querySelector('input[name="grupoOpcionesJardinModificado"]:checked');
        if (modificarJardin) {
        modificarJardin.value = participanteEnLinea.listaSolicitudes[i].conJardin;
        } else {
        let radioButton3 = document.querySelector('input[name="grupoOpcionesJardinModificado"][value="' + participanteEnLinea.listaSolicitudes[i].conJardin + '"]');
        if (radioButton3) {
            radioButton3.checked = true;
        }
        }

        let modificarDecision = document.querySelector('input[name="grupoOpcionesDecisionModificado"]:checked');
        if (modificarDecision) {
        modificarDecision.value = participanteEnLinea.listaSolicitudes[i].decisionCompartida;
        } else {
        let radioButton4 = document.querySelector('input[name="grupoOpcionesDecisionModificado"][value="' + participanteEnLinea.listaSolicitudes[i].desicionCompartida + '"]');
        if (radioButton4) {
            radioButton4.checked = true;
        }
        }

        let modificarOtrosAnimales = document.querySelector('input[name="grupoOpcionesAnimalesModificado"]:checked');
        if (modificarOtrosAnimales) {
        modificarOtrosAnimales.value = participanteEnLinea.listaSolicitudes[i].otrosAnimales;
        } else {
        let radioButton5 = document.querySelector('input[name="grupoOpcionesAnimalesModificado"][value="' + participanteEnLinea.listaSolicitudes[i].otrosAnimales + '"]');
        if (radioButton5) {
            radioButton5.checked = true;
        }
        }
    }

    validarCamposRequeridosModificado() {
        const requiredFields = [
        "selectTipoViviendaModificada",
        "horarioLaboralModificado",
        "vacacionesMascotaModificado",
        "razonAdopcionModificado",
        "responsableMascotaModificado",
        "lugarDormirModificado",
        "caracterMascotaModificado"
        ];
    
        for (const field of requiredFields) {
            if (!document.getElementById(field).value) {
                return false;
        }

        if (!document.querySelector('input[name="grupoOpcionesInfoVivienda"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpcionesLandlordModificado"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpcionesJardinModificado"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpcionesDecisionModificado"]:checked')) {
            return false;
        }

        if (!document.querySelector('input[name="grupoOpcionesAnimalesModificado"]:checked')) {
            return false;
        }
        }
        return true;
    }


        validandoModificarSolicitud(){
          
        }

        validarCamposModificarSolicitud(i) {
            const checkboxCondicion2 = document.getElementById('cbCondicion2');
            const checkboxCondicion1 = document.getElementById('cbCondicion1');

            if (!checkboxCondicion1.checked && !checkboxCondicion2.checked) {
                this.mostrarMensajeError('Por favor, debe aceptar las condiciones antes de enviar el formulario.');
                return;
            } else if (!this.validarCamposRequeridosModificado()) {
                this.mostrarMensajeError('Por favor complete todos los campos requeridos antes de enviar el formulario.');
                return;
            } else {
                let modificarHorarioLaboral = document.getElementById("horarioLaboralModificado");
                let modificarVacacionesMascota = document.getElementById("vacacionesMascotaModificado");
                let modificarRazonAdopcion = document.getElementById("razonAdopcionModificado");
                let modificarResponsableMascota = document.getElementById("responsableMascotaModificado");
                let modificarLugarDormir = document.getElementById("lugarDormirModificado");
                let modificarInfoOtrasMascotas = document.getElementById("infoOtrasMascotasModificado");
                let modificarCaracterMascota = document.getElementById("caracterMascotaModificado");
                let modificarTipoVivienda = document.getElementById("selectTipoViviendaModificada");
                let modificarInfoVivienda = document.querySelector('input[name="grupoOpcionesInfoVivienda"]:checked');
                let modificarLandlord = document.querySelector('input[name="grupoOpcionesLandlordModificado"]:checked');
                let modificarJardin = document.querySelector('input[name="grupoOpcionesJardinModificado"]:checked');
                let modificarDecision = document.querySelector('input[name="grupoOpcionesDecisionModificado"]:checked');
                let modificarOtrosAnimales = document.querySelector('input[name="grupoOpcionesAnimalesModificado"]:checked');

                participanteEnLinea.listaSolicitudes[i].vivienda = modificarTipoVivienda.value;
                participanteEnLinea.listaSolicitudes[i].horarioLaboral = modificarHorarioLaboral.value;
                participanteEnLinea.listaSolicitudes[i].situacionVacaciones = modificarVacacionesMascota.value;
                participanteEnLinea.listaSolicitudes[i].motivoAdopcion = modificarRazonAdopcion.value;
                participanteEnLinea.listaSolicitudes[i].familiarResponsable = modificarResponsableMascota.value;
                participanteEnLinea.listaSolicitudes[i].lugarDeDormir = modificarLugarDormir.value;
                participanteEnLinea.listaSolicitudes[i].descripcionOtrosAnimales = modificarInfoOtrasMascotas.value;
                participanteEnLinea.listaSolicitudes[i].caracterMascota = modificarCaracterMascota.value;

                participanteEnLinea.listaSolicitudes[i].tipoVivienda = modificarInfoVivienda.value;
                participanteEnLinea.listaSolicitudes[i].autorizadoEnAlquiler = modificarLandlord.value;
                participanteEnLinea.listaSolicitudes[i].conJardin = modificarJardin.value;
                participanteEnLinea.listaSolicitudes[i].desicionCompartida = modificarDecision.value;
                participanteEnLinea.listaSolicitudes[i].otrosAnimales = modificarOtrosAnimales.value;


                const resultado = this.guardarSolicitudModificada();
                if (resultado) {
                    this.mostrarMensajeExito('Solicitud modificada exitosamente.', () => {
                        this.llenarCatalogoConFiltros(function retornaTrue(a) {
                            return true;
                        });
                        this.llenarDatosPerfil();
                        this.mostrarSolicitudRealizada(i);
                        this.ocultarSolicitudModificadaVolverPerfil();
                        this.enviarCorreoSolicitudModificada(this.obtenerParametrosSolicitudModificada());
                    });
                } else {
                    this.mostrarMensajeError('Error al guardar la solicitud modificada.');
                } 
            }
        }

        ocultarSolicitudModificadaVolverPerfil(){
            const panelModificarSolicitud=document.querySelector(".modificarSolicitud");
            const panelActual=document.querySelector('.perfilSeccion');
            const menuHorizontal=document.querySelector('.menuHorizontal');
            panelModificarSolicitud.style.display='none';
            panelActual.style.display='block';
            menuHorizontal.style.display='block';
        }

        mostrarMensajeExito(mensaje, callback) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: mensaje,
                confirmButtonColor: '#E87229'
            }).then((result) => {
                if (result.isConfirmed) {
                    callback();
                }
            });
        }

    guardarSolicitudModificada() {
        try {
            manejoDatos.actualizarParticipanteEnLinea(participanteEnLinea); 
            for (let i=0;i<listaParticipantes.length;i++){
                if (listaParticipantes[i].correo===participanteEnLinea.correo){
                    listaParticipantes[i].listaSolicitudes = participanteEnLinea.listaSolicitudes;
                    manejoDatos.actualizarParticipante(listaParticipantes[i]);
                }
            }
            return true; 
        } catch (error) {
            console.error('Error al guardar la solicitud modificada:', error);
            return false; 
        }
    }

    volverPanelModificarSolicitud(){
        const panelModificarSolicitudLleno = document.querySelector(".modificarSolicitud");
        const panelActual=document.querySelector('.perfilSeccion');
        const menuHorizontal=document.querySelector('.menuHorizontal');

        panelModificarSolicitudLleno.style.display = "none";
        panelActual.style.display = 'block';
        menuHorizontal.style.display='block';
    }

    enviarCorreoSolicitudModificada(params){
        emailjs.init("AfYUc2SOn7tBoVtYy");
        emailjs.send("service_qylt8ci", "template_a7dkc7h", params)
    }

    obtenerParametrosSolicitudModificada() {
        const solicitudParticipante = listaParticipantes[solicitudParticipanteDueno];
        const mascota = solicitudParticipante.listaMascota[solicitudMascotaSoli];
    
        const viviendaSeleccionado = document.getElementById("selectTipoViviendaModificada").value;
        const horario = document.getElementById("horarioLaboralModificado").value;
        const vacaciones = document.getElementById("vacacionesMascotaModificado").value;
        const razonAdopcion = document.getElementById("razonAdopcionModificado").value;
        const responsableMascota = document.getElementById("responsableMascotaModificado").value;
        const lugarDeDormir = document.getElementById("lugarDormirModificado").value;
        const infoOtrasMascotas = document.getElementById("infoOtrasMascotasModificado").value || 'N/A';
        const caracterMascota = document.getElementById("caracterMascotaModificado").value;
        const viviendaValue = this.getRadioValue("grupoOpcionesInfoVivienda");
        const jardinValue = this.getRadioValue("grupoOpcionesLandlordModificado");
        const landlordValue = this.getRadioValue("grupoOpcionesJardinModificado");
        const decisionValue = this.getRadioValue("grupoOpcionesDecisionModificado");
        const animalesValue = this.getRadioValue("grupoOpcionesAnimalesModificado");
        cantidadSolicitudes = obtenerCantidadSolicitudes();
        let solicitud = new Solicitud(cantidadSolicitudes + 1,mascota, "Enviada", viviendaSeleccionado,viviendaValue,jardinValue,landlordValue,horario,vacaciones,razonAdopcion,responsableMascota,decisionValue,lugarDeDormir,animalesValue,infoOtrasMascotas,caracterMascota);
        solicitudAux.registrarSolicitud(participanteEnLinea,listaParticipantes,solicitud);


        return {
            participanteDuenoNombre: solicitudParticipante.nombre,
            participanteDuenoCorreo: solicitudParticipante.correo,
            mascotaNombre: mascota.nombre,
            participanteEnLineaNombre: participanteEnLinea.nombre,
            participanteEnLineaCorreo: participanteEnLinea.correo,
            viviendaSeleccionado,
            horario,
            vacaciones,
            razonAdopcion,
            responsableMascota,
            lugarDeDormir,
            infoOtrasMascotas,
            caracterMascota,
            viviendaValue,
            jardinValue,
            landlordValue,
            decisionValue,
            animalesValue
        };
    }


    ocultarPerfil(){
        const panelActual=document.querySelector('.perfilSeccion');
        panelActual.style.display="none";
    }
    mostrarPerfil(){
        const panelActual=document.querySelector('.perfilSeccion');
        panelActual.style.display="block";
    }

}
function obtenerCantidadSolicitudes(){
    let contador = 0;
    for (let i=0; i<listaParticipantes.length; i++){
        let participante = listaParticipantes[i];
        for (let j=0; j <participante.listaSolicitudes.length; j++){
            contador++;
        }
    }
    return contador;
}

