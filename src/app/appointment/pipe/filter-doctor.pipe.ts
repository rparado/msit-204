import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAppointments',
  standalone: true
})
export class FilterDoctorPipe implements PipeTransform {
  transform(appointments: any[], doctors: any[], specializations: any[]): any[] {
    if (!appointments || !doctors || !specializations) {
      return [];
    }
  
    // Create a map of specialization IDs to names
    const specializationMap = specializations.reduce((map, spec) => {
      map[spec.SpecializationID] = spec.Specialization;
      return map;
    }, {});
  
    // Create a map of doctor IDs to names
    const doctorMap = doctors.reduce((map, doctor) => {
      map[doctor.DoctorID] = `${doctor.FirstName} ${doctor.LastName}`;
      return map;
    }, {});
  
    // Map appointments to include Specialization name and Doctor name
    return appointments.map(appointment => {
      const specializationName = specializationMap[appointment.SpecializationID] || 'Unknown Specialization';
      const doctorName = doctorMap[appointment.DoctorID] || 'No Doctor';
  
      return {
        ...appointment,
        Specialization: specializationName,
        DoctorName: doctorName
      };
    });
  }
}
