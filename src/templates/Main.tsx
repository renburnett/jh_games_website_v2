import Image from 'next/image';
import NewsletterForm from './components/NewsletterForm';
import { AppConfig } from '@/utils/AppConfig';
import mainLogo from '@/images/logo_main_white.png';
import Head from 'next/head';

type IMainProps = any;

const Main = (props: IMainProps) => {
  return (
    <>
      <Head>
        <title>James Hutt Games</title>
      </Head>
      <div className="grid h-screen place-items-center bg-gray-800 text-white">
        <main className="content py-5 text-xl">
          <Image className="w-56 mb-4 mx-auto" src={mainLogo} alt="James Hutt Games" />
          <h1 style={{display: 'none'}}>James Hutt Games</h1>
          <p className="font-raleway text-center text-sm md:text-base w-90 mx-auto mb-12">
            Here is new soil for tabletop roleplaying games. <br/>
            You'll never have played anything like what will grow: <br/>
            Mechanically unique games, rich in novelty and depth. <br/>
            Join up. It won’t be the same without you.
          </p>
          <NewsletterForm/>
        </main>
      </div>
      <footer className="border-t border-gray-300 py-5 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}
      </footer>
    </>
  );
}

export default Main ;
