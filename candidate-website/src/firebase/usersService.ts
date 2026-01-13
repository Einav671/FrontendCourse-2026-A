import {
    collection,
    getDocs,
    getDoc,
    setDoc, // שימוש ב-setDoc כדי לקבוע ID ידנית (המייל)
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from './config';
import type { User } from '../pages/users/types/User'; // נגדיר את זה מיד

const COLLECTION_NAME = "users";

// 1. קבלת כל המשתמשים
export const getAllUsers = async (): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id, // ה-ID הוא המייל בפועל
        ...doc.data()
    } as User));
};

// 2. קבלת משתמש בודד לפי אימייל
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const docRef = doc(db, COLLECTION_NAME, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
    } else {
        return null;
    }
};

// 3. יצירת משתמש חדש (המייל הוא המזהה)
export const createUser = async (email: string, user: Omit<User, 'id'>) => {
    // אנחנו שומרים את המסמך כשהמפתח שלו הוא האימייל
    return await setDoc(doc(db, COLLECTION_NAME, email), user);
};

// 4. עדכון פרטי משתמש
export const updateUser = async (email: string, user: Partial<User>) => {
    const docRef = doc(db, COLLECTION_NAME, email);
    return await updateDoc(docRef, user);
};

// 5. מחיקת משתמש
export const deleteUser = async (email: string) => {
    const docRef = doc(db, COLLECTION_NAME, email);
    return await deleteDoc(docRef);
};