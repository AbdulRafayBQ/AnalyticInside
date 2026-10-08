const NOTIFICATION_EMAIL = 'abdulrafay364p@gmail.com';
const SHEET_NAME = 'Leads';
const HEADERS = [
  'Submitted At', 'Name', 'Email', 'Phone', 'Company', 'Service',
  'Timeline', 'Product URL', 'Tech Stack', 'Services Needed', 'Message', 'Source'
];

function setupLeadSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Open this script from the Google Sheet, then run setupLeadSheet again.');
  }
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  getLeadSheet_();
  MailApp.getRemainingDailyQuota();
}

function doPost(event) {
  const requestId = String(event && event.parameter && event.parameter.requestId || '');
  try {
    const rawPayload = String(event && event.parameter && event.parameter.payload || '');
    if (!rawPayload || rawPayload.length > 50000) {
      throw new Error('The form data is missing or too large.');
    }
    const lead = JSON.parse(rawPayload);
    lead.name = clean_(lead.name, 160);
    lead.email = clean_(lead.email, 254);
    if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      throw new Error('Please provide a valid name and email address.');
    }

    const sheet = getLeadSheet_();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        lead.name,
        lead.email,
        clean_(lead.phone, 100),
        clean_(lead.company, 200),
        clean_(lead.service, 200),
        clean_(lead.timeline, 100),
        clean_(lead.productUrl, 1000),
        clean_(lead.techStack, 1000),
        clean_(lead.services, 2000),
        clean_(lead.message, 12000),
        clean_(lead.source, 500)
      ]);
    } finally {
      lock.releaseLock();
    }

    const subject = ('New website enquiry: ' + (lead.service || 'Project request'))
      .replace(/[\r\n]+/g, ' ').slice(0, 180);
    const body = [
      'A new enquiry was submitted on the Analytic Insider website.',
      '',
      'Name: ' + lead.name,
      'Email: ' + lead.email,
      'Phone: ' + clean_(lead.phone, 100),
      'Company: ' + clean_(lead.company, 200),
      'Service: ' + clean_(lead.service, 200),
      'Timeline: ' + clean_(lead.timeline, 100),
      'Product URL: ' + clean_(lead.productUrl, 1000),
      'Tech stack: ' + clean_(lead.techStack, 1000),
      'Services needed: ' + clean_(lead.services, 2000),
      '',
      'Message:',
      clean_(lead.message, 12000),
      '',
      'Source: ' + clean_(lead.source, 500)
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: lead.email,
      subject: subject,
      body: body,
      name: 'Analytic Insider Website'
    });
    return resultPage_(requestId, true, '');
  } catch (error) {
    console.error('Lead submission failed: ' + error.message);
    return resultPage_(requestId, false, 'We could not process your request. Please try again or email abdulrafay364p@gmail.com.');
  }
}

function getLeadSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    throw new Error('Run setupLeadSheet from the linked spreadsheet before deploying this form.');
  }
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean_(value, limit) {
  if (Array.isArray(value)) value = value.join(', ');
  if (value === null || value === undefined) return '';
  return String(value).replace(/\u0000/g, '').trim().slice(0, limit);
}

function resultPage_(requestId, success, message) {
  const data = JSON.stringify({
    type: 'analytic-lead-result',
    requestId: requestId,
    success: success,
    message: message
  }).replace(/</g, '\\u003c');
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><body><script>window.parent.postMessage(' + data + ', "*");</script></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
