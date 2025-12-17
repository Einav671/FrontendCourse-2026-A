export class Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  degreeCode: string;
  bagrut: number;
  psychometric: number;
  status: string;

  constructor(
    id: string,
    fullName: string,
    email: string,
    phone: string,
    degreeCode: string,
    bagrut: number,
    psychometric: number,
    status: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.degreeCode = degreeCode;
    this.bagrut = bagrut;
    this.psychometric = psychometric;
    this.status = status;
  }
}