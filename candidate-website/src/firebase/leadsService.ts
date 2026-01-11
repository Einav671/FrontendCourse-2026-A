import { 
    collection, 
    addDoc,
    serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = "leads";

export interface Lead {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    createdAt?: Date; // שדה תאריך שנוסיף אוטומטית
}

// פונקציה לשמירת ליד חדש (פנייה)
export const createLead = async (leadData: Lead) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
        ...leadData,
        createdAt: serverTimestamp() // שמירת הזמן המדויק של הפנייה בשרת
    });
};