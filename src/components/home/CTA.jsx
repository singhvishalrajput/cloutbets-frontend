import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

const CTA = () => {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Container>
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden p-8 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
          </div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">Ready to Transform Betting?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">Join thousands of users creating fair, transparent, and secure pools today</p>
            <Button size="lg" variant="secondary">
              Start Creating Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;