
const ADMIN_EMAIL_DEFAULT = 'technicalchild1234@gmail.com';
const SPREADSHEET_NAME = 'Elyven Leads';
const MAX_PAYLOAD_LENGTH = 40000;

const LEAD_FORMS = {
  contact_request: {
    title: 'Contact form inquiry',
    sheet: 'Contact Inquiries',
    subject: 'New contact inquiry | Elyven',
    intro: 'A visitor submitted an inquiry through the Contact page.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Service interested in', 'service'],
      ['Project brief', 'message'],
      ['Page', 'source']
    ]
  },

  project_enquiry: {
    title: 'Start a project request',
    sheet: 'Project Enquiries',
    subject: 'New project request | Elyven',
    intro: 'A visitor submitted a new project request.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Company / brand', 'company'],
      ['Service needed', 'service'],
      ['Project brief', 'message'],
      ['Page', 'source']
    ]
  },

  service_consultation: {
    title: 'Service consultation',
    sheet: 'Service Consultations',
    subject: 'New service consultation | Elyven',
    intro: 'A visitor requested a service consultation.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Service page', 'service'],
      ['Preferred tech stack', 'details.preferredTechStack'],
      ['Project brief', 'details.projectBrief'],
      ['Page', 'source']
    ]
  },

  marketing_plan: {
    title: 'Marketing and branding plan',
    sheet: 'Marketing & Branding',
    subject: 'New marketing inquiry | Elyven',
    intro: 'A visitor requested a marketing and branding plan.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['WhatsApp number', 'phone'],
      ['Business type', 'details.businessType'],
      ['Requested areas', 'details.requestedAreas'],
      ['Selected services', 'details.selectedServices'],
      ['Project brief', 'details.projectBrief'],
      ['Page', 'source']
    ]
  },

  existing_product_support: {
    title: 'Existing product support',
    sheet: 'Existing Product Support',
    subject: 'New product support inquiry | Elyven',
    intro: 'A visitor requested assistance with an existing product.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Product URL', 'details.productUrl'],
      ['Current tech stack', 'details.currentTechStack'],
      ['Services needed', 'details.requestedServices'],
      ['Project brief', 'details.projectBrief'],
      ['Page', 'source']
    ]
  },

  vibe_code_request: {
    title: 'Vibe code to production',
    sheet: 'Vibe Code Requests',
    subject: 'New production request | Elyven',
    intro: 'A visitor requested help preparing an existing build for production.',
    fields: [
      ['Name', 'name'],
      ['Email', 'email'],
      ['Service page', 'details.servicePage'],
      ['Built with', 'details.builtWith'],
      ['Project type', 'details.projectType'],
      ['Monthly users / visitors', 'details.monthlyUsers'],
      ['Needs', 'details.needs'],
      ['Link / repository', 'details.productUrl'],
      ['Project brief', 'details.projectBrief'],
      ['Page', 'source']
    ]
  }
};


/**
 * Run this function manually once from the Apps Script editor.
 * Creates the spreadsheet and all six lead sheets.
 */
function setupLeadBackend() {
  const properties = PropertiesService.getScriptProperties();

  let adminEmail = properties.getProperty('ADMIN_EMAIL');

  if (!adminEmail) {
    adminEmail = ADMIN_EMAIL_DEFAULT;
    properties.setProperty('ADMIN_EMAIL', adminEmail);
  }

  if (!isValidEmail_(adminEmail)) {
    throw new Error(
      'Invalid ADMIN_EMAIL configuration. Update the ADMIN_EMAIL script property.'
    );
  }

  let spreadsheetId = properties.getProperty('LEADS_SPREADSHEET_ID');
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    spreadsheetId = spreadsheet.getId();

    properties.setProperty(
      'LEADS_SPREADSHEET_ID',
      spreadsheetId
    );
  }

  Object.keys(LEAD_FORMS).forEach(function (formType) {
    ensureLeadSheet_(spreadsheet, formType);
  });

  console.log('[Elyven Leads] Backend setup completed successfully.');
  console.log('[Elyven Leads] Spreadsheet URL: ' + spreadsheet.getUrl());

  return spreadsheet.getUrl();
}


/**
 * Receives submissions from the website.
 */
