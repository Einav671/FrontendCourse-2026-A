import { 
    collection, 
    addDoc,
    serverTimestamp, 
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore';
import { db } from './config';
import type { Lead } from '../pages/leads/types/lead';


const COLLECTION_NAME = "leads";


// 1. קבלת כל הלידים 
export const getAllLeads = async (): Promise<Lead[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
};

// 2. קבלת משתמש בודד
export const getleadByEmail = async (email: string): Promise<Lead | null> => {
    const docRef = doc(db, COLLECTION_NAME, email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Lead;
    } else {
        return null;
    }
};

// פונקציה לשמירת ליד חדש (פנייה)
export const createLead = async (leadData: Lead) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
        ...leadData,
        createdAt: serverTimestamp() // שמירת הזמן המדויק של הפנייה בשרת
    });
};