import Head from "next/head";

import UiKit from "@/components/layout/uikit/Uikit";

export default function Uikit() {
  return (
    <>
      <Head>
        <title>Syndicate Crime Uikit</title>
      </Head>
      <div className="h-screen no-scrollbar overflow-y-scroll">
        <UiKit />
      </div>
    </>
  );
}
