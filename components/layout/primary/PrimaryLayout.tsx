import Head from "next/head";
import { ReactNode } from "react";

import styles from "./PrimaryLayout.module.scss";

export interface IPrimaryLayout {
  children?: ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Primary Layout</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PrimaryLayout;
