import Head from "next/head";
import Link from "next/link";

export default function ServiceBranding() {
  return (
    <>
      <Head>
        <title>Branding Services | PixelPulse Digital Agency</title>
        <meta name="description" content="Elevate your business with PixelPulse's expert branding services. We create memorable visual identities that set you apart. Get a free brand consultation!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Branding Services | PixelPulse Digital Agency" />
        <meta property="og:description" content="Elevate your business with PixelPulse's expert branding services. We create memorable visual identities that set you apart. Get a free brand consultation!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/service-2" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              'serviceType': 'Branding',
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
              'description': "Elevate your business with PixelPulse's expert branding services. We create memorable visual identities that set you apart. Get a free brand consultation!",
              'url': 'https://yourdomain.com/service-2',
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
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', color: '#171717' }}>PixelPulse</div>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        {/* Service Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.2rem', color: '#171717' }}>Branding Services</h1>
          <p style={{ maxWidth: 700, fontSize: '1.1rem', color: '#555', marginBottom: '2.2rem' }}>
            Your brand is more than a logo—it's the story you tell and the impression you leave. Our branding experts help you define, design, and deliver a brand identity that resonates and endures.
          </p>
          <div style={{ maxWidth: 800, margin: '2.5rem auto', textAlign: 'left', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'center' }}>What Our Branding Service Includes</h2>
            <ul style={{ fontSize: '1.08rem', lineHeight: 1.7, margin: '0 auto', maxWidth: 600, paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Brand Strategy:</strong> We help you define your mission, vision, and values.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Logo & Visual Identity:</strong> Custom logo, color palette, and typography for a cohesive look.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Brand Guidelines:</strong> Comprehensive documentation for consistent brand use.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Messaging:</strong> Taglines, voice, and messaging that connect with your audience.</li>
              <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5em' }}>✅ <strong>Collateral Design:</strong> Business cards, social media, and more to support your brand.</li>
            </ul>
          </div>
          <a href="/contact" style={{ width: 'fit-content', margin: '2rem auto 0', background: '#171717', color: '#fff', border: 'none', borderRadius: 32, padding: '0.9rem 2.2rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, color 0.2s' }}>
            Request a Free Brand Consultation
          </a>
        </main>

        {/* Footer */}
        <footer style={{ marginTop: 'auto', padding: '2rem 4vw 1.5rem 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '1rem', color: '#888', gap: '0.7rem' }}>
          <div>© {new Date().getFullYear()} PixelPulse Digital Agency. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.3rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </>
  );
} 