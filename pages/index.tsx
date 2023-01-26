import Head from "next/head";
import { Inter } from "@next/font/google";

import styles from "../styles/Main.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>collectivecreationgames</title>
        <meta name="description" content="Collective Creation Games site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${inter.className} ${styles.main}`} />
    </>
  );
}
