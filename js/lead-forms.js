(function () {
  'use strict';

  window.ANALYTIC_FORMS_ENDPOINT = window.ANALYTIC_FORMS_ENDPOINT || 'https://script.google.com/macros/s/AKfycbwYmtx5qynHaIN_F2OrvLeWkCl6wdLM8Y9MD9YsF1SIB5__mcfV2LPhadnnexvez76X/exec';
  const endpoint = window.ANALYTIC_FORMS_ENDPOINT;
  let requestCounter = 0;

  function submit(payload) {
    if (!endpoint || endpoint.indexOf('https://script.google.com/macros/s/') !== 0) {
      return Promise.reject(new Error('Form delivery is not configured. Please email abdulrafay364p@gmail.com directly.'));
    }

    const randomId = window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    const requestId = `${Date.now()}-${++requestCounter}-${randomId}`;
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
      let responseTimeout;
      let submitted = false;
      let settled = false;

      const cleanup = () => {
        window.removeEventListener('message', onMessage);
        frame.removeEventListener('load', onFrameLoad);
        window.clearTimeout(timeout);
        window.clearTimeout(responseTimeout);
        form.remove();
        frame.remove();
      };

      const fail = message => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error(message));
      };

      const onFrameLoad = () => {
        if (!submitted) {
          submitted = true;
          form.submit();
          return;
        }

        window.clearTimeout(responseTimeout);
        responseTimeout = window.setTimeout(() => {
          fail('Google could not confirm this submission. Please try again or email abdulrafay364p@gmail.com. If this continues, the Google Apps Script web app must be deployed with access set to Anyone.');
        }, 1500);
      };

      const onMessage = event => {
        const trustedOrigin = event.origin === 'https://script.google.com' ||
          event.origin === 'https://script.googleusercontent.com' ||
          event.origin.endsWith('.googleusercontent.com');
        if (
          !trustedOrigin ||
          !event.data ||
          event.data.type !== 'analytic-lead-result' ||
          event.data.requestId !== requestId
        ) {
          return;
        }

        if (settled) return;
        settled = true;
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
      frame.addEventListener('load', onFrameLoad);

      timeout = window.setTimeout(() => {
        fail('Google did not respond to this submission. Please try again or email abdulrafay364p@gmail.com. If this continues, the Google Apps Script web app must be deployed with access set to Anyone.');
      }, 15000);

      frame.src = 'about:blank';
      document.body.append(frame, form);
    });
  }


  /* ---------- inline field errors (shown right under the empty / wrong field) ---------- */
  function errHost(el) {
    return el.closest('.ep-field, .form-field') || el.parentElement;
  }

  function clearError(el) {
    if (!el) return;
    el.classList.remove('ep-err');
    el.removeAttribute('aria-invalid');
    const host = errHost(el);
    if (!host) return;
    host.querySelectorAll(':scope > .ep-err-msg').forEach(node => node.remove());
    host.classList.remove('has-err', 'ep-shake');
  }

  function setError(el, message) {
    if (!el) return;
    const host = errHost(el);
    let msg = host.querySelector(':scope > .ep-err-msg');
    if (!msg) {
      msg = document.createElement('small');
      msg.className = 'ep-err-msg';
      msg.setAttribute('role', 'alert');
      host.appendChild(msg);
    }
    msg.textContent = message;
    el.classList.add('ep-err');
    el.setAttribute('aria-invalid', 'true');
    host.classList.add('has-err');
    host.classList.remove('ep-shake');
    void host.offsetWidth;
    host.classList.add('ep-shake');
  }

  function clearAllErrors(container) {
    if (!container) return;
    container.querySelectorAll('.ep-err-msg').forEach(node => node.remove());
    container.querySelectorAll('.ep-err').forEach(node => {
      node.classList.remove('ep-err');
      node.removeAttribute('aria-invalid');
    });
    container.querySelectorAll('.has-err, .ep-shake').forEach(node => node.classList.remove('has-err', 'ep-shake'));
  }

  /* list: [{ el, msg, kind: 'empty' | 'invalid', focus?: element to focus (null = do not focus) }]
     Shows every error at once, scrolls to the first one and tells Ely about it. */
  function showErrors(list) {
    list = (list || []).filter(Boolean);
    if (!list.length) return false;
    list.forEach(item => setError(item.el, item.msg));
    const first = list[0];
    const focusTarget = 'focus' in first ? first.focus : first.el;
    if (focusTarget && typeof focusTarget.focus === 'function') {
      try { focusTarget.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
    }
    try { first.el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (err) { /* ignore */ }
    try {
      document.dispatchEvent(new CustomEvent('ely:field-problem', {
        detail: { el: first.el, msg: first.msg, kind: first.kind || 'empty' }
      }));
    } catch (err) { /* ignore */ }
    return true;
  }

  /* the error disappears the moment the person starts fixing that field */
  document.addEventListener('input', event => {
    const t = event.target;
    if (t && t.classList && t.classList.contains('ep-err')) clearError(t);
  }, true);
  document.addEventListener('change', event => {
    const t = event.target;
    if (!t || !t.closest) return;
    const group = t.closest('.ep-groups');
    if (group && group.classList.contains('ep-err')) clearError(group);
    if (t.classList && t.classList.contains('ep-err')) clearError(t);
  }, true);

  function resetForm(container) {
    if (!container) return;
    clearAllErrors(container);

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

  window.ANALYTIC_LEADS = { submit, reset: resetForm, showErrors, clearError, clearAllErrors };
})();
