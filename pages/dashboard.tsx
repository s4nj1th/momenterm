import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import StockList from "../components/StockList";

export default function Dashboard() {
  return (
    <div className="p-6">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <h1 className="text-3xl font-bold pb-6">Stocks</h1>
        {/* Top Stocks */}
        <StockList />
      </SignedIn>
    </div>
  );
}
