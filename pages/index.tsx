import Head from "next/head";

export default function Home() {
  return (
    <div className="p-6">
      <Head>
        <title>MomenTerm</title>
      </Head>
      <h1 className="text-3xl font-bold">Welcome to the MomenTerm!</h1>
      <p className="mt-2">Manage your finances effortlessly.</p>
      <button className="button mt-4">Get Started</button>
    </div>
  );
}
