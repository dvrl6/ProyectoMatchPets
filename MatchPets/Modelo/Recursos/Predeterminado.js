import { Participante } from "../Clases/Participante.js";
import { Mascota } from "../Clases/Mascota.js";
import { Solicitud } from "../Clases/Solicitud.js";
import { MascotaCallejera } from "../Clases/MascotaCallejera.js";
import { MascotaExtraviada } from "../Clases/MascotaExtraviada.js";
import { AnuncioCallejera } from "../Clases/AnuncioCallejera.js";
import { AnuncioExtraviada } from "../Clases/AnuncioExtraviada.js";

export class Predeterminado{
    constructor(){

    }
    crearPredeterminados(){
        // Mascotas predeterminadas
        let ubicacionExacta1 = {
            lat: 10.485279968570367,
            lng: -66.85523986816406,
            name: "F4PV+4WC, Caracas 1064, Miranda, Venezuela"
          };
        let ubicacionExacta2 = {
            lat: 10.498930956839727,
            lng: -66.89781188964844,
            name: "F4X2+RRW, Caracas 1014, Distrito Capital, Venezuela"
        };
        let ubicacionExacta3 = {
            lat: 10.480258278898603,
            lng: -66.8808388710022,
            name: "F4J9+5P2, Caracas 1080, Miranda, Venezuela"
        };
        let ubicacionExacta4 = {
            lat: 10.447868536187556,
            lng: -66.92396879196167,
            name: "C.C. Coche, Piso 3, a la salida de la Est. del Metro, Edificio Anzoategui, Av. Intercomunal de El Valle, Caracas 1090, Distrito Capital, Venezuela"
        };


        let mascota1 = new Mascota(1,'Firulais', 'Perro', 'Negro', 'Propia', 'Libertador, Caracas', 3, 'Años', 'Labrador', 'Firulais es un perro muy juguetón y amigable.', '../Imagenes/firulais.jpg');
        let mascota2 = new MascotaCallejera(2,'Michi', 'Gato', 'Blanco', 'Callejera', 'Chacao, Caracas', 2, 'Años', 'Persa', 'Michi es una gata muy tranquila y cariñosa.', '../Imagenes/michi.jpg',ubicacionExacta1,"Callejera");
        let mascota3 = new Mascota(1,'Piolín', 'Ave', 'Amarillo', 'Propia', 'Baruta, Caracas', 1, 'Años', 'Canario', 'Piolín es un canario con un canto muy hermoso.', '../Imagenes/piolin.jpg');
        let mascota4 = new MascotaCallejera(2,'Bella', 'Perro', 'Marrón', 'Callejera', 'Bellas Artes, Caracas', 5, 'Años', 'Golden Retriever', 'Bella es una perra muy inteligente y leal.', '../Imagenes/bella.jpg',ubicacionExacta2,"Callejera");
        let mascota5 = new Mascota(3,'Tom', 'Gato', 'Gris', 'Propia', 'El Hatillo, Caracas', 4, 'Años', 'Siamés', 'Tom es un gato muy independiente y misterioso.', '../Imagenes/tom.jpg');
        let mascota6 = new MascotaCallejera(1,'Tweety', 'Ave', 'Verde', 'Callejera', 'Libertador, Caracas', 2, 'Años', 'Perico', 'Tweety es un perico muy sociable y divertido.', '../Imagenes/tweety.jpg',ubicacionExacta3,"Callejera");
        let mascota7 = new Mascota(2,'Max', 'Perro', 'Negro', 'Propia', 'Sucre, Caracas', 7, 'Años', 'Pastor Alemán', 'Max es un perro muy protector y valiente.', '../Imagenes/max.jpg');
        let mascota8 = new MascotaCallejera(1,'Luna', 'Gato', 'Blanca', 'Callejera', 'Bello Monte, Caracas', 3, 'Años', 'Angora', 'Luna es una gata muy elegante y sofisticada.', '../Imagenes/luna.jpg',ubicacionExacta4,"Callejera");
        let mascota9 = new Mascota(2,'Rocky', 'Perro', 'Blanco', 'Propia', 'Chacao, Caracas', 6, 'Años', 'Dálmata', 'Rocky es un perro muy enérgico y amigable.', '../Imagenes/rocky.jpg');
        let mascota10 = new MascotaExtraviada(3,'Coco', 'Ave', 'Verde', 'Extraviada', 'Coche, Caraca', 4, 'Años', 'Loro', 'Coco es un loro muy hablador y sociable.', '../Imagenes/coco.jpg',"Extraviada");
    
        // Lista de mascotas
        let listaMascotas1 = [mascota1, mascota2];
        let listaMascotas2 = [mascota3, mascota4, mascota5];
        let listaMascotas3 = [mascota6, mascota7];
        let listaMascotas4 = [mascota8, mascota9, mascota10];
        let listaMascotaVacia = [];

        // Solicitudes predeterminadas
        let horario1 = ['08:00', '17:00', ['Lunes', 'Martes', 'Miércoles']];
        let solicitud1 = new Solicitud(1, mascota2, 'enviada','Casa','Propia',true, true, horario1, 'Se quedaría con mi mamá','Por compañía', 'Yo', true, 'En su camita en el interior', true, 'Son dos chihuahuas', 'activo e independiente');
        let solicitud2 = new Solicitud(2, mascota5, 'enviada','Casa','Propia',true, true, horario1, 'Se quedaría con mi mamá','Por compañía', 'Yo', true, 'En su camita en el interior', true, 'Son dos chihuahuas', 'activo e independiente');
        let solicitud3 = new Solicitud(3, mascota5, 'enviada','Casa','Propia',true, true, horario1, 'Se quedaría con mi mamá','Por compañía', 'Yo', true, 'En su camita en el interior', true, 'Son dos chihuahuas', 'activo e independiente');
        let solicitud4 = new Solicitud(4, mascota1, 'enviada','Casa','Propia',true, true, horario1, 'Se quedaría con mi mamá','Por compañía', 'Yo', true, 'En su camita en el interior', true, 'Son dos chihuahuas', 'activo e independiente');

        let listaSolicitudesLlena = [solicitud1,solicitud2,solicitud4];

        let listaSolicitudes1 = [solicitud3];
        let listaSolicitudes2 = [];
        let listaSolicitudes3 = [];
        let listaSolicitudes4 = [];
        let listaAnuncios1= [];
        let listaAnuncios2= [];
        let listaAnuncios3= [];
        let listaAnuncios4= [];
        let listaAnuncios5= [];
        
        // Participantes predeterminados
        let participante1 = new Participante(1,'Diana', 'Rodriguez','2000-03-01','dvrl0603@gmail.com', '12345678',listaMascotas1,listaAnuncios1,listaSolicitudes1); //Tiene mascotas publicadas
        let participante2 = new Participante(2,'Carlos', 'Gomez', '2002-05-12', 'abrahamcarranza2602@gmail.com', '12345679',listaMascotas2,listaAnuncios2,listaSolicitudes2); //Tiene mascotas publicadas
        let participante3 = new Participante(3,'Nahomy', 'Rada', '1999-07-23', 'dvrodriguez.22@est.ucab.edu.ve', '1234',listaMascotaVacia,listaAnuncios3, listaSolicitudesLlena); //Tiene solicitudes 
        let participante4 = new Participante(4,'Luis', 'Martinez', '2001-08-14', 'nahomyrada07@gmail.com', '12345681',listaMascotas3,listaAnuncios4,listaSolicitudes3); //Tiene mascotas publicadas
        let participante5 = new Participante(5,'Sofia', 'Gonzalez', '2000-09-15', 'nmrada.22@est.ucab.edu.ve', '12345682',listaMascotas4,listaAnuncios5,listaSolicitudes4); //Tiene mascotas publicadas

        // Añadir los anuncios a los participantes que tienen mascotas callejeras
        let anuncio1 = new AnuncioCallejera(JSON.parse(JSON.stringify(participante1)),mascota2);
        participante1.listaAnuncios.push(anuncio1);
        let anuncio2 = new AnuncioCallejera(JSON.parse(JSON.stringify(participante2)),mascota4);
        participante2.listaAnuncios.push(anuncio2);
        let anuncio3 = new AnuncioCallejera(JSON.parse(JSON.stringify(participante4)),mascota6);
        participante4.listaAnuncios.push(anuncio3);
        let anuncio4 = new AnuncioCallejera(JSON.parse(JSON.stringify(participante5)),mascota8);
        participante5.listaAnuncios.push(anuncio4);
        let anuncio5 = new AnuncioExtraviada(JSON.parse(JSON.stringify(participante5)),mascota10);
        participante2.listaAnuncios.push(anuncio5);

        let listaParticipantes = [participante1, participante2, participante3, participante4, participante5];
        return listaParticipantes;
        }
}