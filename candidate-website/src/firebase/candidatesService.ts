import {
    collection,
    getDocs,
    getDoc,
    setDoc, // שינינו מ-addDoc ל-setDoc
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from './config';
import type { Candidate } from '../pages/candidates/types/Candidate';

const COLLECTION_NAME = "candidates";

// 1. קבלת כל המועמדים
export const getAllCandidates = async (): Promise<Candidate[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Candidate));
};

// 2. קבלת מועמד בודד
export const getCandidateById = async (id: string): Promise<Candidate | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Candidate;
    } else {
        return null;
    }
};

// 3. יצירת מועמד חדש (עם תעודת זהות כמזהה)
// שים לב: אנחנו מקבלים גם את ה-id בנפרד כדי לייצר את המסמך עליו
export const createCandidate = async (id: string, candidate: Omit<Candidate, 'id'>) => {
    // שימוש ב-setDoc כדי לקבוע את ה-ID של המסמך להיות תעודת הזהות
    return await setDoc(doc(db, COLLECTION_NAME, id), candidate);
};

// 4. עדכון
export const updateCandidate = async (id: string, candidate: Partial<Candidate>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, candidate);
};

// 5. מחיקה
export const deleteCandidate = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};