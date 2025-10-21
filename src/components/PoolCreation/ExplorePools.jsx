import React, { useState } from 'react';
import { Twitter, Youtube, Music, Video, TrendingUp, Users, Clock, ArrowRight, ArrowLeft, ExternalLink, Trophy, Play } from 'lucide-react';

const PLATFORMS = [
  { id: 'all', name: 'All Platforms', icon: TrendingUp },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'spotify', name: 'Spotify', icon: Music },
  { id: 'tiktok', name: 'TikTok', icon: Video }
];

// Mock data for pools
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
    hasVideo: false,
    thumbnail: null
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
    hasVideo: true,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop'
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
    hasVideo: false,
    thumbnail: null
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
    hasVideo: true,
    thumbnail: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=225&fit=crop'
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
    hasVideo: true,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=225&fit=crop'
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
    hasVideo: true,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop'
  }
];

const ExplorePools = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 9;

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

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Explore Active Pools
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Join live betting pools and predict content performance
          </p>
        </div>

        {/* Platform Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(platform => {
              const Icon = platform.icon;
              const isActive = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformChange(platform.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
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
        </div>

        {/* Stats Bar */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Active Pools</p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {filteredPools.length}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Total Value Locked</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                ${(filteredPools.reduce((acc, pool) => acc + pool.totalPool, 0) / 1000).toFixed(1)}K
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Total Participants</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {filteredPools.reduce((acc, pool) => acc + pool.participants, 0)}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Platform</p>
              <p className="text-xl font-bold capitalize" style={{ color: 'var(--text-primary)' }}>
                {selectedPlatform === 'all' ? 'All' : selectedPlatform}
              </p>
            </div>
          </div>
        </div>

        {/* Pools Grid */}
        {currentPools.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Active Pools</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Be the first to create a pool on this platform!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {currentPools.map(pool => (
                <div 
                  key={pool.id}
                  className="rounded-lg overflow-hidden transition-all hover:shadow-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  {/* Thumbnail/Video Section */}
                  {pool.hasVideo && pool.thumbnail && (
                    <div className="relative aspect-video w-full overflow-hidden group">
                      <img 
                        src={pool.thumbnail} 
                        alt={pool.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <a 
                        href={pool.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 transition-all"
                      >
                        <ExternalLink className="h-3 w-3 text-white" />
                      </a>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          {pool.platform === 'twitter' && <Twitter className="h-4 w-4 text-white" />}
                          {pool.platform === 'youtube' && <Youtube className="h-4 w-4 text-white" />}
                          {pool.platform === 'spotify' && <Music className="h-4 w-4 text-white" />}
                          {pool.platform === 'tiktok' && <Video className="h-4 w-4 text-white" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{pool.author}</p>
                          <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{pool.platform}</p>
                        </div>
                      </div>
                      {!pool.hasVideo && (
                        <a 
                          href={pool.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base mb-2 line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                      {pool.title}
                    </h3>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {pool.currentValue.toLocaleString()}
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {pool.targetValue.toLocaleString()} {pool.metric}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 transition-all duration-500"
                          style={{ width: `${Math.min((pool.currentValue / pool.targetValue) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Betting Distribution */}
                    <div className="mb-3 p-2 rounded-md" style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-semibold text-green-600">YES {pool.yesPercentage}%</span>
                        <span className="font-semibold text-red-600">NO {100 - pool.yesPercentage}%</span>
                      </div>
                      <div className="flex h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500" style={{ width: `${pool.yesPercentage}%` }} />
                        <div className="bg-red-500" style={{ width: `${100 - pool.yesPercentage}%` }} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                      <div>
                        <Users className="h-3 w-3 mx-auto mb-0.5" style={{ color: 'var(--text-secondary)' }} />
                        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{pool.participants}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Players</p>
                      </div>
                      <div>
                        <TrendingUp className="h-3 w-3 mx-auto mb-0.5" style={{ color: 'var(--text-secondary)' }} />
                        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                          {pool.totalPool} {pool.currency}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Pool</p>
                      </div>
                      <div>
                        <Clock className="h-3 w-3 mx-auto mb-0.5" style={{ color: 'var(--text-secondary)' }} />
                        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{pool.timeLeft}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Left</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                      Place Bet
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md transition-all ${
                    currentPage === 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-blue-600 hover:text-white'
                  }`}
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 rounded-md text-sm font-semibold transition-all ${
                        currentPage === index + 1
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'hover:bg-blue-100'
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
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md transition-all ${
                    currentPage === totalPages 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-blue-600 hover:text-white'
                  }`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePools;