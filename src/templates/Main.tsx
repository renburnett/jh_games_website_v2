import { serverPath } from '../config';
import Image from 'next/image';
import { AppConfig } from '@/utils/AppConfig';
import mainLogo from '@/images/logo_main_white.png';

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
          {/* TODO: crop all logos */}
          <Image className="w-56 mb-4 mx-auto" src={mainLogo} alt="Logo" />
          <p className="text-center text-sm md:text-base w-90 mx-auto mb-12">
            Here is new soil for tabletop roleplaying games. <br/>
            You'll never have played anything like what will grow: <br/>
            Mechanically unique games, rich in novelty and depth. <br/>
            Join up. It won’t be the same without you.
          </p>
          <form
            id="newsletter-signup"
            className="bg-gray-700 px-4 py-6 rounded shadow mx-auto w-90"
            onSubmit={(event) => handleFormSubmit(event)}
          >
            {/* <p className="mb-4">Newsletter Signup</p> */}
            <input className="bg-gray-600 w-full mb-4 p-2 text-white rounded" type="email" placeholder="Email" />
            <input className="bg-green-400 hover:bg-green-500 text-gray-800 px-4 py-2 rounded cursor-pointer" type="submit" value="Sign Up" />
          </form>
        </main>
      </div>
      <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}
      </footer>
    </>
  );
}

export default Main ;
