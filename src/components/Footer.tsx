import { TerminalSquare, Github } from 'lucide-react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <TerminalSquare className="footer-icon" size={20} />
          <span className="footer-logo-text">Commands<span className="text-neon">Lab</span></span>
          <a href="https://github.com/moosa2005" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub Project">
            <Github size={18} />
          </a>
        </div>
        <div className="footer-links">
          <Link href="/generators" className="footer-link">Kali Linux Tools</Link>
          <Link href="/wordlist-generator" className="footer-link">Wordlist Generator</Link>
          <Link href="/learning" className="footer-link">Learn Ethical Hacking</Link>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} CommandsLab. Free online <strong>Kali Linux command generator</strong>.</p>
        </div>
      </div>
    </footer>
  );
}
