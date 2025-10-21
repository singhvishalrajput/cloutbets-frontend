import React, { useState } from 'react';
import { Shield, Menu, X, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import AuthModal from '../Auth/AuthModal';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/useThemeStore';

const Navbar = ({ isScrolled, onCreatePool }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'FAQ', href: '#faq' }
  ];
  
  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-xl border-b shadow-sm' 
            : ''
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--nav-scrolled-bg)' : 'var(--nav-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cloutbets</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium transition-colors hover:text-blue-600"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 0.8)'
                }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              
              {isAuthenticated ? (
                <>
                  <Button variant="secondary" size="sm" onClick={onCreatePool}>Create Pool</Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" size="sm" onClick={() => handleAuthClick('login')}>Sign In</Button>
                  <Button size="sm" onClick={() => handleAuthClick('signup')}>Get Started</Button>
                </>
              )}
            </div>
            
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 0.8)'
                }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
                )}
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'rgba(128, 128, 128, 0.1)'
                }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isOpen && (
            <div 
              className="lg:hidden pb-4 space-y-3 border-t"
              style={{ borderColor: 'var(--border-color)' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block font-medium transition-colors py-2 hover:text-blue-600"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="secondary"
                      onClick={onCreatePool}
                      className="w-full"
                    >
                      Create Pool
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="secondary" 
                      onClick={() => handleAuthClick('login')}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => handleAuthClick('signup')}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;