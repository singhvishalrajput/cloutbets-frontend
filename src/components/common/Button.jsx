import React from 'react';
import { Shield, Users, TrendingUp, CheckCircle, Menu, X, ArrowRight, BarChart3, Lock, Award, Mail, Twitter, Github, Zap, Eye, Rocket } from 'lucide-react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-1',
    secondary: 'border-2 hover:border-blue-600 hover:shadow-lg hover:-translate-y-1',
    outline: 'bg-transparent border-2 hover:bg-white/10 backdrop-blur-sm'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={
        variant === 'secondary'
          ? { backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }
          : variant === 'outline'
          ? { color: 'var(--text-primary)', borderColor: 'var(--text-primary)' }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;