import Head from "next/head";

export default function Service1() {
  return (
    <>
      <Head>
        <title>Service 1 | PixelPulse Digital Agency</title>
        <meta name="description" content="Learn more about Service 1 offered by PixelPulse Digital Agency." />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', color: '#171717' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 4vw 1.5rem 4vw', fontWeight: 600, fontSize: '1.1rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px', color: '#171717' }}>PixelPulse</div>
        </header>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2vw', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.2rem', color: '#171717' }}>Service 1</h1>
        </main>
      </div>
    </>
  );
} 