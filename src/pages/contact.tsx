import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the form data to an API endpoint
  };

  return (
    <>
      <Head>
        <title>Contact Us | PixelPulse Digital Agency</title>
        <meta name="description" content="Contact PixelPulse Digital Agency for web design, branding, and digital marketing services. Get in touch for a free consultation or more information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact Us | PixelPulse Digital Agency" />
        <meta property="og:description" content="Contact PixelPulse Digital Agency for web design, branding, and digital marketing services. Get in touch for a free consultation or more information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['WebPage', 'ContactPage'],
              'name': 'Contact Us | PixelPulse Digital Agency',
              'description': 'Contact PixelPulse Digital Agency for web design, branding, and digital marketing services. Get in touch for a free consultation or more information.',
              'url': 'https://yourdomain.com/contact',
              'publisher': {
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

        {/* Contact Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.2rem', color: '#171717' }}>Contact Us</h1>
          <p style={{ maxWidth: 700, fontSize: '1.1rem', color: '#555', marginBottom: '2.2rem' }}>
            Have a project in mind or want to learn more about our services? Fill out the form below or reach out directly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', width: '100%', maxWidth: 900, margin: '2.5rem auto' }}>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '2rem', minWidth: 300, maxWidth: 400, flex: 1 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem', textAlign: 'left' }}>Send a Message</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{ padding: '0.8rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ padding: '0.8rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{ padding: '0.8rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical' }}
                />
                <button type="submit" style={{ width: '100%', marginTop: '0.5rem', background: '#171717', color: '#fff', border: 'none', borderRadius: 32, padding: '0.9rem 2.2rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}>
                  {submitted ? "Message Sent!" : "Send Message"}
                </button>
                {submitted && (
                  <span style={{ color: '#2ecc40', fontWeight: 500, marginTop: 8 }}>Thank you for reaching out! We'll get back to you soon.</span>
                )}
              </div>
            </form>
            {/* Company Contact Info */}
            <div style={{ flex: 1, minWidth: 250, maxWidth: 350, textAlign: 'left', alignSelf: 'flex-start', background: 'rgba(0,0,0,0.05)', borderRadius: 16, padding: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>Contact Information</h2>
              <div style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                <div><strong>Email:</strong> <a href="mailto:hello@pixelpulse.com">hello@pixelpulse.com</a></div>
                <div><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></div>
                <div><strong>Address:</strong> 123 Creative Ave, Suite 100, New York, NY 10001</div>
                <div style={{ marginTop: '1.2rem' }}><strong>Business Hours:</strong><br />Mon-Fri: 9am – 6pm</div>
              </div>
            </div>
          </div>
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