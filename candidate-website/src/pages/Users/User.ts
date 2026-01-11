export interface User {
    id: string; // זה יחזיק את המייל (כי הוא ה-ID ב-Firebase)
    email: string; // נשמור את המייל גם כשדה רגיל לנוחות
    fullName: string;
    password: string;
    userType: string;
}