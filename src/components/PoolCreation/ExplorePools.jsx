import React, { useState } from 'react';
import { Twitter, Youtube, Music, Video, TrendingUp, Users, Clock, ArrowRight, ArrowLeft, ExternalLink, Trophy, ArrowUpRight, DollarSign, ChevronLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PLATFORMS = [
  { id: 'all', name: 'All Platforms', icon: TrendingUp },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'spotify', name: 'Spotify', icon: Music },
  { id: 'tiktok', name: 'TikTok', icon: Video }
];

// Mock data for pools with historical chart data
const MOCK_POOLS = [
  {
    id: 1,
    platform: 'twitter',
    title: 'Will this tweet reach 10k likes?',
    description: 'Betting on whether @elonmusk latest tweet about AI will hit 10,000 likes within 24 hours',
    contentUrl: 'https://twitter.com/elonmusk/status/123',
    author: '@elonmusk',
    metric: 'likes',
    currentValue: 7234,
    targetValue: 10000,
    duration: '24h',
    timeLeft: '18h 32m',
    totalPool: 2450,
    currency: 'SOL',
    participants: 42,
    yesPercentage: 68,
    creator: '@betmaster',
    chartData: [
      { time: '0h', value: 1200 },
      { time: '2h', value: 2450 },
      { time: '4h', value: 3800 },
      { time: '6h', value: 5100 },
      { time: '8h', value: 6200 },
      { time: '10h', value: 7234 }
    ]
  },
  {
    id: 2,
    platform: 'twitter',
    title: 'Will this post get 500 retweets?',
    description: 'Predicting if this viral meme will reach 500 retweets before the deadline',
    contentUrl: 'https://twitter.com/user/status/456',
    author: '@viralcontent',
    metric: 'retweets',
    currentValue: 234,
    targetValue: 500,
    duration: '12h',
    timeLeft: '8h 15m',
    totalPool: 890,
    currency: 'USDC',
    participants: 28,
    yesPercentage: 45,
    creator: '@cryptobetter',
    chartData: [
      { time: '0h', value: 50 },
      { time: '1h', value: 89 },
      { time: '2h', value: 142 },
      { time: '3h', value: 198 },
      { time: '4h', value: 234 }
    ]
  },
  {
    id: 3,
    platform: 'twitter',
    title: '1M views on this tweet?',
    description: 'Breaking news tweet - will it reach 1 million views in 6 hours?',
    contentUrl: 'https://twitter.com/news/status/789',
    author: '@breakingnews',
    metric: 'views',
    currentValue: 456789,
    targetValue: 1000000,
    duration: '6h',
    timeLeft: '3h 45m',
    totalPool: 5670,
    currency: 'SOL',
    participants: 89,
    yesPercentage: 72,
    creator: '@newsbet',
    chartData: [
      { time: '0h', value: 125000 },
      { time: '30m', value: 234000 },
      { time: '1h', value: 345000 },
      { time: '1.5h', value: 398000 },
      { time: '2h', value: 424000 },
      { time: '2.5h', value: 456789 }
    ]
  },
  {
    id: 4,
    platform: 'twitter',
    title: 'Tech announcement - 5k likes?',
    description: 'Apple product launch tweet - betting on 5,000 likes milestone',
    contentUrl: 'https://twitter.com/apple/status/321',
    author: '@Apple',
    metric: 'likes',
    currentValue: 3421,
    targetValue: 5000,
    duration: '12h',
    timeLeft: '9h 20m',
    totalPool: 3200,
    currency: 'ETH',
    participants: 56,
    yesPercentage: 81,
    creator: '@techpool',
    chartData: [
      { time: '0h', value: 890 },
      { time: '30m', value: 1450 },
      { time: '1h', value: 2100 },
      { time: '1.5h', value: 2680 },
      { time: '2h', value: 3090 },
      { time: '2.5h', value: 3421 }
    ]
  },
  {
    id: 5,
    platform: 'youtube',
    title: 'New music video - 1M views?',
    description: 'Popular artist drops new MV - will it hit 1M views in 48h?',
    contentUrl: 'https://youtube.com/watch?v=abc123',
    author: 'Music Artist',
    metric: 'views',
    currentValue: 567890,
    targetValue: 1000000,
    duration: '48h',
    timeLeft: '32h 15m',
    totalPool: 6700,
    currency: 'SOL',
    participants: 78,
    yesPercentage: 82,
    creator: '@musicfan',
    chartData: [
      { time: '0h', value: 45000 },
      { time: '4h', value: 125000 },
      { time: '8h', value: 245000 },
      { time: '12h', value: 389000 },
      { time: '16h', value: 567890 }
    ]
  },
  {
    id: 6,
    platform: 'youtube',
    title: 'Gaming stream - 50k concurrent',
    description: 'Major tournament stream - 50k live viewers bet',
    contentUrl: 'https://youtube.com/watch?v=xyz789',
    author: 'Pro Gamer',
    metric: 'live viewers',
    currentValue: 23456,
    targetValue: 50000,
    duration: '6h',
    timeLeft: '4h 20m',
    totalPool: 4560,
    currency: 'ETH',
    participants: 92,
    yesPercentage: 48,
    creator: '@gamerpool',
    chartData: [
      { time: '0h', value: 5000 },
      { time: '30m', value: 12000 },
      { time: '1h', value: 18500 },
      { time: '1.5h', value: 23456 }
    ]
  },
  {
    id: 7,
    platform: 'twitter',
    title: 'Celebrity tweet engagement?',
    description: 'Will this celebrity post get 15k likes in next 3 hours?',
    contentUrl: 'https://twitter.com/celebrity/status/111',
    author: '@celebrity',
    metric: 'likes',
    currentValue: 9870,
    targetValue: 15000,
    duration: '3h',
    timeLeft: '1h 45m',
    totalPool: 1890,
    currency: 'USDC',
    participants: 34,
    yesPercentage: 55,
    creator: '@fanclub',
    chartData: [
      { time: '0h', value: 4500 },
      { time: '30m', value: 6780 },
      { time: '1h', value: 8450 },
      { time: '1.5h', value: 9870 }
    ]
  },
  {
    id: 8,
    platform: 'twitter',
    title: 'Viral thread - 2k retweets?',
    description: 'Trending thread about tech - can it hit 2000 retweets?',
    contentUrl: 'https://twitter.com/techguru/status/222',
    author: '@techguru',
    metric: 'retweets',
    currentValue: 1245,
    targetValue: 2000,
    duration: '8h',
    timeLeft: '5h 30m',
    totalPool: 2100,
    currency: 'SOL',
    participants: 47,
    yesPercentage: 62,
    creator: '@techbets',
    chartData: [
      { time: '0h', value: 340 },
      { time: '1h', value: 670 },
      { time: '2h', value: 980 },
      { time: '2.5h', value: 1245 }
    ]
  },
  {
    id: 9,
    platform: 'youtube',
    title: 'Tutorial video - 100k views?',
    description: 'Popular coding tutorial - will it reach 100k views in 24h?',
    contentUrl: 'https://youtube.com/watch?v=def456',
    author: 'Code Master',
    metric: 'views',
    currentValue: 67890,
    targetValue: 100000,
    duration: '24h',
    timeLeft: '16h 10m',
    totalPool: 3450,
    currency: 'ETH',
    participants: 61,
    yesPercentage: 73,
    creator: '@codepool',
    chartData: [
      { time: '0h', value: 12000 },
      { time: '2h', value: 28000 },
      { time: '4h', value: 45000 },
      { time: '6h', value: 58000 },
      { time: '8h', value: 67890 }
    ]
  },
  {
    id: 10,
    platform: 'twitter',
    title: 'News update - 50k views?',
    description: 'Breaking sports news - predicting 50k views milestone',
    contentUrl: 'https://twitter.com/sportsnews/status/333',
    author: '@sportsnews',
    metric: 'views',
    currentValue: 32100,
    targetValue: 50000,
    duration: '4h',
    timeLeft: '2h 15m',
    totalPool: 1750,
    currency: 'USDC',
    participants: 38,
    yesPercentage: 68,
    creator: '@sportsbet',
    chartData: [
      { time: '0h', value: 8900 },
      { time: '30m', value: 15600 },
      { time: '1h', value: 23400 },
      { time: '1.5h', value: 28700 },
      { time: '2h', value: 32100 }
    ]
  },
  {
    id: 11,
    platform: 'youtube',
    title: 'Product review - 25k likes?',
    description: 'Tech product unboxing - will it get 25k likes in 12h?',
    contentUrl: 'https://youtube.com/watch?v=ghi789',
    author: 'Tech Reviewer',
    metric: 'likes',
    currentValue: 15670,
    targetValue: 25000,
    duration: '12h',
    timeLeft: '7h 40m',
    totalPool: 2980,
    currency: 'SOL',
    participants: 53,
    yesPercentage: 59,
    creator: '@techfans',
    chartData: [
      { time: '0h', value: 3400 },
      { time: '1h', value: 6800 },
      { time: '2h', value: 9900 },
      { time: '3h', value: 12500 },
      { time: '4h', value: 15670 }
    ]
  },
  {
    id: 12,
    platform: 'twitter',
    title: 'Meme post - 1k retweets?',
    description: 'Trending meme - betting on 1000 retweets in next 2 hours',
    contentUrl: 'https://twitter.com/memeking/status/444',
    author: '@memeking',
    metric: 'retweets',
    currentValue: 678,
    targetValue: 1000,
    duration: '2h',
    timeLeft: '1h 05m',
    totalPool: 890,
    currency: 'USDC',
    participants: 29,
    yesPercentage: 64,
    creator: '@memebets',
    chartData: [
      { time: '0m', value: 120 },
      { time: '15m', value: 289 },
      { time: '30m', value: 445 },
      { time: '45m', value: 567 },
      { time: '1h', value: 678 }
    ]
  }
];

