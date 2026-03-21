'use client';

import { useState } from 'react';

interface Token {
  symbol: string;
  name: string;
  totalSupply: number;
  circulatingSupply: number;
  marketCap: number;
  price: number;
  distribution: Array<{ percent: number; category: string; percentOfTotal: number }>;
}

const presets: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    totalSupply: 120000000,
    circulatingSupply: 120000000,
    marketCap: 414000000000,
    price: 3450,
    distribution: [
      { percent: 13, category: 'Team', percentOfTotal: 13 },
      { percent: 20, category: 'Investors', percentOfTotal: 20 },
      { percent: 17, category: 'Ecosystem', percentOfTotal: 17 },
      { percent: 12, category: 'Public Sale', percentOfTotal: 12 },
      { percent: 16, category: 'Staking Rewards', percentOfTotal: 16 },
      { percent: 22, category: 'Treasury', percentOfTotal: 22 },
    ],
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    totalSupply: 1000000000,
    circulatingSupply: 745000000,
    marketCap: 4500000000,
    price: 6.03,
    distribution: [
      { percent: 15, category: 'Team', percentOfTotal: 15 },
      { percent: 12, category: 'Investors', percentOfTotal: 12 },
      { percent: 13, category: 'Ecosystem', percentOfTotal: 13 },
      { percent: 18, category: 'Public Sale', percentOfTotal: 18 },
      { percent: 10, category: 'Airdrop', percentOfTotal: 10 },
      { percent: 32, category: 'Treasury', percentOfTotal: 32 },
    ],
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
    totalSupply: 160000000,
    circulatingSupply: 160000000,
    marketCap: 3300000000,
    price: 20.62,
    distribution: [
      { percent: 6, category: 'Team', percentOfTotal: 6 },
      { percent: 10, category: 'Investors', percentOfTotal: 10 },
      { percent: 5, category: 'Ecosystem', percentOfTotal: 5 },
      { percent: 20, category: 'Public Sale', percentOfTotal: 20 },
      { percent: 14, category: 'Airdrop', percentOfTotal: 14 },
      { percent: 35, category: 'Treasury', percentOfTotal: 35 },
    ],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    totalSupply: 500000000,
    circulatingSupply: 445000000,
    marketCap: 153000000000,
    price: 343,
    distribution: [
      { percent: 35, category: 'Team', percentOfTotal: 35 },
      { percent: 14, category: 'Investors', percentOfTotal: 14 },
      { percent: 30, category: 'Public Sale', percentOfTotal: 30 },
      { percent: 5, category: 'Airdrop', percentOfTotal: 5 },
      { percent: 16, category: 'Treasury', percentOfTotal: 16 },
    ],
  },
];

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(presets[0]);
  const [inflationRate, setInflationRate] = useState<string>('5');
  const [deflationMechanism, setDeflationMechanism] = useState<'burn' | 'buyback' | 'stake' | 'none'>('stake');

  const circulatingPercentage = selectedToken
    ? (selectedToken.circulatingSupply / selectedToken.totalSupply) * 100
    : 100;
  const stakingAPR = selectedToken
    ? ((parseInt(inflationRate) / circulatingPercentage) * 100)
    : 0;
  const marketCap = selectedToken?.marketCap || 0;
  const fullyDilutedValuation = selectedToken
    ? (selectedToken.totalSupply * selectedToken.price)
    : 0;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-pink-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Tokenomics Calculator</h1>
          <p className="text-gray-400 mt-2">Analyze token distribution, supply models, and economic incentives</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-pink-400 p-4 text-center">
            <div className="text-sm text-gray-400">Market Cap</div>
            <div className="text-2xl font-bold text-pink-400">${marketCap.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-sm text-gray-400">Fully Diluted</div>
            <div className="text-2xl font-bold">${fullyDilutedValuation.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-sm text-gray-400">Circulating %</div>
            <div className="text-2xl font-black">{circulatingPercentage.toFixed(1)}%</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-sm text-gray-400">Total Supply</div>
            <div className="text-2xl font-black">{(selectedToken?.totalSupply / 1000000).toFixed(0)}M</div>
          </div>
        </section>

        {/* Token Selector */}
        <section className="bg-gray-900 border-4 border-pink-400 p-6">
          <h2 className="text-xl font-black text-pink-400 mb-4">Select Token</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presets.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token)}
                className={`p-4 border-4 transition-all ${
                  selectedToken?.symbol === token.symbol
                    ? 'bg-pink-900/30 border-pink-400'
                    : 'bg-gray-800 border-gray-600 hover:border-pink-400'
                }`}
              >
                <div className="text-sm text-gray-400">{token.symbol}</div>
                <div className="font-bold text-white">${token.price}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Distribution Chart */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Token Distribution</h2>
          <div className="space-y-4">
            {selectedToken?.distribution.map((dist) => (
              <div key={dist.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{dist.category}</span>
                  <span className="font-bold">{dist.percent}% ({dist.percentOfTotal.toFixed(1)}%)</span>
                </div>
                <div className="h-4 bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${dist.percent}%`, backgroundColor: '#ec4899' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inflation & Staking Calculator */}
        <section className="bg-gray-900 border-4 border-purple-400 p-6">
          <h2 className="text-xl font-black text-purple-400 mb-4">Inflation Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Annual Inflation Rate (%)</label>
              <input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full p-3 bg-gray-800 border-2 border-gray-600 text-white font-bold text-xl"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Deflation Mechanism</label>
              <select
                value={deflationMechanism}
                onChange={(e) => setDeflationMechanism(e.target.value as any)}
                className="w-full p-3 bg-gray-800 border-2 border-gray-600 text-white font-bold text-xl"
              >
                <option value="stake">Staking Rewards</option>
                <option value="burn">Token Burn</option>
                <option value="buyback">Buyback & Burn</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-sm text-gray-400">New Tokens/Year</div>
              <div className="text-2xl font-bold text-pink-400">
                {((selectedToken?.totalSupply || 0) * (parseInt(inflationRate) / 100) / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-sm text-gray-400">Staking APR</div>
              <div className="text-2xl font-black text-purple-400">
                {stakingAPR.toFixed(2)}%
              </div>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-sm text-gray-400">Emission Schedule</div>
              <div className="text-2xl font-bold text-gray-400">
                {deflationMechanism === 'burn' ? 'Decoupling' : 'Linear'}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Tokenomics Concepts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600">
              <h3 className="font-bold text-pink-400 mb-2">✓ Supply Constraints</h3>
              <p className="text-xs text-gray-400">Total supply limits affect scarcity and long-term value</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600">
              <h3 className="font-bold text-purple-400 mb-2">✓ Distribution Fairness</h3>
              <p className="text-xs text-gray-400">Team/investor allocation signals project confidence</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-2">✓ Inflation vs Deflation</h3>
              <p className="text-xs text-gray-400">Annual emission vs burn mechanisms balance incentives</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-pink-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
