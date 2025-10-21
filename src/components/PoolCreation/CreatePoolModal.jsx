import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, ExternalLink, Loader } from 'lucide-react';
import Container from '../common/Container';
import TweetEmbed from '../common/TweetEmbed';

const CreatePoolModal = () => {
  const [step, setStep] = useState(1);
  const [contentPreview, setContentPreview] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [formData, setFormData] = useState({
    platform: 'twitter',
    contentUrl: '',
    poolTitle: '',
    description: '',
    metric: 'likes',
    targetValue: '',
    duration: '5m',
    initialBetCurrency: 'SOL',
    initialBetAmount: ''
  });
  const [errors, setErrors] = useState({});

  const metrics = ['Likes', 'Retweets', 'Replies', 'Views', 'Followers'];
  const durations = ['5m', '10m', '15m', '30m', '1h', '24h'];
  const currencies = ['SOL', 'USDC', 'ETH', 'USDT'];

  // Simulate fetching preview data when URL changes
  useEffect(() => {
    if (formData.contentUrl.trim()) {
      setIsLoadingPreview(true);
      const timer = setTimeout(() => {
        const isTwitterUrl = formData.contentUrl.includes('twitter.com') || formData.contentUrl.includes('x.com');
        if (formData.platform === 'twitter' && isTwitterUrl) {
          setContentPreview({
            type: 'twitter',
            url: formData.contentUrl,
            platform: formData.platform
          });
        } else {
          const mockPreview = {
            type: 'mock',
            title: 'Sample Content Title',
            description: 'This is a preview of the content from the URL. In production, this would fetch real data from the platform.',
            author: '@username',
            thumbnail: null,
            platform: formData.platform
          };
          setContentPreview(mockPreview);
        }
        setIsLoadingPreview(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setContentPreview(null);
    }
  }, [formData.contentUrl, formData.platform]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.contentUrl.trim()) {
      newErrors.contentUrl = 'Content URL is required';
    }
    if (!formData.poolTitle.trim()) {
      newErrors.poolTitle = 'Pool title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.targetValue.trim()) {
      newErrors.targetValue = 'Target value is required';
    } else if (Number(formData.targetValue) <= 0) {
      newErrors.targetValue = 'Target value must be greater than 0';
    }
    if (!formData.initialBetAmount.trim()) {
      newErrors.initialBetAmount = 'Bet amount is required';
    } else if (Number(formData.initialBetAmount) <= 0) {
      newErrors.initialBetAmount = 'Bet amount must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleCreatePool = () => {
    console.log('Pool created:', formData);
    // Handle pool creation logic here
    alert('Pool created successfully!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>


      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-2 mt-16">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Create New Pool</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Set up your prediction pool in 3 easy steps</p>
        </div>

        {/* Progress Stepper */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Content & Details' },
              { num: 2, label: 'Metrics & Betting' },
              { num: 3, label: 'Review & Confirm' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      s.num <= step
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.num < step ? <CheckCircle2 className="h-6 w-6" /> : s.num}
                  </div>
                  <p className={`mt-2 text-sm font-medium ${s.num <= step ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </p>
                </div>
                {idx < 2 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                      s.num < step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div> */}

        {/* Main Content Card */}
        <div className="rounded-2xl shadow-xl p-6 mb-4" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
          {/* Step 1: Content & Pool Setup */}
          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Content Preview */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Content Preview</h3>
                <div className="rounded-xl p-6 min-h-[400px] flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  {isLoadingPreview ? (
                    <div className="text-center">
                      <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-3" />
                      <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Loading preview...</p>
                    </div>
                  ) : contentPreview ? (
                    <div className="w-full">
                      {contentPreview.type === 'twitter' ? (
                        <TweetEmbed tweetUrl={contentPreview.url} />
                      ) : (
                        <div className="rounded-lg p-5 shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {contentPreview.platform[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{contentPreview.author}</p>
                                <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{contentPreview.platform}</p>
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                          </div>
                          <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{contentPreview.title}</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{contentPreview.description}</p>
                          <div className="flex gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span>👍 0 likes</span>
                            <span>💬 0 comments</span>
                            <span>🔄 0 shares</span>
                          </div>
                        </div>
                      )}
                      <p className="text-xs mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>Preview • Actual metrics will be tracked live</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔗</div>
                      <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Paste a content URL</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Support for Twitter, YouTube, Spotify, TikTok and more
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Pool Configuration */}
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Pool Configuration</h3>
                <div className="space-y-5">
                  {/* Platform */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Platform <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={(e) => handleSelectChange('platform', e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    >
                      <option value="twitter">Twitter / X</option>
                      <option value="youtube">YouTube</option>
                      <option value="spotify">Spotify</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>

                  {/* Content URL */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Content URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="contentUrl"
                      value={formData.contentUrl}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/... or https://x.com/..."
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.contentUrl ? 'border-red-500' : ''
                        }`}
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: errors.contentUrl ? undefined : 'var(--border-color)' }}
                    />
                    {errors.contentUrl && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        {errors.contentUrl}
                      </p>
                    )}
                  </div>

                  {/* Pool Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Pool Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="poolTitle"
                      value={formData.poolTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Will this tweet reach 10k likes?"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.poolTitle ? 'border-red-500' : ''
                        }`}
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: errors.poolTitle ? undefined : 'var(--border-color)' }}
                    />
                    {errors.poolTitle && (
                      <p className="text-red-500 text-sm mt-1">{errors.poolTitle}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe what users are betting on and any important details..."
                      rows="2"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-500' : ''
                        }`}
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: errors.description ? undefined : 'var(--border-color)' }}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Metrics & Duration */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Set Metrics & Betting Terms</h3>
              <div className="space-y-6">
                {/* Metric Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Select Metric <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {metrics.map(m => (
                      <button
                        key={m}
                        onClick={() => handleSelectChange('metric', m.toLowerCase())}
                        className={`py-2 px-3 rounded-lg font-semibold transition-all ${formData.metric === m.toLowerCase()
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'hover:bg-gray-200'
                          }`}
                        style={formData.metric === m.toLowerCase() ? undefined : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Value */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Target Value <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="targetValue"
                      value={formData.targetValue}
                      onChange={handleInputChange}
                      placeholder="e.g., 10000"
                      min="1"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.targetValue ? 'border-red-500' : ''
                        }`}
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: errors.targetValue ? undefined : 'var(--border-color)' }}
                    />
                  </div>
                  {errors.targetValue && (
                    <p className="text-red-500 text-sm mt-1">{errors.targetValue}</p>
                  )}
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Users will bet on whether the content reaches {formData.targetValue || '___'} {formData.metric}
                  </p>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Pool Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {durations.map(d => (
                      <button
                        key={d}
                        onClick={() => handleSelectChange('duration', d)}
                        className={`py-2 rounded-lg font-semibold transition-all ${formData.duration === d
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'hover:bg-gray-200'
                          }`}
                        style={formData.duration === d ? undefined : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Initial Bet */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Your Initial Bet <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="initialBetCurrency"
                      value={formData.initialBetCurrency}
                      onChange={(e) => handleSelectChange('initialBetCurrency', e.target.value)}
                      className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    >
                      {currencies.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="initialBetAmount"
                      value={formData.initialBetAmount}
                      onChange={handleInputChange}
                      placeholder="Amount"
                      min="0.01"
                      step="0.01"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.initialBetAmount ? 'border-red-500' : ''
                        }`}
                      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: errors.initialBetAmount ? undefined : 'var(--border-color)' }}
                    />
                  </div>
                  {errors.initialBetAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.initialBetAmount}</p>
                  )}
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    You'll start the pool by betting {formData.initialBetAmount || '___'} {formData.initialBetCurrency}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Review Your Pool</h3>

              <div className="rounded-xl p-3 flex items-start gap-3 mb-3" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Ready to Launch!</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Review your pool details and confirm to go live</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Pool Title */}
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Pool Title</p>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{formData.poolTitle}</p>
                </div>

                {/* Description */}
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Description</p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formData.description}</p>
                </div>

                {/* Two Column Details */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Platform</p>
                    <p className="text-lg font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{formData.platform}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <p className="text-sm font-medium ">Target Metric</p>
                    <p className="text-lg font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
                      {formData.targetValue} {formData.metric}
                    </p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <p className="text-sm font-medium ">Duration</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{formData.duration}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <p className="text-sm font-medium ">Your Initial Bet</p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formData.initialBetAmount} {formData.initialBetCurrency}
                    </p>
                  </div>
                </div>

                {/* Content URL */}
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Content URL</p>
                  <a
                    href={formData.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-all"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {formData.contentUrl}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center gap-4 max-w-3xl mx-auto">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
          )}

          <div className="flex-1" />

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleCreatePool}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Create Pool
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePoolModal;