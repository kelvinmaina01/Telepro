import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth, User } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Check if Firebase config is available
const hasFirebaseConfig = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;
let googleProvider: GoogleAuthProvider;

// Create proper dummy implementations for demo mode
const createDummyAuth = (): Auth => {
  const dummyAuth = {
    currentUser: null as User | null,
    onAuthStateChanged: (callback: (user: User | null) => void) => {
      // Call immediately with null user for demo mode
      callback(null);
      return () => {}; // Return unsubscribe function
    },
    signInWithPopup: async () => {
      console.log("Firebase auth is disabled - running in demo mode");
      // Return a dummy user for demo mode
      return {
        user: {
          uid: "demo-user-id",
          email: "demo@example.com",
          displayName: "Demo User",
        } as User,
      } as any;
    },
    signOut: async () => {
      console.log("Firebase signOut is disabled - running in demo mode");
    },
  } as any;
  return dummyAuth;
};

const createDummyFirestore = (): Firestore => {
  const dummyFirestore = {
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async () => {},
        update: async () => {},
      }),
      where: () => ({
        get: async () => ({ empty: true, docs: [] }),
      }),
    }),
    doc: () => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => {},
      update: async () => {},
    }),
  } as any;
  return dummyFirestore;
};

const createDummyGoogleProvider = (): GoogleAuthProvider => {
  return {} as GoogleAuthProvider;
};

try {
  if (hasFirebaseConfig) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
    };

    // Initialize Firebase
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    
    console.log("Firebase initialized successfully");
  } else {
    console.log("Firebase config not available - running in demo mode");
    // Create proper dummy objects for demo mode
    auth = createDummyAuth();
    db = createDummyFirestore();
    googleProvider = createDummyGoogleProvider();
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  console.log("Running in demo mode without Firebase");
  // Create proper dummy objects for demo mode
  auth = createDummyAuth();
  db = createDummyFirestore();
  googleProvider = createDummyGoogleProvider();
}

export { auth, db, googleProvider };
