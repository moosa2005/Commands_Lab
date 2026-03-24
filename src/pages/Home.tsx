import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Shield, Zap, Search } from 'lucide-react';
import GeneratorCard from '../components/GeneratorCard';
import { allGenerators } from '../data/generators';
import { useSEO } from '../hooks/useSEO';
import './Home.css';

export default function Home() {
  useSEO('Home', 'Welcome to CommandsLab - The Ultimate Cybersecurity Command Generator.');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/generators?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get 6 popular/featured generators
  const popularGenerators = allGenerators.slice(0, 6);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Zap size={14} className="hero-badge-icon" />
          <span>v1.0.0 Now Live</span>
        </div>
        <h1 className="hero-title">
          The Ultimate <br />
          <span className="hero-highlight">Cybersecurity</span> Command Generator
        </h1>
        <p className="hero-subtitle">
          Instantly generate complex penetration testing commands without memorizing syntax. 
          A free, fast, and dark-mode native tool for security professionals.
        </p>

        <form className="hero-search" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search tools (e.g. nmap, reverse shell...)" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>

        <div className="hero-cta-group">
          <Link to="/generators" className="btn btn-primary">
            <Terminal size={18} />
            Browse All Tools
          </Link>
          <a href="#features" className="btn btn-secondary">
            <Shield size={18} />
            Learn More
          </a>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="popular-section">
        <div className="section-header">
          <h2 className="section-title">Popular Tools</h2>
          <Link to="/generators" className="view-all-link">View all &rarr;</Link>
        </div>
        
        <div className="generators-grid">
          {popularGenerators.map(gen => (
            <GeneratorCard key={gen.id} generator={gen} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="features-section">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Client-side generation means no waiting for server responses. Commands generate instantly as you type.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Privacy First</h3>
          <p>No database. No tracking. Your inputs never leave your browser for maximum operational security.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Ready</h3>
          <p>Fully responsive design lets you generate commands from your phone while on an engagement.</p>
        </div>
      </section> */}
    </div>
  );
}
