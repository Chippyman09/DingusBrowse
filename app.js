'use strict';

const form = document.querySelector('#address-form');
const field = document.querySelector('#address');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let value = field.value.trim();
  if (!value) {
    field.focus();
    return;
  }

  if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)) {
    value = `https://${value}`;
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    field.setCustomValidity('Enter a valid website address, such as example.com.');
    field.reportValidity();
    return;
  }

  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) {
    field.setCustomValidity('Only HTTP and HTTPS website addresses are supported.');
    field.reportValidity();
    return;
  }

  field.setCustomValidity('');
  window.open(url.href, '_blank', 'noopener,noreferrer');
});

field.addEventListener('input', () => field.setCustomValidity(''));
