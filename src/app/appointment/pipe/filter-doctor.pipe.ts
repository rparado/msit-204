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

    // Create a map of doctor IDs to names based on specialization
    const doctorMap = doctors.reduce((map, doctor) => {
      if (!map[doctor.SpecializationID]) {
        map[doctor.SpecializationID] = {};
      }
      map[doctor.SpecializationID][doctor.DoctorID] = `${doctor.FirstName} ${doctor.LastName}`;
      return map;
    }, {});

    // Map appointments to include Specialization name and Doctor name
    return appointments.map(appointment => {
      const specializationName = specializationMap[appointment.SpecializationID] || 'Unknown Specialization';
      const doctorName = doctorMap[appointment.SpecializationID]?.[appointment.DoctorID] || 'No Doctor';

      return {
        ...appointment,
        Specialization: specializationName,
        DoctorName: doctorName
      };
    });
  }
}
