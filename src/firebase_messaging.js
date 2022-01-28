import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//get device token and store in firestore for notification.
async function saveMessagingDeviceToken() {
  try {
    const currentToken = await getToken(getMessaging());
    if (currentToken) {
      console.log("Got FCM device token:", currentToken);
      // Saving the Device Token to Cloud Firestore.
      const tokenRef = doc(getFirestore(), "fcmTokens", currentToken);
      await setDoc(tokenRef, { uid: getAuth().currentUser.uid });
    } else {
      // Need to request permissions to show notifications.
      requestNotificationsPermissions();
    }
  } catch (error) {
    console.error("Unable to get messaging token.", error);
  }
}

async function requestNotificationsPermissions() {
  console.log("Requesting notifications permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    // Notification permission granted.
    await saveMessagingDeviceToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
}

//this method is not used anywhere.JUst for reference
export const fetchMessage = async () => {
  // This will fire when a message is received while the app is in the foreground.
  // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
  onMessage(getMessaging(), (message) => {
    console.log(
      "New foreground notification from Firebase Messaging!",
      message.notification
    );
    return message.notification;
  });
};

export default saveMessagingDeviceToken;
