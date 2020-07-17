import Link from 'next/link';
import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <Link href="/"><a>Back to home</a></Link>
      about
    </div>
  );
}