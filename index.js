const express = require('express');
const cors = require('cors');
const data = require('./MatchPets/Modelo/Configuracion/datos.json');
const rutaJson = './MatchPets/Modelo/Configuracion/datos.json';
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './MatchPets/Vista/Imagenes'}); 
const fs2 = require('node:fs');

const app = express();
app.use(express.json());
app.use(cors())


const PORT = 3000
//Imagenes
app.post('/images/single',upload.single('imgMascota'), (req,res) => {
    try{
        guardarImagen(req.file);
        res.status(200).send({ message : 'Imagen guardada exitosamente'});
    } catch (error) {
        res.status(500).send('Error al guardar la imagen ');
}
    
});

function guardarImagen(file){
    const newPath = `./MatchPets/Vista/Imagenes/${file.originalname}`;
    fs2.renameSync(file.path,newPath);
    return newPath;
}
// Envia todos los participantes
app.get('/Participantes', (req, res)=>{
    if (data.Participantes.length === 0){
        res.status(204).json({ message: 'No hay participantes' });
    }else{
        res.send(data.Participantes);
    }
    
})
//Envia participante en linea
app.get('/ParticipanteEnLinea', (req, res)=>{
    if (data.ParticipanteEnLinea.length === 0){
        res.status(204).json({ message: 'No hay participante en linea' });
    }else{
        res.send(data.ParticipanteEnLinea);
    }
})
// Envia un participante
app.get('/Participantes/:id', (req, res)=>{
    const id = req.params.id;
    const IndiceDelParticipante = encontrarParticipante(id,data.Participantes);
    if(IndiceDelParticipante != -1){
        res.send(data.Participantes[IndiceDelParticipante]);
    }else{
        res.status(404).json({ message: 'Participante no encontrado' });
    }
    
})
// Agrega participante nuevo
app.post('/Participantes', (req, res)=>{
    const json = req.body
    try{
        data.Participantes.push(json);
        fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
        res.status(200).send(data);
    } catch (error) {
    res.status(500).send('Error al guardar los participantes:');
    }
})
// Actualiza un participante
app.put('/Participantes/:id', (req, res) => {
    const id = req.params.id;
    const json = req.body;
    try {
        const IndiceDelParticipante = encontrarParticipante(id,data.Participantes);
        if (IndiceDelParticipante != -1) {
            data.Participantes[IndiceDelParticipante] = json;
            fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
            res.status(200).json({ message: 'Participante actualizado' });
        }else {
            res.status(404).json({ message: 'Participante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});
// Elimina un participante
app.delete('/Participantes/:id',(req,res) => {
    const id = req.params.id;
    try {
        const IndiceDelParticipante = encontrarParticipante(id,data.Participantes);
        if (IndiceDelParticipante != -1) {
            data.Participantes.splice(IndiceDelParticipante,1);
            fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
            res.status(200).json({ message: 'Participante eliminado' });
        }else {
            res.status(404).json({ message: 'Participante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})
// Agrega un participante en linea
app.post('/ParticipanteEnLinea',(req, res) => {
    const json = req.body
    try{
        data.ParticipanteEnLinea = json;     
        fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
        res.status(200).send(data);
    } catch (error) {
    res.status(500).send('Error al guardar el participanteEnLinea:');
    }
})
// Actualiza el participante en linea
app.put('/ParticipanteEnLinea',(req, res) =>{
    const json = req.body;
    try {
        data.ParticipanteEnLinea = json;
        fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'ParticipanteEnLinea actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})
// Elimina el participante en linea
app.delete('/ParticipanteEnLinea/:id',(req, res) =>{
    const id = req.params.id;
    try {
        console.log(data.ParticipanteEnLinea.length);
        data.ParticipanteEnLinea = {};
        fs.writeFileSync(rutaJson, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'ParticipanteEnLinea eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
})
// Encuentra un participante, es una funcion de ayuda
function encontrarParticipante(id, lista){
    let participanteIndice = -1;
    console.log("cantidad: " + lista.length);
    for (let i = 0; i < lista.length; i++) {
        if (String(lista[i].id) === String(id)) {
            participanteIndice = i;
            break;
        }
    }
    return participanteIndice;
}

// Ni idea
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})