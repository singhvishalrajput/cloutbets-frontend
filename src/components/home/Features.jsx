import React from 'react';
import { Shield, Lock, Users, Zap } from 'lucide-react';
import Container from '../common/Container';

const Features = () => {
  const features = [
    { title: 'AI-Powered Detection', desc: 'Advanced machine learning catches fraud before it happens', icon: Shield },
    { title: 'Multi-Sig Security', desc: 'Multiple admin approval for all critical actions', icon: Lock },
    { title: 'Community Governance', desc: 'Users vote on pool policies and rules', icon: Users },
    { title: 'Instant Settlements', desc: 'Automated smart contracts ensure fair payouts', icon: Zap }
  ];
  
  return (
    <section id="features" className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Why Choose CloutBets</h2>
          <p className="text-lg md:text-xl" style={{ color: 'var(--text-secondary)' }}>Industry-leading security and complete transparency</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {features.map((feat, i) => (
            <div key={i} className="group">
              <div className="rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 h-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;