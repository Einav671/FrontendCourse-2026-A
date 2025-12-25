export class Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  degreeCode: string;
  bagrut: number;
  psychometric: number;
  status: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    degreeCode: string,
    bagrut: number,
    psychometric: number,
    status: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.degreeCode = degreeCode;
    this.bagrut = bagrut;
    this.psychometric = psychometric;
    this.status = status;
  }
}