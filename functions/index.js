/* eslint-disable eqeqeq */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const notificacionController = require("./components/Notifications/NotificacionesController");
const Notificaciones = require("./components/Notifications/Notificaciones");

const geoCodeController = require("./components/GoogleMaps/geoCode_Controller");
admin.initializeApp();

exports.reverseGeoCode = functions.https.onCall((data, context) => {
  return geoCodeController.getReverseGeoCode(data, context);
});

exports.registrarTopico = functions.firestore
  .document("Tokens/{id}")
  .onCreate(notificacionController.creacionTokenController);

exports.enviarNotificacion = functions.firestore
  .document("Orders/{id}")
  .onUpdate(async (change, context) => {
    const previousData = change.before.data();
    const data = change.after.data();

    const prevState = previousData.state;
    const newState = data.state;

    const db = admin.firestore();
    const snapshot = await db
      .collection("Users")
      .doc(change.after.data().uid)
      .get();
    const token = snapshot.data().tokenMessaging;
    const notificaciones = new Notificaciones.Notificaciones();
    if (prevState !== newState) {
      if (newState == "En Elaboración") {
        notificaciones.enviarNotificacionAToken(
          `📋 Tu pedido a cambiado de estado`,
          `En Elaboración`,
          `Hemos confirmado el pedido y nos encontramos en proceso de elaboración 🍩😋`,
          "",
          token
        );
      } else if (newState == "En Camino") {
        notificaciones.enviarNotificacionAToken(
          `📋 Tu pedido a cambiado de estado`,
          `En Camino`,
          `¡Tu pedido esta en camino 🍩🚀! Ha sido enviado a tu dirección 😊`,
          "",
          token
        );
      } else if (newState == "Terminado") {
        notificaciones.enviarNotificacionAToken(
          `📋 Tu pedido a cambiado de estado`,
          `Terminado`,
          `¡Que disfrutes! 😍🍩 Ahora puedes pasar por nuestras instalaciones a retirar tu pedido 🚀`,
          "",
          token
        );
      } else if (newState == "Entregado") {
        notificaciones.enviarNotificacionAToken(
          `📋 Tu pedido a cambiado de estado`,
          `Entregado`,
          `¡Gracias por preferirnos! Que disfrutes de tus ricas donas 🍩😋`,
          "",
          token
        );
      } else if (newState == "Rechazado") {
        notificaciones.enviarNotificacionAToken(
          `📋 Tu pedido a cambiado de estado`,
          `Rechazado`,
          `¡Lo sentimos! Tu pedido ha sido rechazado.`,
          "",
          token
        );
      }
    }
  });
/*
exports.test = functions.firestore
  .document("Orders/{userId}")
  .onWrite((change, context) => {
    const data = change.after.data();
    const previousData = change.before.data();
    return change.after.ref.set({
      orderState: "Por Confirmar"
    });
});*/
