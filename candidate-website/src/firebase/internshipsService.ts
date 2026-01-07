import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';
import { db } from './config';
import type { Internship } from '../pages/internship/Internship';

const COLLECTION_NAME = "internships";

// 1. קבלת כל ההתמחויות
export const getAllInternships = async (): Promise<Internship[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Internship));
};

// 2. קבלת התמחות לפי ID
export const getInternshipById = async (id: string): Promise<Internship | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Internship;
    } else {
        return null;
    }
};

// 3. יצירת התמחות חדשה (ID אוטומטי)
export const createInternship = async (internship: Omit<Internship, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), internship);
};

// 4. עדכון התמחות
export const updateInternship = async (id: string, internship: Partial<Internship>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, internship);
};

// 5. מחיקת התמחות
export const deleteInternship = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};