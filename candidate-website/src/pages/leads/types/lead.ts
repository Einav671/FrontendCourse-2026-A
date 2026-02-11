export interface Lead {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    createdAt?: Date; // שדה תאריך שנוסיף אוטומטית
}
