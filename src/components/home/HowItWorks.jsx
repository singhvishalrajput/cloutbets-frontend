import React from 'react';
import { Shield, Users, TrendingUp, CheckCircle, Menu, X, ArrowRight, BarChart3, Lock, Award, Mail, Zap, Eye, Rocket } from 'lucide-react';

import Container from '../common/Container';
import Button from '../common/Button';

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Create Pool', desc: 'Set performance criteria and stakes clearly', icon: Zap },
    { num: '02', title: 'Invite Users', desc: 'Build your community effortlessly', icon: Users },
    { num: '03', title: 'AI Monitors', desc: 'Real-time fraud detection in action', icon: Eye },
    { num: '04', title: 'Fair Payouts', desc: 'Instant settlements to winners', icon: CheckCircle }
  ];
  
  return (
    <section id="how-it-works" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            How It Works
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A transparent ecosystem powered by AI and community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 h-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl font-bold rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                  {step.num}
                </div>
                <step.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;