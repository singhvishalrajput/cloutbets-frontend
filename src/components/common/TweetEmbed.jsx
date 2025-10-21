import React, { useState, useEffect } from 'react';

const TweetEmbed = ({ tweetUrl }) => {
    const [embedHtml, setEmbedHtml] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmbed = async () => {
            try {
                setLoading(true);
                setError(null);

                const IFRAMELY_API_KEY = import.meta.env.VITE_IFRAMELY_API_KEY;

                if (!IFRAMELY_API_KEY) {
                    const urlParts = tweetUrl.split('/');
                    const username = urlParts[3];
                    const tweetId = urlParts[5];

                    if (username && tweetId) {
                        setEmbedHtml(`
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-left: 4px solid #1DA1F2; border-radius: 8px; padding: 16px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <svg style="width: 20px; height: 20px; fill: #1DA1F2; margin-right: 8px;" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span style="color: white; font-weight: 600;">@${username}</span>
                </div>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 12px; line-height: 1.5;">
                  Twitter post from @${username}
                </p>
                <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" 
                   style="color: #1DA1F2; text-decoration: none; font-size: 14px;">
                  View full post on Twitter →
                </a>
              </div>
            `);
                    } else {
                        setError('Invalid Twitter URL format');
                    }
                    setLoading(false);
                    return;
                }

                const iframelyUrl = `https://iframe.ly/api/oembed?url=${encodeURIComponent(tweetUrl)}&api_key=${IFRAMELY_API_KEY}&theme=dark&omit_script=1`;
                const response = await fetch(iframelyUrl);

                if (!response.ok) {
                    throw new Error(`Iframely API error: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.html) {
                    let processedHtml = data.html;

                    processedHtml = processedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

                    if (processedHtml.includes('twitter-tweet') || processedHtml.includes('twitter.com')) {
                        if (processedHtml.includes('<iframe')) {
                            processedHtml = processedHtml.replace(
                                /<iframe([^>]*)>/g,
                                '<iframe$1 style="width: 100%; border: none; border-radius: 8px; background: transparent;" frameborder="0">'
                            );
                        } else if (processedHtml.includes('blockquote')) {
                            processedHtml = `
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-left: 4px solid #1DA1F2; border-radius: 8px; padding: 16px;">
                  ${processedHtml}
                  <div style="margin-top: 12px;">
                    <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" 
                       style="color: #1DA1F2; text-decoration: none; font-size: 14px;">
                      View on Twitter →
                    </a>
                  </div>
                </div>
              `;
                        }
                    }

                    setEmbedHtml(processedHtml);
                } else if (data.url && data.title) {
                    const urlParts = tweetUrl.split('/');
                    const username = urlParts[3];
                    setEmbedHtml(`
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-left: 4px solid #1DA1F2; border-radius: 8px; padding: 16px;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <svg style="width: 20px; height: 20px; fill: #1DA1F2; margin-right: 8px;" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span style="color: white; font-weight: 600;">@${username}</span>
              </div>
              <h3 style="color: rgba(255,255,255,0.9); margin-bottom: 8px; font-size: 16px; line-height: 1.4;">
                ${data.title}
              </h3>
              ${data.description ? `<p style="color: rgba(255,255,255,0.7); margin-bottom: 12px; font-size: 14px; line-height: 1.5;">${data.description}</p>` : ''}
              <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" 
                 style="color: #1DA1F2; text-decoration: none; font-size: 14px;">
                View on Twitter →
              </a>
            </div>
          `);
                } else {
                    setError('Could not embed tweet - please check the URL');
                }
            } catch (err) {
                setError('Error loading tweet embed');
                console.error('Error fetching tweet embed:', err);
            } finally {
                setLoading(false);
            }
        };

        if (tweetUrl) {
            fetchEmbed();
        }
    }, [tweetUrl]);

    useEffect(() => {
        if (embedHtml && embedHtml.includes('twitter-tweet') && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [embedHtml]);

    if (loading) {
        return (
            <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-white/10 rounded w-2/3"></div>
                </div>
                <p className="text-white/60 mt-4">Loading tweet...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-medium">Twitter Post</h3>
                        <p className="text-white/60 text-sm mt-1">{error}</p>
                        <a
                            href={tweetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm underline"
                        >
                            View on Twitter
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tweet-embed-container w-full" key={tweetUrl}>
            <div
                className="tweet-embed"
                dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
        </div>
    );
};

export default TweetEmbed;
