//Egy felhasznalot jelento interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  country?: string;
  nationality: string;
  mothersName: string;
  registered?: boolean;
  gender?: string;
  birthDate?: any;
  number?: string;
  status?: string;
}
