import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/HomeModern.module.css";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>PixelPulse Digital Agency | Creative Web & Marketing Solutions</title>
        <meta name="description" content="PixelPulse is a modern digital agency specializing in web design, branding, and digital marketing. Elevate your business with our creative solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>PixelPulse</div>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/services" className={styles.navLink}>Services</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className={styles.headline}>Ignite Your Brand's Digital Presence</h1>
            <p className={styles.subheadline}>We craft stunning websites and impactful marketing strategies to help your business thrive online.</p>
            <Link href="/contact" className={styles.ctaButton}>Get Started</Link>
          </div>
        </section>

        {/* Services Overview */}
        <section className={styles.servicesSection}>
          <div className={styles.servicesContainer}>
            <h2 className={styles.servicesTitle}>Our Services</h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard + ' ' + styles.serviceCardHighlight}>
                <div className={styles.cardBadge}>Popular</div>
                <h3 className={styles.serviceTitle}>Web Design</h3>
                <p className={styles.serviceDesc}>Modern, responsive websites tailored to your brand and goals.</p>
                <Link href="/services/service1" className={styles.cardLink}>Learn more →</Link>
              </div>
              <div className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>Branding</h3>
                <p className={styles.serviceDesc}>Distinctive visual identities that make your business stand out.</p>
                <Link href="/services/service2" className={styles.cardLink}>Learn more →</Link>
              </div>
              <div className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>Digital Marketing</h3>
                <p className={styles.serviceDesc}>SEO, social media, and campaigns that drive real results.</p>
                <Link href="/services/service3" className={styles.cardLink}>Learn more →</Link>
              </div>
              <div className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>Content Creation</h3>
                <p className={styles.serviceDesc}>Engaging copy, graphics, and media to tell your story.</p>
                <Link href="/services/service4" className={styles.cardLink}>Learn more →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} PixelPulse Digital Agency. All rights reserved.</div>
          <div className={styles.footerNav}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
