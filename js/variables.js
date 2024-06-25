//*
import { generateId } from './functions.js';

//* GLobal Variables
export const editMode = { value: false };

//* Appointment Object
export const appointmentObj = {
  id: generateId(),
  paciente: '',
  propietario: '',
  email: '',
  fecha: '',
  symptoms: ''
};
