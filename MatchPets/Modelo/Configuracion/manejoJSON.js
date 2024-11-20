let url = 'http://localhost:3000/';


export class manejoJSON{
    constructor(){

    }
  
    // Un participante
    guardarImagen(imageFile) {
      const formData = new FormData();
      formData.append('imgMascota', imageFile);
    
      return fetch(url + 'images/single', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al guardar la imagen');
        }
      })
      .then(data => {
        console.log('Imagen guardada exitosamente:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al guardar la imagen:', error);
        throw error;
      });
    }
    agregarParticipante(participante){        
        return fetch(url + "Participantes" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participante)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al agregar participante ' + response.status);
            }
        })
        .then(data => {
            console.log('Participante agregado: ', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    eliminarParticipante(participante){
      return fetch(url + "Participantes/" + participante.id , {
        method: 'DELETE',
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Error al eliminar participante ' + response.status);
          }
      })
      .then(data => {
          console.log('Participante eliminado: ', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }

    eliminarTodosParticipantes(listaParticipantes){
      listaParticipantes.forEach(participante => {
        this.eliminarParticipante(participante);
      });
    }
    
    actualizarParticipante(participante){
      return fetch(url + "Participantes/" + participante.id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participante)
      })
      .then(response => {
        if (response.ok){
          return response.json();
        }else{
          throw new Error('Error al actualizar el participante ' + response.status);
        }
      })
      .then(data => {
        console.log('Participante actualizado: ', data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
    }
    // Varios participantes 
    //Nota(Nahomy): Esta funcion en particular no se como funciona, no me pregunten, gracias la gerencia
     obtenerParticipantes(rutaAdicional) {
      let data;
      try {
        // Crear una nueva instancia de XMLHttpRequest
        const xhr = new XMLHttpRequest();
        // Configurar la solicitud HTTP
        xhr.open('GET', url + rutaAdicional, false); // El tercer parámetro 'false' hace que la solicitud sea síncrona
        // Enviar la solicitud
        xhr.send();
        // Verificar el estado de la solicitud
        if (xhr.status === 200) {
          // Parsear los datos JSON
          data = JSON.parse(xhr.responseText);
        } else {
          console.error('Error obteniendo ' + rutaAdicional + ": ", xhr.status, xhr.statusText);
          data = null;
        }
        // Retornar los datos
        return data;
      } catch (error) {
        console.error('Error obteniendo los participantes', error);
        return null;
      }
    }
// Función para realizar la solicitud HTTP
    guardarVariosParticipantes(listaParticipantes){
      listaParticipantes.forEach(participante => {
        this.agregarParticipante(participante);
      });
    }
    // Esta solo se usa UNA VEZ, no la esten llamando porque solo se usa cuando ParticipanteEnLinea no tiene datos;
    // Es decir, cuando inicia el programa 
    guardarParticipanteEnLinea(participante){
      return fetch(url + "ParticipanteEnLinea" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participante)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar participanteEnLinea ' + response.status);
        }
    })
    .then(data => {
        console.log('ParticipanteEnLinea agregado: ', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    }
    actualizarParticipanteEnLinea(participante){
      return fetch(url + "ParticipanteEnLinea" , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participante)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al actualizar participanteEnLinea' + response.status);
        }
    })
    .then(data => {
        console.log('ParticipanteEnLinea actualizado: ', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  // Cuando cierre sesion o elimine su perfil hay que llamar esta 
    eliminarParticipanteEnLinea(participante){
      return fetch(url + "ParticipanteEnLinea/" + participante.id , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(participante)
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Error al eliminar participanteEnLinea ' + response.status);
          }
      })
      .then(data => {
          console.log('participanteEnLinea eliminado: ', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }

    sendButtonClickToServer(action) {
      fetch(url + '/handle-button-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        console.error('Error al enviar la información del botón:', error);
      });
    }
  }  


    

// let controladorJSON = new manejoJSON();
// document.addEventListener('load', controladorJSON.getData());
