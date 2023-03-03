// pages/api/spreadsheet.js
import Main from '../templates/Main';
import { GetServerSideProps } from 'next';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../../.james-h-creds.json'); // the file saved above

type IndexProps = {
  sheetTitle: string;
  rowCount: number;
};

export default function Index(props: IndexProps) {
  return (
    <Main props={props}/>
  );
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  console.log('get serverside props fired')
  const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';

  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(creds);

  // await doc.loadInfo(); // loads document properties and worksheets
  // console.log(doc.title);
  // // await doc.updateProperties({ title: 'renamed doc' });

  // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // console.log("WOOO HOO!!", sheet.title);
  // console.log("WOOO HOO!!", sheet.rowCount);

  // const data = {
  //   sheetTitle: sheet.title,
  //   rowCount: sheet.rowCount,
  // };

  return {
    props: {doc},
  };
}