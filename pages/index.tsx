import Head from "next/head";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import AuthenticatedContent from "../components/AuthenticatedContent";
import UnauthenticatedContent from "../components/UnauthenticatedContent";

export default function Home() {
  return (
    <>
      <Head>
        <title>MomenTerm</title>
      </Head>

      <SignedIn>
        <AuthenticatedContent />
      </SignedIn>

      <SignedOut>
        <UnauthenticatedContent />
      </SignedOut>
    </>
  );
}
