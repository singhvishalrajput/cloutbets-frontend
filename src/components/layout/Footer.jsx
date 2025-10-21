
import { Shield, Users, TrendingUp, CheckCircle, Menu, X, ArrowRight, BarChart3, Lock, Award, Mail, Twitter, Github, Zap, Eye, Rocket } from 'lucide-react';

import Container from '../common/Container';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="py-12 md:py-16" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
      <Container>
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>CloutBets</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Next-gen AI-driven betting platform with transparency built in from day one.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Product</h4>
            <ul className="space-y-2 text-sm">
              {['How It Works', 'Features', 'Security', 'Pricing'].map(item => (
                <li key={item}><a href="#" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h4>
            <ul className="space-y-2 text-sm">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}><a href="#" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Connect</h4>
            <div className="flex gap-3">
              {[Twitter, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>© 2025 CloutBets. All rights reserved.</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Transparency isn't optional — it's built in.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;