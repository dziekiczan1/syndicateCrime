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
        <div className="flex justify-center">
          <Logo width={674} height={301} alt="Syndicate Crime" />
          <AuthForm />
        </div>
      </main>
    </>
  );
}
