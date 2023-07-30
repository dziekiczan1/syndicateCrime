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
      <div>
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
        <div className="no-scrollbar relative flex flex-col items-center h-screen gap-16 lg:gap-32 z-1 overflow-y-scroll overflow-x-hidden px-4 py-8 lg:px-0">
          <div className="w-full lg:w-1/2 lg:flex lg:justify-center">
            <Logo width={674} height={301} />
          </div>
          <div className="w-full lg:w-1/2">
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
