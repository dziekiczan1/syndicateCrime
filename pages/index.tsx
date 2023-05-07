import Head from "next/head";
import Image from "next/image";

import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/layout/logo/Logo";
import { images } from "@/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>Syndicate Crime</title>
        <meta name="description" content="Syndicate Crime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="absolute -z-10 h-screen w-screen">
          <Image
            src={images.loginBackground}
            alt="Login Background"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="no-scrollbar relative flex flex-col items-center h-screen gap-8 z-1 overflow-y-scroll py-8">
          <div className="w-1/2">
            <Logo width={674} height={301} alt="Syndicate Crime" />
          </div>
          <div className="w-1/2">
            <AuthForm />
          </div>
        </div>
      </main>
    </>
  );
}