function doPost(event) {
  const requestId = cleanRequestId_(
    event && event.parameter && event.parameter.requestId
  );

  try {
    if (!requestId) {
      throw new Error('Invalid request identifier.');
    }

    const rawPayload =
      event && event.parameter && event.parameter.payload;

    if (
      typeof rawPayload !== 'string' ||
      !rawPayload ||
      rawPayload.length > MAX_PAYLOAD_LENGTH
    ) {
      throw new Error('Missing or oversized submission.');
    }

    let payload;

    try {
      payload = JSON.parse(rawPayload);
    } catch (parseError) {
      throw new Error('Invalid submission format.');
    }

    if (
      !payload ||
      typeof payload !== 'object' ||
      Array.isArray(payload)
    ) {
      throw new Error('Invalid form data.');
    }

    const formType = cleanText_(payload.formType, 100);
    const config = LEAD_FORMS[formType];

    if (!config) {
      throw new Error('Unsupported form type.');
    }

    const name = cleanText_(payload.name, 200);
    const email = cleanText_(payload.email, 320);

    if (!name || !isValidEmail_(email)) {
      throw new Error('A valid name and email are required.');
    }

    const properties = PropertiesService.getScriptProperties();
    const adminEmail = properties.getProperty('ADMIN_EMAIL');
    const spreadsheetId =
      properties.getProperty('LEADS_SPREADSHEET_ID');

    if (!adminEmail || !isValidEmail_(adminEmail)) {
      throw new Error('Admin notification configuration is incomplete.');
    }

    if (!spreadsheetId) {
      throw new Error('Lead storage has not been configured.');
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ensureLeadSheet_(spreadsheet, formType);

    const fields = config.fields.map(function (field) {
      return [
        field[0],
        getFieldValue_(payload, field[1])
      ];
    });

    const row = [
      new Date(),
      formType,
      config.title,
      name,
      email
    ];

    fields.slice(2).forEach(function (field) {
      row.push(field[1]);
    });

    // Lead is recorded before attempting email delivery.
    row.push('Pending');

    const lock = LockService.getScriptLock();
    let rowNumber;

    lock.waitLock(10000);

    try {
      sheet.appendRow(
        row.map(function (value) {
          return typeof value === 'string'
            ? safeSheetText_(value)
            : value;
        })
      );

      rowNumber = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    let emailStatus = 'Sent';

    try {
      sendAdminEmail_(adminEmail, config, fields, email);

    } catch (emailError) {
      emailStatus = 'Failed';

      console.error(
        '[Elyven Leads] Admin notification delivery failed.' +
        ' Request ID: ' + requestId +
        ' | Details: ' +
        cleanText_(
          emailError && emailError.message
            ? emailError.message
            : 'Email delivery failed.',
          300
        )
      );
    }

    // Update the notification status without discarding the lead.
    try {
      sheet.getRange(rowNumber, row.length)
        .setValue(emailStatus);

    } catch (statusError) {
      console.error(
        '[Elyven Leads] Notification status update failed.' +
        ' Request ID: ' + requestId
      );
    }

    // A successfully saved lead counts as a successful submission,
    // even if the separate email notification could not be sent.
    return postMessageResponse_({
      success: true,
      requestId: requestId,
      message: 'Your request has been received successfully.',
      notificationStatus: emailStatus === 'Sent'
        ? 'sent'
        : 'pending'
    });

  } catch (error) {
    console.error(
      '[Elyven Leads] Submission processing failed.' +
      ' Request ID: ' + (requestId || 'Unavailable') +
      ' | Details: ' +
      cleanText_(
        error && error.message ? error.message : 'Unknown error.',
        500
      )
    );

    return postMessageResponse_({
      success: false,
      requestId: requestId,
      message:
        'We couldn’t process your request at this time. ' +
        'Please try again shortly, or contact our team if the issue persists.'
    });
  }
}


/**
 * Creates a sheet or verifies its existing headers.
 */
function ensureLeadSheet_(spreadsheet, formType) {
  const config = LEAD_FORMS[formType];

  if (!config) {
    throw new Error('Unknown form configuration.');
  }

  const headers = [
    'Received At',
    'Form Type',
    'Form',
    'Name',
    'Email'
  ].concat(
    config.fields.slice(2).map(function (field) {
      return field[0];
    })
  ).concat(['Admin Email Status']);

  let sheet = spreadsheet.getSheetByName(config.sheet);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(config.sheet);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);

    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold');

  } else {
    const existingHeaders = sheet
      .getRange(1, 1, 1, headers.length)
      .getDisplayValues()[0];

    const matches = headers.every(function (header, index) {
      return existingHeaders[index] === header;
    });

    if (!matches) {
      throw new Error(
        'Sheet header mismatch for "' + config.sheet + '".'
      );
    }
  }

  return sheet;
}


