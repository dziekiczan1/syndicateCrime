import type { AppProps } from "next/app";
import Head from "next/head";

import PrimaryLayout from "../components/layout/primary/PrimaryLayout";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimaryLayout>
      <Head>
        <title>Syndicate Crime</title>
        <meta name="description" content="Syndicate Crime game" />
        <meta name="viewport" content="initial-scale=1.0, width=device=width" />
      </Head>
      <Component {...pageProps} />
    </PrimaryLayout>
  );
}
