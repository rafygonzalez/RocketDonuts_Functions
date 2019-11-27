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
  .onUpdate(async (change, context) => {
    const data = change.after.data();
    console.log(data);
    const previousData = change.before.data();
    console.log(previousData);
    const userId = context.params.userId;
    const db = admin.firestore();
    const snapshot = await db
      .collection("Users")
      .doc(userId)
      .get();
    const token = snapshot.data().tokenMessaging;

    const notificaciones = new Notificaciones.Notificaciones();
    notificaciones.enviarNotificacionAToken(
      `Nuevo pedido`,
      `${123}`,
      `Hemos recibido tu pedido satisfactoriamente, en breve lo procesaremos.`,
      "",
      token
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
