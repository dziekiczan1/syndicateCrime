import Head from "next/head";

import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/layout/logo/Logo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Syndicate Crime</title>
        <meta name="description" content="Syndicate Crime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Syndicate Crime</h1>
        <Logo width={674} height={297} alt="Syndicate Crime" />
        <AuthForm />
      </main>
    </>
  );
}
