import Head from "next/head";
import Link from "next/link";

export default function ServicesOverview() {
  return (
    <>
      <Head>
        <title>Our Services | PixelPulse Digital Agency</title>
        <meta name="description" content="Explore all digital agency services offered by PixelPulse, including web design, branding, marketing, and more." />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', color: '#171717' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 4vw 1.5rem 4vw', fontWeight: 600, fontSize: '1.1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', color: '#171717' }}>PixelPulse</div>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.2rem', color: '#171717' }}>Our Services</h1>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
            <li><Link href="/services/service1">Service 1</Link></li>
            <li><Link href="/services/service2">Service 2</Link></li>
            <li><Link href="/services/service3">Service 3</Link></li>
            <li><Link href="/services/service4">Service 4</Link></li>
          </ul>
        </main>
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