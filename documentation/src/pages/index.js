import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import { GettingStartedCards } from "../components/GettingStartedCards";
import SponsorCards from "../components/SponsorCards";
import Background from "@site/static/img/bg.gif";
import HeroLogo from "@site/static/img/dawn.png";

export default function Home() {
  return (
    <Layout>
      <div>
        <img src={Background} style={{ width: "100%", height: "600px" }} />
      </div>
      <div>
        <img
          src={HeroLogo}
          style={{ width: "250px", height: "300px" }}
          className={styles.logoText}
        />
        <h2 className={styles.headerSubtitle}>
          THE ULTIMATE DISCORD BOT FOR ZORA
        </h2>
      </div>
      <main className={styles.layout}>
        <div className={styles.layoutFlexBox}>
          <div className={styles.gettingStartedFlexBox}>
            <p className={styles.gettingStarted}>Getting Started</p>
            <a
              className={styles.viewAllLink}
              href="docs/guides/connect-wallet-react"
            ></a>
          </div>
          <GettingStartedCards />
          <p className={styles.projects}>Special Thanks</p>
          <SponsorCards />
        </div>
      </main>
    </Layout>
  );
}
