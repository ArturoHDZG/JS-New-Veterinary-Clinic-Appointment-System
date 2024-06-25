//* Imports
import Notification from './classes/Notification.js';
import AppointmentAdmin from './classes/AppointmentAdmin.js';
import { appointmentObj, editMode } from './variables.js';
import {
  petInput, ownerInput, emailInput,
  dateInput, symptomsInput, form,
  formSubmit
} from './selectors.js';

//* Instances
const appointmentAdmin = new AppointmentAdmin();

//* Functions
export function inputValues(e) {
  appointmentObj[ e.target.name ] = e.target.value;
}

export function submitValues(e) {
  e.preventDefault();

  // Validate form data
  if (Object.values(appointmentObj).some(valor => valor.trim() === '')) {
    new Notification({
      message: 'Todos los campos son obligatorios',
      type: 'error'
    });

    return;
  }

  if (editMode.value) {
    appointmentAdmin.editAppointment({ ...appointmentObj });
    new Notification({
      message: 'Cita editada con éxito',
      type: 'success'
    });

    editMode.value = false;

  } else {
    appointmentAdmin.addAppointment({ ...appointmentObj });
    new Notification({
      message: 'Cita agregada con éxito',
      type: 'success'
    });
  }

  form.reset();
  resetAppointmentObj();
  formSubmit.value = 'Registrar Paciente';
}

export function resetAppointmentObj() {
  // Clear form inputs
  Object.assign(appointmentObj, {
    id: generateId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    symptoms: ''
  });
}

export function generateId() {
  const BASE_RANDOM = 36;
  return `${Math.random().toString(BASE_RANDOM).substring(2)}${Date.now()}`;
}

export function loadEdit(appointment) {
  Object.assign(appointmentObj, appointment);

  petInput.value = appointment.paciente;
  ownerInput.value = appointment.propietario;
  emailInput.value = appointment.email;
  dateInput.value = appointment.fecha;
  symptomsInput.value = appointment.symptoms;

  editMode.value = true;

  formSubmit.value = 'Guardar Cambios';
}
