import { useState, useEffect } from 'react';
import { User, Mail, Calendar, MapPin, Link as LinkIcon, Twitter } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if we have OAuth callback data
    const hasCallbackData = urlParams.toString().length > 0;
    
    if (hasCallbackData) {
      // Convert URL parameters to object
      const data = {};
      for (const [key, value] of urlParams.entries()) {
        try {
          // Try to parse JSON values
          data[key] = JSON.parse(value);
        } catch {
          // If not JSON, keep as string
          data[key] = value;
        }
      }
      
      setUserData(data);
      setLoading(false);
    } else {
      setError('No user data found. Please sign in with X.');
      setLoading(false);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600 shadow-lg">
                {userData?.name?.charAt(0)?.toUpperCase() || userData?.username?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData?.name || userData?.username || 'User'}
                </h1>
                {userData?.username && (
                  <p className="text-gray-600 font-medium">@{userData.username}</p>
                )}
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Edit Profile
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
                  <LinkIcon className="h-4 w-4" />
                  <a href={userData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {userData.url}
                  </a>
                </div>
              )}
              {userData?.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userData.created_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Raw Data Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-6 w-6" />
            OAuth Response Data
          </h2>
          <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        </div>

        {/* User Stats (if available) */}
        {(userData?.followers_count !== undefined || userData?.following_count !== undefined || userData?.tweet_count !== undefined) && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              {userData?.followers_count !== undefined && (
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{userData.followers_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
              )}
              {userData?.following_count !== undefined && (
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">{userData.following_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              )}
              {userData?.tweet_count !== undefined && (
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <p className="text-2xl font-bold text-pink-600">{userData.tweet_count.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;