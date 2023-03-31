import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

  const googleEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const googleKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!googleEmail || !googleKey) {
    return res.status(500).json({ error: 'Invalid or missing credentials.' });
  }

  // Handle preflight CORS request (OPTIONS method)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const ting = await doc.useServiceAccountAuth({
      client_email: googleEmail,
      private_key: googleKey,
    });

    await doc.loadInfo();
    console.log(doc.title);

    const { email } = req.query;

    const sheet = doc.sheetsByIndex[0];
    await sheet.setHeaderRow(['Email Addresses:']);
    await sheet.addRow([email], { insert: false, raw: true });

    return res.status(200).json({ email });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error: 'Failed to append email', details: error });
  }
}
