const functions = require("firebase-functions");
const admin = require("firebase-admin");
const notificacionController = require("./components/Notifications/NotificacionesController");
const Notificaciones = require("./components/Notifications/Notificaciones");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp();
exports.registrarTopico = functions.firestore
  .document("Tokens/{id}")
  .onCreate(notificacionController.creacionTokenController);

exports.enviarNotificacion = functions.firestore
  .document("Orders/{userId}")
  .onUpdate(snapshot => {
    console.log(snapshot);
    const notificaciones = new Notificaciones.Notificaciones();
    notificaciones.enviarNotificacion(
      "Prueba",
      "Prueba",
      "NewOrder",
      "Mensaje"
    );
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
