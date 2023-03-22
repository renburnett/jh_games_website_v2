import { serverPath } from '../config';
import Image from 'next/image';
import { AppConfig } from '@/utils/AppConfig';
import mainLogo from '@/images/construction.png';

type IMainProps = any;

const Main = (props: IMainProps) => {

  const handleFormSubmit = async (event: any) => {

    //TODO: check for email validity and DONT allow empty submissions

    event.preventDefault();
    const emailAddress = event.target[0].value;

    const res = await fetch(`${serverPath}/api/spreadsheet/append-email?email=${emailAddress}`, {method: 'GET'});
    let savedEmail = null;

    try {
      const { email } = await res.json();
      savedEmail = email;
      console.log('saved email:', email);
    } catch (error) {
      console.log('Error: ', error);
      //TODO: toss up some alert thing
    }
  }

  return (
    <>
      <div className="grid h-screen place-items-center bg-gray-800 text-white">
        <main className="content py-5 text-xl">
        <Image className="w-90 mb-4 mx-auto" src={mainLogo} alt="Logo" />
        </main>
      </div>
      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}
      </footer>
    </>
  );
}

export default Main ;
