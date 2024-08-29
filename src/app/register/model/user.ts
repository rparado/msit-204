export interface PatientProfile {
    firstName: string;
    lastName: string;
    gender: string;
    bday: string;
    contactInfo: string;
    address: string;
    userId?: number;
    InsuranceCoverage?: string;
    PatientID?: number;
    status?: boolean;
}

export interface Register {
    username?: string;
    password?: string;
    profileUpdated?: boolean;
}