/**
 * Reads nested form fields such as details.projectBrief.
 */
function getFieldValue_(payload, path) {
  const value = path.split('.').reduce(function (current, key) {
    return current && current[key] !== undefined
      ? current[key]
      : '';
  }, payload);

  if (Array.isArray(value)) {
    return value.map(function (item) {
      return cleanText_(item, 500);
    }).join(', ');
  }

  return cleanText_(value, 8000);
}


/**
 * Normalizes text and enforces length limits.
 */
function cleanText_(value, maxLength) {
  if (value === null || value === undefined) {
    return '';
  }

  if (
    typeof value === 'object' &&
    !Array.isArray(value)
  ) {
    return '';
  }

  const text = String(value)
    .replace(/\u0000/g, '')
    .trim();

  if (text.length > maxLength) {
    throw new Error('A field exceeds its allowed length.');
  }

  return text;
}


function cleanRequestId_(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const id = value.trim();

  if (
    !id ||
    id.length > 160 ||
    /[\u0000-\u001F\u007F]/.test(id)
  ) {
    return '';
  }

  return id;
}


/**
 * Protects spreadsheet cells from formula injection.
 */
function safeSheetText_(value) {
  const text = String(value);

  return /^[=+\-@\t\r]/.test(text)
    ? "'" + text
    : text;
}


function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || '')
  );
}


/**
 * Sends a formatted notification to the admin.
 */
function sendAdminEmail_(adminEmail, config, fields, replyTo) {
  const htmlRows = fields.map(function (field) {
    return (
      '<tr>' +
        '<th style="text-align:left;padding:10px;' +
          'border-bottom:1px solid #e8e8e8;' +
          'vertical-align:top;font-weight:600">' +
          escapeHtml_(field[0]) +
        '</th>' +
        '<td style="padding:10px;' +
          'border-bottom:1px solid #e8e8e8;' +
          'vertical-align:top;white-space:pre-wrap;' +
          'overflow-wrap:anywhere">' +
          escapeHtml_(field[1] || 'Not provided') +
        '</td>' +
      '</tr>'
    );
  }).join('');

  const plainText =
    config.intro + '\n\n' +
    fields.map(function (field) {
      return field[0] + ': ' + (field[1] || 'Not provided');
    }).join('\n');

  MailApp.sendEmail({
    to: adminEmail,
    replyTo: isValidEmail_(replyTo) ? replyTo : adminEmail,
    subject: config.subject,
    body: plainText,
    htmlBody:
      '<div style="font-family:Arial,sans-serif;' +
        'color:#17130e;max-width:680px;margin:0 auto">' +
        '<div style="padding:20px 0;border-bottom:2px solid #f97316">' +
          '<div style="font-size:13px;font-weight:700;' +
            'letter-spacing:2px;color:#f97316">ELYVEN</div>' +
          '<h2 style="margin:12px 0 8px;font-size:22px">' +
            escapeHtml_(config.title) +
          '</h2>' +
          '<p style="margin:0;color:#666;line-height:1.6">' +
            escapeHtml_(config.intro) +
          '</p>' +
        '</div>' +
        '<table style="border-collapse:collapse;width:100%;' +
          'font-size:14px;margin-top:16px">' +
          htmlRows +
        '</table>' +
        '<p style="margin-top:24px;color:#777;font-size:12px">' +
          'Automated notification from the Elyven website.' +
        '</p>' +
      '</div>'
  });
}


/**
 * Escapes untrusted content before inserting it into HTML email.
 */
function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, function (character) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character];
  });
}


/**
 * Returns a response compatible with the existing postMessage frontend.
 */
function postMessageResponse_(result) {
  // Match the response type expected by the website frontend.
  const response = Object.assign(
    { type: 'analytic-lead-result' },
    result
  );

  const message = JSON.stringify(response)
    .replace(/</g, '\\u003c');

  const html =
    '<!doctype html>' +
    '<html><head><meta charset="utf-8"></head><body>' +
    '<script>' +
      'window.top.postMessage(' + message + ',"*");' +
    '</script>' +
    '</body></html>';

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );
}
