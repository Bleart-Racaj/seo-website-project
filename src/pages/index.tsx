import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>PixelPulse Digital Agency | Creative Web & Marketing Solutions</title>
        <meta name="description" content="PixelPulse is a modern digital agency specializing in web design, branding, and digital marketing. Elevate your business with our creative solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.agencyPage}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>PixelPulse</div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.headline}>Ignite Your Brand's Digital Presence</h1>
          <p className={styles.subheadline}>
            We craft stunning websites and impactful marketing strategies to help your business thrive online.
          </p>
          <a href="#contact" className={styles.ctaButton}>Get Started</a>
        </section>

        {/* Services Overview */}
        <section className={styles.services} id="services">
          <h2>Our Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Web Design</h3>
              <p>Modern, responsive websites tailored to your brand and goals.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Branding</h3>
              <p>Distinctive visual identities that make your business stand out.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Digital Marketing</h3>
              <p>SEO, social media, and campaigns that drive real results.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Content Creation</h3>
              <p>Engaging copy, graphics, and media to tell your story.</p>
            </div>
          </div>
        </section>

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
