const admin = require("firebase-admin");

class Notificaciones {
  registrarTokenAlTopico(token) {
    const registrationTokens = [token];

    return admin
      .messaging()
      .subscribeToTopic(registrationTokens, "NewOrder")
      .then(() => {
        return console.log(`Se adiciona correctamente al topico el token`);
      })
      .catch(error => {
        console.error(`Error registrando al topico el token => ${error}`);
      });
  }

  enviarNotificacion(titulo, subtitle, descripcion, topico, tipo) {
    const topicoEnviar = topico === null ? "NewOrder" : topico;

    const mensaje = {
      data: {
        titulo: titulo,
        subtitle: subtitle,
        descripcion: descripcion,
        tipo: tipo
      },
      topic: topicoEnviar
    };

    return admin
      .messaging()
      .send(mensaje)
      .then(() => {
        return console.log(
          `Mensaje enviado correctamente al topico NuevosPosts`
        );
      })
      .catch(error => {
        console.error(
          `Error enviando mensaje al topico NuevosPosts => ${error}`
        );
      });
  }

  enviarNotificacionAToken(titulo, subtitle, descripcion, tipo, token) {
    console.log("token");
    console.log(token);
    const mensaje = {
      data: {
        titulo: titulo,
        subtitle: subtitle,
        descripcion: descripcion,
        tipo: tipo
      },
      token: token
    };

    return admin
      .messaging()
      .send(mensaje)
      .then(() => {
        return console.log(`Mensaje enviado correctamente al token`);
      })
      .catch(error => {
        console.error(`Error enviando mensaje al token => ${error}`);
      });
  }
}

exports.Notificaciones = Notificaciones;
