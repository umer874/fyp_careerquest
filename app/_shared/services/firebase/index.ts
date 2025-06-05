"use client";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
   apiKey: "AIzaSyDq7gsDGpPFRGWmRtIHBb8Rc-OpGB2QPos",
  authDomain: "career-4b68b.firebaseapp.com",
  projectId: "career-4b68b",
  storageBucket: "career-4b68b.firebasestorage.app",
  messagingSenderId: "1031296996702",
  appId: "1:1031296996702:web:fad7335e503b72d691abcf",
  measurementId: "G-VJBN1F63HK"
};

const app = initializeApp(firebaseConfig);

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== "undefined" && "Notification" in window) {
  // Initialize messaging only in the browser
  messaging = getMessaging(app);
}

export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    if (messaging) {
      const token = await getToken(messaging, {
        vapidKey:
          "BIyyQCTZBWNHQLLvgpLTj8olbFWkK8eo5jCZWsPAkZMjymn1ALXb6TMdprBhrZZ483U1EQ6YsM5H9x0yWFgYPFs",
      });
      if (token) {
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const onMessageListener = (callback: any): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!messaging) {
      reject("Unsupported browser or environment.");
      return;
    }
    onMessage(messaging, (payload) => {
      resolve(payload);
      callback(payload);
    });
  });
