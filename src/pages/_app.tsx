import { AppProvider } from "@/context/ApiContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
}
