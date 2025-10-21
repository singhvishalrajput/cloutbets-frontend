import React from 'react';
import { Shield, Users, TrendingUp, CheckCircle, Menu, X, ArrowRight, BarChart3, Lock, Award, Mail, Twitter, Github, Zap, Eye, Rocket } from 'lucide-react';

const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;