//* Imports
import { inputValues, submitValues } from './functions.js';
import {
  petInput, ownerInput, emailInput,
  dateInput, symptomsInput, form
} from './selectors.js';

//* Event listeners
petInput.addEventListener('change', inputValues);
ownerInput.addEventListener('change', inputValues);
emailInput.addEventListener('change', inputValues);
dateInput.addEventListener('change', inputValues);
symptomsInput.addEventListener('change', inputValues);

form.addEventListener('submit', submitValues);
