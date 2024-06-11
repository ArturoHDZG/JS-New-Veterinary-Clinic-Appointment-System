//* Selectors
const petInput = document.querySelector('#paciente');
const ownerInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const dateInput = document.querySelector('#fecha');
const symptomsInput = document.querySelector('#symptoms');

const form = document.querySelector('#formulario-cita');

//* Appointment Object
const appointment = {
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

//* Functions
function inputValues(e) {
  appointment[ e.target.name ] = e.target.value;
}

function submitValues(e) {
  e.preventDefault();

  // Validate form data
  if (Object.values(appointment).some(valor => valor.trim() === '')) {
    // TODO
    return;
  }

  // Get form data
  appointment.paciente = petInput.value;
  appointment.propietario = ownerInput.value;
  appointment.email = emailInput.value;
  appointment.fecha = dateInput.value;
  appointment.symptoms = symptomsInput.value;

  // Clear form inputs
  petInput.value = '';
  ownerInput.value = '';
  emailInput.value = '';
  dateInput.value = '';
  symptomsInput.value = '';
}
