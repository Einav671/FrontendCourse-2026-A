import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';
import { db } from './config'; // וודא שהנתיב תואם לקובץ ההגדרות שלך
import type { Course } from '../pages/courses/Course';

const COLLECTION_NAME = "courses";

// 1. קבלת כל הקורסים
export const getAllCourses = async (): Promise<Course[]> => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Course));
};

// 2. קבלת קורס בודד לפי ID
export const getCourseById = async (id: string): Promise<Course | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Course;
    } else {
        return null;
    }
};

// 3. יצירת קורס חדש (ID אוטומטי)
export const createCourse = async (course: Omit<Course, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), course);
};

// 4. עדכון קורס קיים
export const updateCourse = async (id: string, course: Partial<Course>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, course);
};

// 5. מחיקת קורס
export const deleteCourse = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
};