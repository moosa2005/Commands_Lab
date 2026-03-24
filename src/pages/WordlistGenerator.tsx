import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Play, AlertTriangle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import './WordlistGenerator.css';

const CHARSETS: Record<string, string> = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const getCharset = useCallback(() => {
    let charset = '';
    if (useLowercase) charset += CHARSETS.lowercase;
    if (useUppercase) charset += CHARSETS.uppercase;
    if (useNumbers) charset += CHARSETS.numbers;
    if (useSpecial) charset += CHARSETS.special;
    if (customChars) charset += customChars;
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

  const estimate = calculateEstimate();

  const generateAndDownload = useCallback(async () => {
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

    setIsGenerating(true);
    setProgress('Generating wordlist...');

    const chars = charset.split('');
    const chunks: string[] = [];
    let buffer = '';
    let count = 0;
    const CHUNK_SIZE = 10000; // flush buffer every 10k words

    // Use setTimeout trick to keep UI responsive
    await new Promise<void>((resolve) => {
      const processLength = (len: number, lengthIndex: number) => {
        const indices = new Array(len).fill(0);
        
        const processBatch = () => {
          const batchLimit = 50000; // process 50k words per frame
          let batchCount = 0;

          while (batchCount < batchLimit) {
            // Build word
            let word = prefix;
            for (let i = 0; i < len; i++) {
              word += chars[indices[i]];
            }
            word += suffix;
            buffer += word + '\n';
            count++;
            batchCount++;

            if (count % CHUNK_SIZE === 0) {
              chunks.push(buffer);
              buffer = '';
              setProgress(`Generated ${count.toLocaleString()} words...`);
            }

            // Increment indices
            let pos = len - 1;
            while (pos >= 0) {
              indices[pos]++;
              if (indices[pos] < chars.length) break;
              indices[pos] = 0;
              pos--;
            }
            if (pos < 0) {
              // Done with this length
              if (lengthIndex < maxLen - minLen) {
                setProgress(`Generated ${count.toLocaleString()} words... (length ${len + 1})`);
                setTimeout(() => processLength(len + 1, lengthIndex + 1), 0);
              } else {
                // All done
                if (buffer) chunks.push(buffer);
                setProgress(`Done! ${count.toLocaleString()} words generated. Preparing download...`);
                setTimeout(() => resolve(), 0);
              }
              return;
            }
          }

          // Yield to UI thread, then continue
          setTimeout(processBatch, 0);
        };

        processBatch();
      };

      processLength(minLen, 0);
    });

    // Download
    const blob = new Blob(chunks, { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wordlist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setProgress(`✅ Downloaded ${count.toLocaleString()} words successfully!`);
    setIsGenerating(false);
  }, [getCharset, minLen, maxLen, prefix, suffix]);

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
          Generate unlimited custom wordlists directly in your browser. Configure character sets, 
          length, and prefixes — then download instantly as a .txt file.
        </p>
      </div>

      <div className="wl-single-panel">
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
                max={20}
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
                max={20}
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
            <p className="wl-help">Additional characters to include.</p>
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
          <div className={`wl-estimate ${estimate > 10000000 ? 'wl-estimate-warning' : ''}`}>
            {estimate > 10000000 && <AlertTriangle size={16} />}
            <span>
              Estimated: <strong>{estimate.toLocaleString()}</strong> words
              {estimate > 10000000 && ' — large file, may take a while'}
            </span>
          </div>

          {error && <div className="wl-error">{error}</div>}

          {progress && !error && (
            <div className="wl-progress">{progress}</div>
          )}

          {/* Action Button */}
          <div className="wl-actions">
            <button
              className="wl-btn wl-btn-generate"
              onClick={generateAndDownload}
              disabled={isGenerating || estimate === 0}
            >
              {isGenerating ? (
                <><span className="wl-spinner"></span> Generating...</>
              ) : (
                <><Download size={18} /> Generate & Download</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
