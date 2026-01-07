import { 
    collection, 
    getDocs, 
    getDoc, 
    setDoc, // שימוש ב-setDoc כדי לקבוע ID ידנית
    updateDoc, 
    deleteDoc, 
    doc,
} from 'firebase/firestore'; 
import { db } from './config'; 
import type { Graduate } from '../pages/graduates/Graduate';

const COLLECTION_NAME = "graduates";

// 1. קבלת כל הבוגרים
export const getAllGraduates = async (): Promise<Graduate[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Graduate));
};

// 2. קבלת בוגר בודד לפי ID (ת.ז)
export const getGraduateById = async (id: string): Promise<Graduate | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Graduate;
    } else {
        return null;
    }
};

// 3. יצירת בוגר חדש (עם תעודת זהות כמזהה)
export const createGraduate = async (id: string, graduate: Omit<Graduate, 'id'>) => {
    // אנו משתמשים ב-setDoc כדי שהמסמך יקבל את תעודת הזהות כ-ID
    return await setDoc(doc(db, COLLECTION_NAME, id), graduate);
};

// 4. עדכון פרטי בוגר
export const updateGraduate = async (id: string, graduate: Partial<Graduate>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, graduate);
};

// 5. מחיקת בוגר
export const deleteGraduate = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};