import { Rubik } from "@next/font/google";
import "../styles/globals.css";

const rubik = Rubik({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
