// import Link from 'next/link';
import { useEffect } from 'react';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = any;

const Main = (props: IMainProps) => {

  useEffect(() => {
    console.log('lodaded!', props.doc);

    const ting = async () => {
      await props.doc.loadInfo(); // loads document properties and worksheets
      console.log(props.doc.title);
      // await props.doc.updateProperties({ title: 'renamed doc' });

      const sheet = props.doc.sheetsByIndex[0]; // or use props.doc.sheetsById[id] or props.doc.sheetsByTitle[title]
      console.log("WOOO HOO!!", sheet.title);
      console.log("WOOO HOO!!", sheet.rowCount);

      const data = {
        sheetTitle: sheet.title,
        rowCount: sheet.rowCount,
      };
      console.log('got data', data)
    }

    ting();
  }, []);

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
          {JSON.stringify(props)}
          <form className="border-solid border-2 border-indigo-600 p-4" id="newsletter-signup">
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
