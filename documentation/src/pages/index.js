// import React from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <h1 className="hero__title">{siteConfig.title}</h1>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }

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
          style={{ width: "250px", height: "200px" }}
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
