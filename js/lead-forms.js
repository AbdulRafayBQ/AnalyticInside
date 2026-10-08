(function () {
  'use strict';

  window.ANALYTIC_FORMS_ENDPOINT = window.ANALYTIC_FORMS_ENDPOINT || 'https://script.google.com/macros/s/AKfycbynpgTjUumr8mThRpOkochGAO6t34YWz1TGuIqTs5x1-hm9H9zLfhMu_S8HYGvkH-wM/exec';
  const endpoint = window.ANALYTIC_FORMS_ENDPOINT;
  let requestCounter = 0;

  function submit(payload) {
    if (!endpoint || endpoint.indexOf('https://script.google.com/macros/s/') !== 0) {
      return Promise.reject(new Error('Form delivery is not configured. Please email abdulrafay364p@gmail.com directly.'));
    }

    const requestId = `${Date.now()}-${++requestCounter}`;
    const frameName = `analytic-lead-${requestId}`;

    const frame = document.createElement('iframe');
    frame.name = frameName;
    frame.title = 'Form submission';
    frame.hidden = true;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = endpoint;
    form.target = frameName;
    form.hidden = true;

    [
      ['payload', JSON.stringify(payload)],
      ['requestId', requestId]
    ].forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    return new Promise((resolve, reject) => {
      let timeout;

      const cleanup = () => {
        window.removeEventListener('message', onMessage);
        window.clearTimeout(timeout);
        form.remove();
        frame.remove();
      };

      const onMessage = event => {
        if (
          event.source !== frame.contentWindow ||
          !event.data ||
          event.data.type !== 'analytic-lead-result' ||
          event.data.requestId !== requestId
        ) {
          return;
        }

        cleanup();

        if (event.data.success) {
          resolve();
        } else {
          reject(
            new Error(
              event.data.message ||
              'The form could not be delivered. Please try again.'
            )
          );
        }
      };

      window.addEventListener('message', onMessage);

      timeout = window.setTimeout(() => {
        cleanup();
        reject(
          new Error(
            'The form service did not respond. Please try again or email abdulrafay364p@gmail.com.'
          )
        );
      }, 45000);

      document.body.append(frame, form);
      form.submit();
    });
  }

  function resetForm(container) {
    if (!container) return;

    if (typeof container.reset === 'function') {
      container.reset();
    } else {
      container.querySelectorAll('input, select, textarea').forEach(control => {
        if (control.type === 'checkbox' || control.type === 'radio') {
          control.checked = control.defaultChecked;
        } else if (control.tagName === 'SELECT') {
          Array.from(control.options).forEach(option => { option.selected = option.defaultSelected; });
        } else {
          control.value = control.defaultValue;
        }
      });
    }

    container.querySelectorAll('.fd-stack-panel, .stf-stack-panel').forEach(panel => panel.classList.remove('open'));
    container.querySelectorAll('.fd-stack-item, .stf-stack-item').forEach(item => item.classList.remove('is-active'));
    container.querySelectorAll('.fd-stack-opt, .stf-stack-opt').forEach(option => {
      option.classList.toggle('is-on', option.dataset.mode === 'auto');
    });
    container.querySelectorAll('.ep-chip').forEach(chip => {
      chip.classList.toggle('is-on', Boolean(chip.querySelector('input')?.checked));
    });
  }

  window.ANALYTIC_LEADS = { submit, reset: resetForm };
})();
