//* Imports
import { container } from './../selectors.js';
import { loadEdit } from './../functions.js';

//* Class
export default class AppointmentAdmin {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [ ...this.appointments, appointment ];
    this.showAppointment();
  }

  showAppointment() {
    // Constants
    const TEXT_CLASSES = [
      'font-normal', 'mb-3',
      'text-gray-700', 'normal-case'
    ];

    const BUTTON_CLASSES = [
      'py-2', 'px-10', 'text-white', 'font-bold', 'uppercase',
      'rounded-lg', 'flex', 'items-center', 'gap-2'
    ];

    // Clear HTML
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Check if there are appointments
    if (this.appointments.length === 0) {
      container.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`;

      return;
    }

    // Insert appointments
    this.appointments.forEach(appointment => {
      const divAppointment = document.createElement('DIV');
      divAppointment.classList.add(
        'mx-5', 'my-10', 'bg-white', 'shadow-md',
        'px-5', 'py-10', 'rounded-xl'
      );
      const pet = document.createElement('P');
      pet.classList.add(...TEXT_CLASSES);
      pet.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${appointment.paciente}`;

      const owner = document.createElement('P');
      owner.classList.add(...TEXT_CLASSES);
      owner.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${appointment.propietario}`;

      const email = document.createElement('P');
      email.classList.add(...TEXT_CLASSES);
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${appointment.email}`;

      const date = document.createElement('P');
      date.classList.add(...TEXT_CLASSES);
      date.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${appointment.fecha}`;

      const symptoms = document.createElement('P');
      symptoms.classList.add(...TEXT_CLASSES);
      symptoms.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${appointment.symptoms}`;

      // Create Edit Button
      const editBtn = document.createElement('button');
      editBtn.classList.add(
        'edit-btn', 'bg-indigo-600', 'hover:bg-indigo-700', ...BUTTON_CLASSES
      );

      editBtn.innerHTML = `
      Editar
      <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
      </svg>`;
      const cloneAppointment = structuredClone(appointment);
      editBtn.onclick = () => loadEdit(cloneAppointment);

      // Create Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add(
        'delete-btn', 'bg-red-600', 'hover:bg-red-700', ...BUTTON_CLASSES
      );

      deleteBtn.innerHTML = `
      Eliminar
      <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`;
      deleteBtn.onclick = () => this.deleteAppointment(appointment.id);

      // Insert Elements into HTML
      const btnContainer = document.createElement('DIV');
      btnContainer.classList.add('flex', 'justify-between', 'mt-10');
      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      divAppointment.appendChild(pet);
      divAppointment.appendChild(owner);
      divAppointment.appendChild(email);
      divAppointment.appendChild(date);
      divAppointment.appendChild(symptoms);
      divAppointment.appendChild(btnContainer);

      container.appendChild(divAppointment);
    });
  }

  editAppointment(updatedAppointment) {
    this.appointments = this.appointments.map(
      appointment => appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    );

    this.showAppointment();
  }

  deleteAppointment(id) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);

    this.showAppointment();
  }
}
