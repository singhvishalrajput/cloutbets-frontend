import { useState, useEffect } from 'react';
import { User, Calendar, MapPin, ExternalLink, Twitter, LogOut } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const storedData = localStorage.getItem('user');
      
      if (storedData) {
        const data = JSON.parse(storedData);
        setUserData(data);
        setLoading(false);
      } else {
        setError('No user data found. Please sign in with X.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to load user data. Please try signing in again.');
      setLoading(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Twitter className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const publicMetrics = userData?.public_metrics || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {userData?.name?.charAt(0)?.toUpperCase() || userData?.username?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData?.name || 'User'}
                </h1>
                {userData?.username && (
                  <p className="text-gray-600 font-medium">@{userData.username}</p>
                )}
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {userData?.description && (
              <p className="mt-4 text-gray-700">{userData.description}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              {userData?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData?.url && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <a href={userData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {userData.url}
                  </a>
                </div>
              )}
              {userData?.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Stats */}
        {publicMetrics && Object.keys(publicMetrics).length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Twitter className="h-6 w-6 text-blue-500" />
              X Account Statistics
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {publicMetrics.followers_count !== undefined && (
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{publicMetrics.followers_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
              )}
              {publicMetrics.following_count !== undefined && (
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">{publicMetrics.following_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              )}
              {publicMetrics.tweet_count !== undefined && (
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <p className="text-2xl font-bold text-pink-600">{publicMetrics.tweet_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
              )}
              {publicMetrics.like_count !== undefined && (
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-600">{publicMetrics.like_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
              )}
              {publicMetrics.media_count !== undefined && (
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{publicMetrics.media_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Media</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Account Details */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-6 w-6" />
            Account Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">User ID</span>
              <span className="text-gray-900 font-mono text-sm">{userData?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Username</span>
              <span className="text-gray-900">@{userData?.username || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Display Name</span>
              <span className="text-gray-900">{userData?.name || 'N/A'}</span>
            </div>
            {publicMetrics?.listed_count !== undefined && (
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Listed Count</span>
                <span className="text-gray-900">{publicMetrics.listed_count.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Raw Data (for debugging) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Raw Data (Debug)</h2>
          <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;