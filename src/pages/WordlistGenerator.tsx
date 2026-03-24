import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Play, Trash2, AlertTriangle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import './WordlistGenerator.css';

const CHARSETS: Record<string, string> = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

const MAX_WORDS = 50000;

export default function WordlistGenerator() {
  useSEO({
    title: 'Wordlist Generator - Create Custom Password Lists Online',
    description: 'Free online wordlist generator. Create custom wordlists for pentesting, brute force attacks, and security testing. Generate password lists with custom patterns, character sets, and rules.',
    keywords: 'wordlist generator, password list generator, custom wordlist, brute force wordlist, pentesting wordlist, crunch online, password dictionary generator',
    canonical: '/wordlist-generator',
  });

  const [minLen, setMinLen] = useState(4);
  const [maxLen, setMaxLen] = useState(4);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [customChars, setCustomChars] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [estimatedCount, setEstimatedCount] = useState(0);

  const getCharset = useCallback(() => {
    let charset = '';
    if (useLowercase) charset += CHARSETS.lowercase;
    if (useUppercase) charset += CHARSETS.uppercase;
    if (useNumbers) charset += CHARSETS.numbers;
    if (useSpecial) charset += CHARSETS.special;
    if (customChars) charset += customChars;
    // Remove duplicates
    return [...new Set(charset.split(''))].join('');
  }, [useLowercase, useUppercase, useNumbers, useSpecial, customChars]);

  const calculateEstimate = useCallback(() => {
    const charset = getCharset();
    if (!charset.length) return 0;
    let total = 0;
    for (let len = minLen; len <= maxLen; len++) {
      total += Math.pow(charset.length, len);
    }
    return total;
  }, [getCharset, minLen, maxLen]);

  // Update estimate whenever inputs change
  const estimate = calculateEstimate();

  const generateWordlist = useCallback(() => {
    setError('');
    const charset = getCharset();
    
    if (!charset.length) {
      setError('Please select at least one character set.');
      return;
    }

    if (minLen > maxLen) {
      setError('Minimum length cannot be greater than maximum length.');
      return;
    }

    if (minLen < 1) {
      setError('Minimum length must be at least 1.');
      return;
    }

    const total = calculateEstimate();
    if (total > MAX_WORDS) {
      setError(`Too many combinations (${total.toLocaleString()}). Maximum allowed is ${MAX_WORDS.toLocaleString()}. Try reducing length or character set.`);
      return;
    }

    setIsGenerating(true);
    const result: string[] = [];
    const chars = charset.split('');

    // Generate all combinations for each length
    for (let len = minLen; len <= maxLen; len++) {
      const indices = new Array(len).fill(0);
      
      while (true) {
        // Build current word
        let word = prefix;
        for (let i = 0; i < len; i++) {
          word += chars[indices[i]];
        }
        word += suffix;
        result.push(word);

        // Increment indices (like counting in base N)
        let pos = len - 1;
        while (pos >= 0) {
          indices[pos]++;
          if (indices[pos] < chars.length) break;
          indices[pos] = 0;
          pos--;
        }
        if (pos < 0) break;
      }
    }

    setWords(result);
    setEstimatedCount(result.length);
    setIsGenerating(false);
  }, [getCharset, minLen, maxLen, prefix, suffix, calculateEstimate]);

  const downloadWordlist = useCallback(() => {
    if (!words.length) return;
    const content = words.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wordlist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [words]);

  const clearWords = () => {
    setWords([]);
    setEstimatedCount(0);
    setError('');
  };

  return (
    <div className="wl-container">
      <Link to="/generators" className="back-link">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      <div className="wl-header">
        <h1 className="wl-title">
          Wordlist <span className="text-neon">Generator</span>
        </h1>
        <p className="wl-subtitle">
          Generate custom wordlists directly in your browser. Configure character sets, 
          length ranges, and prefixes to create targeted password dictionaries for pentesting.
        </p>
      </div>

      <div className="wl-layout">
        {/* Configuration Panel */}
        <div className="wl-config-panel">
          <h2 className="wl-section-title">Configuration</h2>

          <div className="wl-form-grid">
            <div className="wl-form-group">
              <label className="wl-label">Min Length</label>
              <input
                type="number"
                className="wl-input"
                value={minLen}
                min={1}
                max={10}
                onChange={e => setMinLen(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="wl-form-group">
              <label className="wl-label">Max Length</label>
              <input
                type="number"
                className="wl-input"
                value={maxLen}
                min={1}
                max={10}
                onChange={e => setMaxLen(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <div className="wl-charset-section">
            <label className="wl-label">Character Sets</label>
            <div className="wl-checkbox-grid">
              <label className="wl-checkbox-label">
                <input type="checkbox" checked={useLowercase} onChange={e => setUseLowercase(e.target.checked)} />
                <span className="wl-checkbox-custom"></span>
                <span>a-z <span className="wl-charset-hint">(26)</span></span>
              </label>
              <label className="wl-checkbox-label">
                <input type="checkbox" checked={useUppercase} onChange={e => setUseUppercase(e.target.checked)} />
                <span className="wl-checkbox-custom"></span>
                <span>A-Z <span className="wl-charset-hint">(26)</span></span>
              </label>
              <label className="wl-checkbox-label">
                <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} />
                <span className="wl-checkbox-custom"></span>
                <span>0-9 <span className="wl-charset-hint">(10)</span></span>
              </label>
              <label className="wl-checkbox-label">
                <input type="checkbox" checked={useSpecial} onChange={e => setUseSpecial(e.target.checked)} />
                <span className="wl-checkbox-custom"></span>
                <span>Special <span className="wl-charset-hint">(26)</span></span>
              </label>
            </div>
          </div>

          <div className="wl-form-group">
            <label className="wl-label">Custom Characters</label>
            <input
              type="text"
              className="wl-input"
              placeholder="Add extra characters..."
              value={customChars}
              onChange={e => setCustomChars(e.target.value)}
            />
            <p className="wl-help">Additional characters to include in generation.</p>
          </div>

          <div className="wl-form-grid">
            <div className="wl-form-group">
              <label className="wl-label">Prefix</label>
              <input
                type="text"
                className="wl-input"
                placeholder="e.g. admin"
                value={prefix}
                onChange={e => setPrefix(e.target.value)}
              />
              <p className="wl-help">Added before each word.</p>
            </div>
            <div className="wl-form-group">
              <label className="wl-label">Suffix</label>
              <input
                type="text"
                className="wl-input"
                placeholder="e.g. 2024"
                value={suffix}
                onChange={e => setSuffix(e.target.value)}
              />
              <p className="wl-help">Added after each word.</p>
            </div>
          </div>

          {/* Estimate */}
          <div className={`wl-estimate ${estimate > MAX_WORDS ? 'wl-estimate-danger' : ''}`}>
            {estimate > MAX_WORDS && <AlertTriangle size={16} />}
            <span>
              Estimated: <strong>{estimate.toLocaleString()}</strong> words
              {estimate > MAX_WORDS && ` (max ${MAX_WORDS.toLocaleString()})`}
            </span>
          </div>

          {error && <div className="wl-error">{error}</div>}

          {/* Action Buttons */}
          <div className="wl-actions">
            <button
              className="wl-btn wl-btn-generate"
              onClick={generateWordlist}
              disabled={isGenerating || estimate > MAX_WORDS || estimate === 0}
            >
              <Play size={18} />
              {isGenerating ? 'Generating...' : 'Generate Wordlist'}
            </button>
            {words.length > 0 && (
              <>
                <button className="wl-btn wl-btn-download" onClick={downloadWordlist}>
                  <Download size={18} />
                  Download .txt
                </button>
                <button className="wl-btn wl-btn-clear" onClick={clearWords}>
                  <Trash2 size={18} />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Output / Preview Panel */}
        <div className="wl-output-panel">
          <div className="wl-output-header">
            <h2 className="wl-section-title">
              {words.length > 0 ? `Output (${estimatedCount.toLocaleString()} words)` : 'Output Preview'}
            </h2>
          </div>
          <div className="wl-output-body">
            {words.length === 0 ? (
              <div className="wl-empty-state">
                <p>Configure your settings and click <strong>Generate Wordlist</strong> to see results here.</p>
              </div>
            ) : (
              <pre className="wl-output-text">
                {words.slice(0, 500).join('\n')}
                {words.length > 500 && `\n\n... and ${(words.length - 500).toLocaleString()} more words (download to see all)`}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
