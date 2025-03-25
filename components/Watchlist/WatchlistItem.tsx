interface Stock {
    symbol: string;
    name: string;
    price: number;
  }
  
  export default function WatchlistItem({ stock }: { stock: Stock }) {
    return (
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">
          {stock.name} ({stock.symbol})
        </h2>
        <p className="text-gray-500">Current Price: ₹{stock.price}</p>
      </div>
    );
  }
  