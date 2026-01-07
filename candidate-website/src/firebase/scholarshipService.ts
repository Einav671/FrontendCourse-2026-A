import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';
import { db } from './config'; // או הנתיב לקובץ הקונפיגורציה שלך
import type { Scholarship } from '../pages/Scholarships/Scholarship';

// הגדרת שם האוסף במקום אחד
const COLLECTION_NAME = "scholarships";


// 1. קבלת כל המלגות
export const getAllScholarships = async (): Promise<Scholarship[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Scholarship));
};

// 2. קבלת מלגה בודדת לפי ID
export const getScholarshipById = async (id: string): Promise<Scholarship | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Scholarship;
    } else {
        return null;
    }
};

// 3. הוספת מלגה חדשה
export const createScholarship = async (scholarship: Omit<Scholarship, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), scholarship);
};

// 4. עדכון מלגה קיימת
export const updateScholarship = async (id: string, scholarship: Partial<Scholarship>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, scholarship);
};

// 5. מחיקת מלגה
export const deleteScholarship = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};

export { db };
