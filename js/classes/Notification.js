//* Imports
import { form } from './../selectors.js';

//* Class
export default class Notification {
  constructor({message, type}) {
    this.message = message;
    this.type = type;

    this.showNotification();
  }

  showNotification() {
    const ALERT_DURATION = 5000;
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
