import React, { useEffect } from 'react';
import { Shield, Users, TrendingUp, CheckCircle, Menu, X, ArrowRight, BarChart3, Lock, Award, Mail, Twitter, Github, Zap, Eye, Rocket } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

// Animated Background Blobs for Hero
const AnimatedBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
    <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
    <style>{`
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-blob { animation: blob 7s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }
    `}</style>
  </div>
);

const Hero = ({ onScroll, onCreatePool }) => {

    const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      onScroll(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);
  
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-16" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <AnimatedBg />
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto py-20">
          <div className="mb-6 inline-block">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10" style={{ border: '1px solid var(--border-color)' }} className="rounded-full px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>✨ Next-Gen Betting Protocol</p>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Bet Smart. 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Verify Fair.</span>
            <br/>Earn Trust.
          </h1>
          
          <p className="text-lg md:text-xl mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Create and join performance-based pools with complete transparency. AI-powered fraud detection keeps everyone safe and builds long-term trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20">
            <Button size="lg" onClick={onCreatePool}>
              <Rocket className="h-5 w-5" />
              Create a Pool
            </Button>
            <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/explore-pools')}
        >
            Explore Pools
            <ArrowRight className="h-5 w-5" />
        </Button>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-16 md:mt-20">
            {[
              { value: '1,247', label: 'Active Pools', icon: BarChart3 },
              { value: '$2.4M', label: 'Verified Payouts', icon: CheckCircle },
              { value: '15,392', label: 'Users Protected', icon: Shield }
            ].map((stat, i) => (
              <div key={i} className="backdrop-blur-md rounded-2xl p-6 md:p-8 transition-all duration-300 transform hover:-translate-y-1" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <stat.icon className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;