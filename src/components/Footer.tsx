import { TerminalSquare, Github } from 'lucide-react';


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
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} CommandsLab. Developed by <a href="https://github.com/moosa2005" target="_blank" rel="noopener noreferrer" className="author-link">Muhammad Moosa</a></p>
        </div>
      </div>
    </footer>
  );
}
