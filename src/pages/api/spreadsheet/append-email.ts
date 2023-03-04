import { NextApiRequest, NextApiResponse } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../../../.james-h-creds.json');

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  console.log('get append email address fired')
  const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';

  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  // await doc.updateProperties({ title: 'renamed doc' });

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log("WOOO HOO!!", sheet.title);
  console.log("WOOO HOO!!", sheet.rowCount);

  const data = {
    sheetTitle: sheet.title,
    rowCount: sheet.rowCount,
  };

  const { email } = req.query;



  return res.status(200).json({ email });
}