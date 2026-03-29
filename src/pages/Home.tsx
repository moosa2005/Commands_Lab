"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, Shield, Zap, Search } from 'lucide-react';
import GeneratorCard from '../components/GeneratorCard';
import { allGenerators } from '../data/generators';
import './Home.css';



export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/generators?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularGenerators = allGenerators.slice(0, 6);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Zap size={14} className="hero-badge-icon" />
          <span>Free Kali Linux Tool</span>
        </div>
        <h1 className="hero-title">
          Kali Linux <br />
          <span className="hero-highlight">Command Generator</span>
        </h1>
        <p className="hero-subtitle">
          Generate complex Kali Linux penetration testing commands instantly for Nmap, SQLMap, Hydra, 
          Metasploit, and reverse shells. The ultimate <strong>free online pentesting tool</strong> for ethical hackers.
        </p>

        <form className="hero-search" onSubmit={handleSearch} role="search" aria-label="Search Kali Linux command generators">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search Kali Linux tools (e.g. nmap, reverse shell, hydra...)" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for Kali Linux command generators"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>

        <div className="hero-cta-group">
          <Link href="/generators" className="btn btn-primary">
            <Terminal size={18} />
            Browse All Kali Linux Tools
          </Link>
          <a href="#features" className="btn btn-secondary">
            <Shield size={18} />
            Why CommandsLab?
          </a>
        </div>
      </section>

      {/* Popular Kali Linux Tools */}
      <section className="popular-section">
        <div className="section-header">
          <h2 className="section-title">Popular Kali Linux Command Generators</h2>
          <Link href="/generators" className="view-all-link">View all &rarr;</Link>
        </div>
        
        <div className="generators-grid">
          {popularGenerators.map(gen => (
            <GeneratorCard key={gen.id} generator={gen} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Instant Kali Linux Commands</h3>
          <p>No more memorizing complex Kali Linux syntax. Select your options and get perfectly formatted commands for Nmap, Hydra, SQLMap, and more — generated instantly in your browser.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>100% Private & Secure</h3>
          <p>All Kali Linux commands are generated client-side. No data is sent to any server. Your penetration testing targets and configurations never leave your browser.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Pentesting Ready</h3>
          <p>Generate Kali Linux commands from your phone or tablet during security engagements. Fully responsive design works on any device, anywhere.</p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="seo-content-section">
        <h2 className="seo-heading">Free Online Kali Linux Command Generator & Pentesting Tool</h2>
        <div className="seo-text-grid">
          <article className="seo-text-block">
            <h3>What is CommandsLab?</h3>
            <p>
              CommandsLab is a <strong>Kali Linux command generator</strong> designed for 
              cybersecurity professionals, ethical hackers, and penetration testers. Instead of memorizing 
              complex syntax for tools like <Link href="/generators/nmap">Nmap</Link>, <Link href="/generators/sqlmap">SQLMap</Link>, <Link href="/generators/hydra">Hydra</Link>, <Link href="/generators/metasploit">Metasploit</Link>, and <Link href="/generators/hashcat">Hashcat</Link>, simply select your options and get a ready-to-use command.
            </p>
          </article>
          <article className="seo-text-block">
            <h3>Nmap & SQLMap Commands</h3>
            <p>
              We support all major penetration testing tools including <strong>Nmap command generator</strong> for network scanning, 
              <strong>SQLMap commands</strong> for SQL injection, <strong>Hydra brute force tool</strong> for password attacks, 
              <strong>Metasploit commands</strong> for exploitation, and <strong>reverse shell generator</strong> for post-exploitation.
            </p>
          </article>
          <article className="seo-text-block">
            <h3>Who Is This For?</h3>
            <p>
              Whether you're a cybersecurity student, a CTF player, or a professional <strong>penetration tester</strong>, 
              CommandsLab helps you generate the right commands faster. Works perfectly as a 
              <strong>Kali Linux cheat sheet</strong> and quick reference for ethical hacking.
            </p>
          </article>
          <article className="seo-text-block">
            <h3>Why Use a Command Generator?</h3>
            <p>
              Kali Linux has hundreds of tools with thousands of flags. Remembering every Nmap scan type or Hydra protocol option is impractical. Our <strong>command generator</strong> lets 
              you visually configure options and instantly get the correct syntax — saving time during security assessments.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ Section - targets Google featured snippets */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <details className="faq-item">
            <summary>What is a Kali Linux command generator?</summary>
            <p>A Kali Linux command generator is a tool that helps you build complex penetration testing commands without memorizing syntax. You select options from a visual interface, and the tool generates the correct command for tools like Nmap, SQLMap, Hydra, Metasploit, and more.</p>
          </details>
          <details className="faq-item">
            <summary>Is CommandsLab free to use?</summary>
            <p>Yes, CommandsLab is 100% free to use. There are no signups, no ads, and no premium plans. All Kali Linux command generators are available at no cost.</p>
          </details>
          <details className="faq-item">
            <summary>Do I need Kali Linux installed to use this?</summary>
            <p>No, you can use CommandsLab from any browser to generate commands. However, to actually run the generated commands, you'll need Kali Linux or another Linux distribution with the relevant tools installed.</p>
          </details>
          <details className="faq-item">
            <summary>Which Kali Linux tools are supported?</summary>
            <p>CommandsLab supports Nmap, Masscan, SQLMap, FFUF, Gobuster, Hydra, Hashcat, John the Ripper, Metasploit, Msfvenom payloads, reverse shell generators, Curl, Base64, and Bash script generators — with more being added regularly.</p>
          </details>
          <details className="faq-item">
            <summary>Is my data safe when generating commands?</summary>
            <p>Absolutely. All commands are generated entirely in your browser using client-side JavaScript. No data is ever sent to a server, making it completely private and safe for use during real penetration testing engagements.</p>
          </details>
          <details className="faq-item">
            <summary>Can I use this as a Kali Linux cheat sheet?</summary>
            <p>Yes! CommandsLab works great as a Kali Linux cheat sheet and quick reference. Each tool page shows the generated command along with explanations and example usage, making it perfect for learning and reference.</p>
          </details>
        </div>
      </section>
    </div>
  );
}
