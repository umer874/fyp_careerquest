"use client";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCwwtt7vN1iDD8IEfiCUQkFl9D9J-9ML_E",
  authDomain: "career-labs-86167.firebaseapp.com",
  projectId: "career-labs-86167",
  storageBucket: "career-labs-86167.firebasestorage.app",
  messagingSenderId: "404276747527",
  appId: "1:404276747527:web:becd3d0f749887a9ee79a2",
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
