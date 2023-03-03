// // pages/api/spreadsheet.js
// import { GetServerSideProps } from 'next';
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// import creds from '../../../.jh_credentials.json';

// export interface IndexProps {
//   sheet: any;
// }


// export default function Index({ sheet }: IndexProps) {
//   return (
//     <div>
//       <h1>Sheet</h1>
//       <pre>{JSON.stringify(sheet)}</pre>
//     </div>
//   );
// }


// export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
//   /* https://console.developers.google.com/apis/credentials */
//   // const CLIENT_ID = '517958998706-q7obmo3b8can89f72ke29n3sfeljv4nf.apps.googleusercontent.com';
//   // const API_KEY = 'AIzaSyAukzKN9E3dpyfSZfuA2JZ5UkUfJH3VM3s';
//   // const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

//   console.log('get serverside props fired')
//   const SHEET_ID = '1t3x3e7z71e5fquiF9sfKrXqeFwbQpF24Z4HeKWz9GY0';

//   const doc = new GoogleSpreadsheet(SHEET_ID);
//   await doc.useServiceAccountAuth(creds);

//   // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
//   await doc.useServiceAccountAuth({
//     // env var values are copied from service account credentials generated by google
//     // see "Authentication" section in docs for more info
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   });

//   await doc.loadInfo(); // loads document properties and worksheets
//   console.log(doc.title);
//   await doc.updateProperties({ title: 'renamed doc' });

//   const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
//   console.log(sheet.title);
//   console.log(sheet.rowCount);

//   return {props: { sheet }};
// }
