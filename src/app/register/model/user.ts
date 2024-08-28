export interface PatientProfile {
    firstName: string;
    lastName: string;
    gender: string;
    bday: string;
    contactInfo: string;
    address: string;
    userId?: number;
}

export interface Register {
    username?: string;
    password?: string;
}