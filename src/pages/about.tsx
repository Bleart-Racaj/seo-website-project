import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | PixelPulse Digital Agency</title>
        <meta name="description" content="Learn about PixelPulse Digital Agency's mission to empower brands through creative web design, branding, and digital marketing solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.agencyPage}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>PixelPulse</div>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* About Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 className={styles.headline}>Our Mission</h1>
          <p className={styles.subheadline} style={{ maxWidth: 700 }}>
            At <strong>PixelPulse</strong>, our mission is to empower brands to thrive in the digital world. We believe in the power of creativity, technology, and strategy to transform businesses and connect them with their audiences in meaningful ways.<br /><br />
            We are passionate about crafting beautiful, user-focused websites, building memorable brands, and delivering marketing solutions that drive real results. Our team is dedicated to innovation, collaboration, and excellence in everything we do.
          </p>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} PixelPulse Digital Agency. All rights reserved.</div>
          <div className={styles.footerNav}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </>
  );
} 