import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Manrope, Newsreader, Poppins } from "next/font/google";
import Head from "next/head";

import CookiesConsent from "@/components/layout/cookies/CookiesConsent";
import UserContextProvider from "@/components/providers/UserProvider";
import PrimaryLayout from "../components/layout/primary/PrimaryLayout";
import "../styles/globals.scss";

const manrope = Manrope({ weight: ["400", "700"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
const newsreader = Newsreader({ weight: ["500", "600"], subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --manrope-font: ${manrope.style.fontFamily};
          --poppins-font: ${poppins.style.fontFamily};
          --newsreader-font: ${newsreader.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <UserContextProvider {...pageProps}>
          <PrimaryLayout>
            <Head>
              <title>Syndicate Crime</title>
              <meta name="description" content="Syndicate Crime game" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
            <CookiesConsent />
          </PrimaryLayout>
        </UserContextProvider>
      </SessionProvider>
    </>
  );
}
