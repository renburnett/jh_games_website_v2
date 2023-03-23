import Image from 'next/image';
import NewsletterForm from './components/NewsletterForm';
import { AppConfig } from '@/utils/AppConfig';
import mainLogo from '@/images/construction.png';

type IMainProps = any;

const Main = (props: IMainProps) => {
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
