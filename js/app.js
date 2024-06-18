//* Selectors
const petInput = document.querySelector('#paciente');
const ownerInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const dateInput = document.querySelector('#fecha');
const symptomsInput = document.querySelector('#symptoms');

const form = document.querySelector('#formulario-cita');
const container = document.querySelector('#citas');

//* Appointment Object
const appointmentObj = {
  paciente: '',
  propietario: '',
  email: '',
  fecha: '',
  symptoms: ''
};

//* Event listeners
petInput.addEventListener('change', inputValues);
ownerInput.addEventListener('change', inputValues);
emailInput.addEventListener('change', inputValues);
dateInput.addEventListener('change', inputValues);
symptomsInput.addEventListener('change', inputValues);

form.addEventListener('submit', submitValues);

//* Classes
class Notification {
  constructor({message, type}) {
    this.message = message;
    this.type = type;

    this.showNotification();
  }

  showNotification() {
    const ALERT_DURATION = 3000;
    const notification = document.createElement('DIV');

    notification.textContent = this.message;
    notification.classList.add(
      'text-center', 'w-full', 'p-3', 'text-white',
      'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm'
    );

    // Remove previous notification
    const previousNotification = document.querySelector('.alert');
    previousNotification?.remove();

    // Add class depending on type
    this.type === 'error' ? notification.classList.add('bg-red-500') : notification.classList.add('bg-green-500');

    form.parentElement.insertBefore(notification, form);

    setTimeout(() => {
      notification.remove();
    }, ALERT_DURATION);
  }
}

class AppointmentAdmin {
  constructor() {
    this.appointments = [];
  }

  addAppointment(appointment) {
    this.appointments = [ ...this.appointments, appointment ];
    this.showAppointment();
  }

  showAppointment() {
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

      const editBtn = document.createElement('button');
      editBtn.classList.add(
        'bg-indigo-600', 'hover:bg-indigo-700', ...BUTTON_CLASSES
      );

      editBtn.innerHTML = `
      Editar
      <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
      </svg>`;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add(
        'bg-red-600', 'hover:bg-red-700', ...BUTTON_CLASSES
      );

      deleteBtn.innerHTML = `
      Eliminar
      <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`;

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
}

//* Instances
const appointmentAdmin = new AppointmentAdmin();

//* Functions
function inputValues(e) {
  appointmentObj[ e.target.name ] = e.target.value;
}

function submitValues(e) {
  e.preventDefault();

  // Validate form data
  if (Object.values(appointmentObj).some(valor => valor.trim() === '')) {
    new Notification({
      message: 'Todos los campos son obligatorios',
      type: 'error'
    });

    return;
  }

  appointmentAdmin.addAppointment({...appointmentObj});
  form.reset();
  resetAppointmentObj();
  new Notification({
    message: 'Cita agregada con éxito',
    type: 'success'
  });
}

function resetAppointmentObj() {
  // Clear form inputs
  Object.assign(appointmentObj, {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    symptoms: ''
  });
}
