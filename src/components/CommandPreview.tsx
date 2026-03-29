"use client";

import { useState } from 'react';
import { Terminal, Copy, Check, Download, Info } from 'lucide-react';
import './CommandPreview.css';

interface CommandPreviewProps {
  command: string;
}

export default function CommandPreview({ command }: CommandPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="command-preview-container">
      <div className="command-preview-header">
        <div className="window-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
        <span className="terminal-title">bash - CommandsLab</span>
        <button 
          className="copy-button" 
          onClick={handleCopy}
          aria-label="Copy command"
        >
          {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="command-preview-body">
        <code className="command-text">
          <span className="prompt">$ </span>
          {command || 'Select options to generate command...'}
        </code>
      </div>
    </div>
  );
}
