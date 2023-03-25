import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';
  const doc = new GoogleSpreadsheet(SHEET_ID);

  const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const googleKey = process.env.GOOGLE_PRIVATE_KEY;

  console.log('googleEmail', googleEmail)
  console.log('googleKey', googleKey)

  if (!googleEmail || !googleKey) {
    return res.status(500).json({ error: 'Invalid or missing credentials Ron' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight CORS request (OPTIONS method)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await doc.useServiceAccountAuth({
      client_email: googleEmail,
      private_key: googleKey,
    });

    await doc.loadInfo();
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log("sheet title!!", sheet.title);

    const { email } = req.query;

    await sheet.setHeaderRow(['email addresses']);
    await sheet.addRow([email], { insert: false, raw: true });

    return res.status(200).json({ email });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error: 'Failed to append email', details: error });
  }
}
