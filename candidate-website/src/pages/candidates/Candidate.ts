export interface Candidate {
  id: string;          // המזהה בפיירבייס (שהוא תעודת הזהות)
  identityCard: string; // השדה שהוספנו
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  degreeCode: string;
  bagrut: number;
  psychometric: number;
  status: string;
}