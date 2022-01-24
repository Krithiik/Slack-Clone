importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.4/firebase-messaging-compat.js"
);
// const firebaseConfig = {your config };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
console.info("Firebase messaging service worker is set up");

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
