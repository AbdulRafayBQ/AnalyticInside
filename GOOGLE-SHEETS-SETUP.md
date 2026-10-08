# Website form delivery setup

All website enquiry forms use the Google Apps Script in `google-apps-script/Code.gs`. Once configured, each submission is added to the `Leads` tab and an email notification is sent to `abdulrafay364p@gmail.com`.

## One-time Google setup

1. Create or open the Google Sheet where you want to keep enquiries.
2. In that sheet, choose **Extensions → Apps Script**. Replace the editor contents with `google-apps-script/Code.gs` and save.
3. Select `setupLeadSheet` in the function list and click **Run**. Approve the Google Sheets and email permissions. This creates the `Leads` tab and saves the spreadsheet link for the script.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to your account and **Who has access** to **Anyone**, then deploy and approve the email permission when prompted. If a web app is already deployed, choose **Deploy → Manage deployments → Edit → New version → Deploy** after every Apps Script code change; editing the script alone does not update the live `/exec` deployment.
5. Copy the deployed web app URL ending in `/exec`.
6. Open `js/lead-forms.js` and replace the empty string in `window.ANALYTIC_FORMS_ENDPOINT = window.ANALYTIC_FORMS_ENDPOINT || '';` with that URL. Publish the website changes.
7. Submit one test from the contact page and one from a service page. Confirm both the new `Leads` row and the email. If the Apps Script is changed later, create a new deployment version and update the endpoint if Google gives you a new URL.

The notification is sent by the Google account that owns the Apps Script deployment. Each notification includes a direct link to the exact spreadsheet tab and row where that enquiry was saved. If the Sheet looks empty, click that link first: the deployment may be writing into a different spreadsheet than the one currently open. If the link opens the wrong spreadsheet, open the intended Sheet, choose **Extensions → Apps Script**, run `setupLeadSheet` there, then deploy a new web app version. Keep the Sheet private; the site visitor only posts form details to the web app and does not get access to the spreadsheet.
