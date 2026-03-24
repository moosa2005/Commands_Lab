import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TerminalSquare, Github, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <TerminalSquare className="brand-icon" />
          <span className="brand-text">Commands<span className="brand-highlight">Lab</span></span>
        </Link>
        
        <nav className="navbar-links">
          <Link to="/generators" className="nav-link">Tools</Link>
          <a href="https://github.com/moosa2005" target="_blank" rel="noopener noreferrer" className="nav-link icon-link">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
        </nav>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <nav className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close Menu">
                <X size={24} />
              </button>
            </div>
            
            <Link to="/generators" className="mobile-nav-link" onClick={closeMenu}>Tools Directory</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMenu}>
              <Github size={20} /> GitHub Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
