import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";
import { motion } from "framer-motion";
import { GameProvider } from "../components/GameContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Rock Spock Saga</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="bg-[url('/bg.png')] bg-cover bg-no-repeat bg-[top] select-none">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default MyApp;
