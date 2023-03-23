import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const storage = require('node-persist');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';
  const doc = new GoogleSpreadsheet(SHEET_ID);

  const stringCreds = process.env.GOOGLE_CREDS;

  await storage.init();
  const timesSubmitted = await storage.getItem('timesSubmitted');

  if (!timesSubmitted) {
    await storage.setItem('timesSubmitted', 1);
  } else if (timesSubmitted < 4) {
    await storage.setItem('timesSubmitted', timesSubmitted + 1);
  } else {
    return res.status(500).json({ error: 'Too many submissions' });
  }

  if (!stringCreds) {
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

  // const rehydratedCreds = JSON.parse(stringCreds);
  await doc.useServiceAccountAuth(JSON.parse(stringCreds));

  await doc.loadInfo();
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0];
  console.log("sheet title!!", sheet.title);

  const { email } = req.query;

  let writeSuccess = true;
  let error = '';

  sheet.setHeaderRow(['email addresses']).then(() => {
    sheet.addRow([ email ], { insert: false, raw: true }).catch((err: any) => {
      error = err;
      writeSuccess = false;
    })
  });

  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to append email', details: error });
  } else {
    return res.status(200).json({ email });
  }

}