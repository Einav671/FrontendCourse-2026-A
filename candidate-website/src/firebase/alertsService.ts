import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';
import { db } from './config'; // וודא שזה הנתיב לקובץ הגדרות ה-Firebase שלך
import type { SystemAlert } from '../pages/alerts/SystemAlert';

const COLLECTION_NAME = "systemAlerts";

// 1. קבלת כל ההתראות
export const getAllAlerts = async (): Promise<SystemAlert[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as SystemAlert));
};

// 2. קבלת התראה בודדת לפי ID
export const getAlertById = async (id: string): Promise<SystemAlert | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as SystemAlert;
    } else {
        return null;
    }
};

// 3. יצירת התראה חדשה
export const createAlert = async (alert: Omit<SystemAlert, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), alert);
};

// 4. עדכון התראה קיימת
export const updateAlert = async (id: string, alert: Partial<SystemAlert>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, alert);
};

// 5. מחיקת התראה
export const deleteAlert = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};