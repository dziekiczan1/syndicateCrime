import type { AppProps } from "next/app";
import { Manrope, Poppins } from "next/font/google";
import Head from "next/head";

import PrimaryLayout from "../components/layout/primary/PrimaryLayout";
import "../styles/globals.scss";

const manrope = Manrope({ weight: ["400", "700"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --manrope-font: ${manrope.style.fontFamily};
          --poppins-font: ${poppins.style.fontFamily};
        }
      `}</style>
      <PrimaryLayout>
        <Head>
          <title>Syndicate Crime</title>
          <meta name="description" content="Syndicate Crime game" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device=width"
          />
        </Head>
        <Component {...pageProps} />
      </PrimaryLayout>
    </>
  );
}
