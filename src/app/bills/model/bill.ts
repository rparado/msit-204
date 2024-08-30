export interface Bill {
    BillingID: string;
    ConsultationFee: number;
    InsuranceCoverage: number;
    TotalAmount: number;
    isPaid: boolean
}