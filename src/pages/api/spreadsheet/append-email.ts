import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../../../.james-h-creds.json');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';

  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });

  const sheet = doc.sheetsByIndex[0];
  console.log("WOOO HOO!!", sheet.title);

  const { email } = req.query;

  await sheet.addRow([ email ], { insert: false, raw: true });

  return res.status(200).json({ email });
}