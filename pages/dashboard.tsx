import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="p-6">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <h1 className="text-3xl font-bold text-[var(--accent-color)]">Your Dashboard</h1>
        <p className="mt-2">This is a protected page.</p>
      </SignedIn>
    </div>
  );
}
