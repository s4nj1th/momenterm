export default function FeaturesAd() {
    const features = [
      "Real-time investment tracking with up-to-the-second updates",
      "Advice from the best AI models trained on millions of market data points",
      "Smart insights to help you choose investments wisely and maximize profits",
      "News and updates needed to know the happenings",
      "Updates and alerts for your favourite stocks",
    ];
  
    return (
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-screen-lg mx-auto py-12 px-6">
        {/* Left Section - Title & Description */}
        <div className="md:w-1/2 text-center md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smarter Investing Starts Here
          </h2>
          <p className="text-lg opacity-80">
            Stay ahead of the market with AI-driven insights, real-time tracking,
            and the latest financial news.
          </p>
        </div>
  
        {/* Right Section - Feature List */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[var(--secondary-bg)] shadow-lg rounded-lg p-6 w-full text-center"
            >
              <p className="text-lg font-medium opacity-90">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  