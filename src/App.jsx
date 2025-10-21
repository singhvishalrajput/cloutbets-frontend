import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import HowItWorks from './components/home/HowItWorks';
import Features from './components/home/Features';
import CTA from './components/home/CTA';
import Footer from './components/layout/Footer';
import CreatePoolModal from './components/PoolCreation/CreatePoolModal';
import AuthModal from './components/Auth/AuthModal';
import Profile from './components/user/Profile'; // Import Profile component
import useAuthStore from './store/authStore';
import useThemeStore from './store/useThemeStore';
import ExplorePools from './components/PoolCreation/ExplorePools';

const HomePage = ({ onScroll, onCreatePool }) => (
  <>
    <Hero onScroll={onScroll} onCreatePool={onCreatePool} />
    <HowItWorks />
    <Features />
    <CTA />
  </>
);

// Wrapper component to handle navigation
const AppContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, login } = useAuthStore();
  const navigate = useNavigate();
  const { initTheme } = useThemeStore();
  
  const handleCreatePool = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate('/create-pool');
  };

  // Handle OAuth callback from X (Twitter)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      async function exchangeCodeForUser(code) {
        const code_verifier = localStorage.getItem("code_verifier");

        if (!code_verifier) {
          alert("Missing code_verifier. Please try logging in again.");
          return;
        }

        try {
          const response = await fetch("https://xcallback-backend.onrender.com/exchange", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, code_verifier }),
            credentials: "include",
          });

          const data = await response.json();

          if (response.ok) {
            console.log("✅ Login successful:", data);
            
            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            
            // Update auth store
            login(data.user);
            
            // Remove ?code= from URL
            window.history.replaceState({}, document.title, "/");
            
            // Navigate to profile or home
            navigate('/profile');
          } else {
            console.error("❌ Login failed:", data.error);
            alert("Login failed: " + data.error);
          }
        } catch (err) {
          console.error("❌ Exchange error:", err);
          alert("An error occurred during login. Please try again.");
        }
      }
      
      exchangeCodeForUser(code);
    }
  }, [login, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    initTheme();
  }, [initTheme]);
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Navbar 
        isScrolled={isScrolled} 
        onCreatePool={handleCreatePool}
      />

      <main>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onScroll={setIsScrolled} onCreatePool={handleCreatePool} />} 
          />
          <Route 
            path="/create-pool" 
            element={
              isAuthenticated ? (
                <CreatePoolModal />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Add Profile route for OAuth callback */}
          <Route 
            path="/profile" 
            element={<Profile />} 
          />
          <Route 
          path="/explore-pools" 
          element={<ExplorePools />} 
          />
        </Routes>
        
      </main>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      )}
      
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}