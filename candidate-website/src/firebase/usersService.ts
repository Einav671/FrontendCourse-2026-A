import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { initializeApp, deleteApp } from 'firebase/app';
import { db, firebaseConfig } from './config';
import type { User } from '../pages/users/types/User'; // וודא שהנתיב נכון אצלך

const COLLECTION_NAME = "users";

// 1. קבלת כל המשתמשים
export const getAllUsers = async (): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as User));
};

// 2. קבלת משתמש בודד
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const docRef = doc(db, COLLECTION_NAME, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
    } else {
        return null;
    }
};

// 3. יצירת משתמש חדש - באמצעות אפליקציה משנית
// זה מונע מהאדמין המחובר להתנתק בעת יצירת משתמש חדש
export const createUser = async (email: string, password: string, userDetails: Omit<User, 'id'>) => {

    // יצירת מופע זמני של אפליקציית Firebase
    const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
    const secondaryAuth = getAuth(secondaryApp);

    try {
        // יצירת המשתמש ב-Auth של האפליקציה המשנית
        await createUserWithEmailAndPassword(secondaryAuth, email, password);

        // שמירת שאר הפרטים ב-Firestore (ב-DB הראשי)
        await setDoc(doc(db, COLLECTION_NAME, email), userDetails);

        // התנתקות מהאפליקציה המשנית ליתר ביטחון
        await signOut(secondaryAuth);

    } finally {
        // מחיקת האפליקציה המשנית מהזיכרון
        await deleteApp(secondaryApp);
    }
};

// 4. עדכון פרטי משתמש
export const updateUser = async (email: string, user: Partial<User>) => {
    const docRef = doc(db, COLLECTION_NAME, email);
    return await updateDoc(docRef, user);
};

// 5. מחיקת משתמש
export const deleteUser = async (email: string) => {
    // שים לב: פונקציה זו מוחקת רק מה-DB.
    // מחיקה מ-Auth דורשת Firebase Admin SDK (צד שרת/Cloud Function) 
    // ואינה אפשרית לביצוע מכאן עבור משתמש אחר.
    const docRef = doc(db, COLLECTION_NAME, email);
    return await deleteDoc(docRef);
};