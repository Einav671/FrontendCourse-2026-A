export interface Graduate {
    id: string; // המזהה ב-Firebase (שהוא גם תעודת הזהות)
    identityCard: string; // שדה לתצוגה ולוגיקה
    fullName: string;
    role: string;
    degree: string;
    imageUrl: string;
    review: string;
    status: 'pending' | 'approved' | 'rejected';
}