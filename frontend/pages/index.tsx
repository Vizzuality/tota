import Head from 'next/head';

const Home: React.FC<void> = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Tota</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Tota</h1>
      </main>

      <footer>
        <a href="https://vizzuality.com" target="_blank" rel="noopener noreferrer">
          Powered by Vizzuality
        </a>
      </footer>
    </div>
  );
};

export default Home;
