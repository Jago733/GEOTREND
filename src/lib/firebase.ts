import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyAXubiAQcUY0xo79KE-Zle_DVciCdtDVx4",
  authDomain: "geo-trend-6f1c1.firebaseapp.com",
  projectId: "geo-trend-6f1c1",
  storageBucket: "geo-trend-6f1c1.firebasestorage.app",
  messagingSenderId: "176302530595",
  appId: "1:176302530595:web:f16c5bc3c38af35a529196",
  measurementId: "G-JBVEZ0CV64",
};

// Initialize Firebase safely (avoid re-initialization during Next.js hot reloads)
export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics only in client-side environments where it is supported
let analyticsInstance: Analytics | null = null;

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;

  try {
    const supported = await isSupported();
    if (supported) {
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    }
  } catch (error) {
    console.warn("Firebase Analytics no está soportado en este entorno:", error);
  }
  return null;
};
