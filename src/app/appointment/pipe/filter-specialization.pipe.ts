import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSpecialization',
  standalone: true
})
export class FilterSpecializationPipe implements PipeTransform {

   transform(appointments: any[], specializations: any[]): any[] {
    if (!appointments || !specializations) {
      return [];
    }

    return appointments.map(appointment => {
      const specialization = specializations.find(spec => spec.SpecializationID === appointment.SpecializationID);
      return {
        ...appointment,
        Specialization: specialization ? specialization.Specialization : 'Unknown Specialization'
      };
    });
  }

}
