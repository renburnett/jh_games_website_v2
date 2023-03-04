import { serverPath } from '../config';
import { useEffect } from 'react';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = any;

const Main = (props: IMainProps) => {

  const handleFormSubmit = async (event: any) => {

    event.preventDefault();

    const emailAddress = 'xon@xingle.com';
    const res = await fetch(`${serverPath}/api/spreadsheet/append-email?email=${emailAddress}`, {method: 'GET'});
    let savedEmail = null;

    try {
      const { email } = await res.json();
      savedEmail = email;
    } catch (error) {
      console.log('Error: ', error);
      //TODO: toss up some alert thing
    }

  }

  // const readStream = async (response: any) => {
  //   const stream = response.body;

  //   const reader = stream.getReader();
  //   const chunks = [];

  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) {
  //       break;
  //     }
  //     chunks.push(value);
  //   }

  //   const data = chunks.join('');
  //   return data;
  // }

  return (
    <>
      <div className="grid h-screen place-items-center">
        <main className="content py-5 text-xl">
          {/* TODO: crop all logos */}
          <img src="/images/logo_main_white.png" alt="Logo" />
          <p className="pithy-text">
            Here is new soil for tabletop roleplaying games. <br/>
            You'll never have played anything like what will grow: <br/>
            Mechanically unique games, rich in novelty and depth. <br/>
            Join up. It won’t be the same without you.
          </p>
          <form
            id="newsletter-signup"
            className="border-solid border-2 border-indigo-600 p-4"
            onSubmit={(event) => handleFormSubmit(event)}
          >
            <p className="form-title">Newsletter Signup</p>
            <input className="border-solid border-2 border-indigo-600" type="email" placeholder="Email" />
            <input className='border-solid border-2 border-indigo-600 mx-4' type="submit" value="Sign Up" />
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
