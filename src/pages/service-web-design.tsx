import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function ServiceWebDesign() {
  return (
    <>
      <Head>
        <title>Web Design Services | PixelPulse Digital Agency</title>
        <meta name="description" content="Discover PixelPulse's modern web design services. We build responsive, user-focused websites that elevate your brand and drive results. Get a free consultation today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              'serviceType': 'Web Design',
              'provider': {
                '@type': 'Organization',
                'name': 'PixelPulse Digital Agency',
                'url': 'https://yourdomain.com',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://yourdomain.com/favicon.ico'
                },
                'contactPoint': {
                  '@type': 'ContactPoint',
                  'telephone': '+1-234-567-890',
                  'contactType': 'customer service',
                  'email': 'hello@pixelpulse.com',
                  'areaServed': 'US',
                  'availableLanguage': ['English']
                },
                'address': {
                  '@type': 'PostalAddress',
                  'streetAddress': '123 Creative Ave, Suite 100',
                  'addressLocality': 'New York',
                  'addressRegion': 'NY',
                  'postalCode': '10001',
                  'addressCountry': 'US'
                }
              },
              'areaServed': 'US',
              'description': "Discover PixelPulse's modern web design services. We build responsive, user-focused websites that elevate your brand and drive results. Get a free consultation today!",
              'url': 'https://yourdomain.com/service-web-design',
              'offers': {
                '@type': 'Offer',
                'availability': 'https://schema.org/InStock',
                'price': 'Contact for quote',
                'priceCurrency': 'USD'
              }
            })
          }}
        />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', color: '#171717' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 4vw 1.5rem 4vw', fontWeight: 600, fontSize: '1.1rem' }}>
          <div className={styles.logo}>PixelPulse</div>
          <nav className={styles.nav} style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        {/* Service Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 className={styles.headline}>Web Design Services</h1>
          <p className={styles.subheadline} style={{ maxWidth: 700 }}>
            Transform your online presence with a website that is beautiful, fast, and built to convert. Our web design team crafts custom solutions tailored to your brand and business goals.
          </p>
          <div style={{ maxWidth: 800, margin: '2.5rem auto', textAlign: 'left', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>What You Get</h2>
            <ul style={{ fontSize: '1.08rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 600, paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Custom Design:</strong> Unique layouts that reflect your brand identity.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Mobile Responsive:</strong> Seamless experience on all devices.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>SEO Optimized:</strong> Built with best practices for search visibility.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Fast & Secure:</strong> Optimized for speed and protected with the latest security standards.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Easy to Manage:</strong> User-friendly content management for easy updates.</li>
            </ul>
          </div>
          <a href="#contact" className={styles.ctaButton} style={{ marginTop: '2rem' }}>Request a Free Consultation</a>
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