const ExplorePools = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPool, setSelectedPool] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const poolsPerPage = 12;

  const filteredPools = selectedPlatform === 'all' 
    ? MOCK_POOLS 
    : MOCK_POOLS.filter(pool => pool.platform === selectedPlatform);

  const indexOfLastPool = currentPage * poolsPerPage;
  const indexOfFirstPool = indexOfLastPool - poolsPerPage;
  const currentPools = filteredPools.slice(indexOfFirstPool, indexOfLastPool);
  const totalPages = Math.ceil(filteredPools.length / poolsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlatformChange = (platformId) => {
    setSelectedPlatform(platformId);
    setCurrentPage(1);
  };

  const handlePoolClick = (pool) => {
    setSelectedPool(pool);
    setBetAmount('');
  };

  const handleBackToGrid = () => {
    setSelectedPool(null);
  };

  const calculatePayout = (amount, percentage) => {
    if (!amount || isNaN(amount)) return '0.00';
    const odds = 100 / percentage;
    return (parseFloat(amount) * odds).toFixed(2);
  };

  const progressPercentage = selectedPool 
    ? Math.min((selectedPool.currentValue / selectedPool.targetValue) * 100, 100)
    : 0;

  // If a pool is selected, show detail view
  if (selectedPool) {
    return (
      <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={handleBackToGrid}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Pools</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-5">
              {/* Pool Header */}
              <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {selectedPool.platform === 'twitter' && <Twitter className="h-5 w-5 text-white" />}
                      {selectedPool.platform === 'youtube' && <Youtube className="h-5 w-5 text-white" />}
                      {selectedPool.platform === 'spotify' && <Music className="h-5 w-5 text-white" />}
                      {selectedPool.platform === 'tiktok' && <Video className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{selectedPool.author}</p>
                      <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{selectedPool.platform}</p>
                    </div>
                  </div>
                  <a 
                    href={selectedPool.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                  >
                    View Content
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {selectedPool.title}
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selectedPool.description}
                </p>
              </div>

              {/* Chart */}
              <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {selectedPool.metric.charAt(0).toUpperCase() + selectedPool.metric.slice(1)} Over Time
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={selectedPool.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2.5}
                      dot={{ fill: '#3b82f6', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Progress Section */}
              <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Current Progress
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {selectedPool.currentValue.toLocaleString()}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Current {selectedPool.metric}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {selectedPool.targetValue.toLocaleString()}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Target</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 transition-all duration-500 flex items-center justify-end pr-1.5"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <span className="text-[10px] font-bold text-white">{progressPercentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl p-4 text-center shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedPool.participants}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Participants</p>
                </div>
                <div className="rounded-xl p-4 text-center shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {selectedPool.totalPool}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedPool.currency}</p>
                </div>
                <div className="rounded-xl p-4 text-center shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <Clock className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedPool.timeLeft}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Time Left</p>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="rounded-xl p-5 shadow-sm sticky top-20" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Place Your Bet</h3>
                
                {/* YES/NO Distribution */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2 font-semibold">
                    <span className="text-green-600">YES {selectedPool.yesPercentage}%</span>
                    <span className="text-red-600">NO {100 - selectedPool.yesPercentage}%</span>
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden mb-3">
                    <div className="bg-green-500" style={{ width: `${selectedPool.yesPercentage}%` }} />
                    <div className="bg-red-500" style={{ width: `${100 - selectedPool.yesPercentage}%` }} />
                  </div>

                  {/* Individual bars */}
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-900 bg-opacity-20 rounded-lg p-2.5 border border-green-100 dark:border-green-800">
                      <p className="text-[10px] font-medium text-green-700 dark:text-green-400 mb-0.5">YES odds</p>
                      <p className="text-base font-bold text-green-600 dark:text-green-400">{(100 / selectedPool.yesPercentage).toFixed(2)}x</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900 bg-opacity-20 rounded-lg p-2.5 border border-red-100 dark:border-red-800">
                      <p className="text-[10px] font-medium text-red-700 dark:text-red-400 mb-0.5">NO odds</p>
                      <p className="text-base font-bold text-red-600 dark:text-red-400">{(100 / (100 - selectedPool.yesPercentage)).toFixed(2)}x</p>
                    </div>
                  </div>
                </div>

                {/* Bet Amount Input */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Bet Amount ({selectedPool.currency})
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2.5 rounded-lg text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)', 
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  />
                </div>

                {/* Potential Payout */}
                {betAmount && parseFloat(betAmount) > 0 && (
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <p className="text-[10px] mb-1" style={{ color: 'var(--text-secondary)' }}>Potential Payout (YES)</p>
                    <p className="text-base font-bold text-green-600 mb-2">
                      {calculatePayout(betAmount, selectedPool.yesPercentage)} {selectedPool.currency}
                    </p>
                    <p className="text-[10px] mb-1" style={{ color: 'var(--text-secondary)' }}>Potential Payout (NO)</p>
                    <p className="text-base font-bold text-red-600">
                      {calculatePayout(betAmount, 100 - selectedPool.yesPercentage)} {selectedPool.currency}
                    </p>
                  </div>
                )}

                {/* Bet Buttons */}
                <div className="space-y-2.5">
                  <button 
                    className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    disabled={!betAmount || parseFloat(betAmount) <= 0}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Bet YES
                  </button>
                  <button 
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    disabled={!betAmount || parseFloat(betAmount) <= 0}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Bet NO
                  </button>
                </div>

                {/* Pool Info */}
                <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <p className="text-[10px] mb-1" style={{ color: 'var(--text-secondary)' }}>Created by</p>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{selectedPool.creator}</p>
                  <p className="text-[10px] mt-2" style={{ color: 'var(--text-secondary)' }}>Duration: {selectedPool.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Explore Betting Pools</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Discover and bet on trending social media content</p>
        </div>

        {/* Platform Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isActive = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-opacity-80'
                }`}
                style={isActive ? undefined : { 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <Icon className="h-4 w-4" />
                {platform.name}
              </button>
            );
          })}
        </div>

        {/* Pools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {currentPools.map((pool) => {
            const progressPercentage = Math.min((pool.currentValue / pool.targetValue) * 100, 100);
            
            return (
              <div
                key={pool.id}
                onClick={() => handlePoolClick(pool)}
                className="rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {pool.platform === 'twitter' && <Twitter className="h-4 w-4 text-white" />}
                      {pool.platform === 'youtube' && <Youtube className="h-4 w-4 text-white" />}
                      {pool.platform === 'spotify' && <Music className="h-4 w-4 text-white" />}
                      {pool.platform === 'tiktok' && <Video className="h-4 w-4 text-white" />}
                    </div>
                    <div>
                      <p className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>{pool.author}</p>
                      <p className="text-[10px] capitalize" style={{ color: 'var(--text-secondary)' }}>{pool.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{pool.totalPool}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{pool.currency}</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {pool.title}
                </h3>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {pool.currentValue.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {pool.targetValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{progressPercentage.toFixed(0)}% of target</p>
                </div>

                {/* YES/NO Indicator */}
                <div className="mb-3">
                  <div className="flex h-2 rounded-full overflow-hidden mb-1.5">
                    <div className="bg-green-500" style={{ width: `${pool.yesPercentage}%` }} />
                    <div className="bg-red-500" style={{ width: `${100 - pool.yesPercentage}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-medium">
                    <span className="text-green-600">YES {pool.yesPercentage}%</span>
                    <span className="text-red-600">NO {100 - pool.yesPercentage}%</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{pool.participants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{pool.timeLeft}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : ''
                }`}
                style={currentPage === index + 1 ? undefined : { 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePools;