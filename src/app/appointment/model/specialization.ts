export interface Specialization {
    SpecializationID?: string;
    Specialization?: string;
}

export interface Doctors {
    FirstName: string;
    LastName: string;
    Gender: string;
    ContactInfo: string;
    IsAvailableToday: boolean;
    ConsultationFee: number;
    DoctorID?: string;
    SpecializationID?: string;
}
export interface AppointmentData {
    PatientID: string;
    DoctorID: string;
    SpecializationID: string;
    AppointmentDate: string;
}