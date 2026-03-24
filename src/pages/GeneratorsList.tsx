import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import GeneratorCard from '../components/GeneratorCard';
import { allGenerators } from '../data/generators';
import { categories } from '../data/categories';
import { useSEO } from '../hooks/useSEO';
import './GeneratorsList.css';

export default function GeneratorsList() {
  useSEO({
    title: 'All Pentesting & Hacking Command Generators',
    description: 'Browse our complete collection of free cybersecurity command generators: Nmap, SQLMap, Hydra, Hashcat, Metasploit, reverse shells, Gobuster, FFUF, and more. Generate commands instantly without memorizing syntax.',
    keywords: 'pentesting tools list, hacking command generators, cybersecurity tools directory, nmap sqlmap hydra hashcat metasploit commands, free hacking tools online, penetration testing cheat sheet',
    canonical: '/generators',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Pentesting Command Generators Directory',
      'url': 'https://commandslab.com/generators',
      'description': 'Complete collection of free cybersecurity command generators for penetration testing.'
    }
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Update URL on search change
  useEffect(() => {
    if (searchQuery !== queryParam) {
      if (searchQuery) {
        setSearchParams({ q: searchQuery });
      } else {
        setSearchParams({});
      }
    }
  }, [searchQuery, setSearchParams, queryParam]);

  const filteredGenerators = useMemo(() => {
    return allGenerators.filter(gen => {
      const matchSearch = gen.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          gen.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || gen.categoryId === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="directory-container">
      <div className="directory-header">
        <h1 className="directory-title">
          Command <span className="text-neon">Directory</span>
        </h1>
        <p className="directory-subtitle">Browse all available penetration testing utilities.</p>
      </div>

      <div className="directory-controls">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for a tool..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories-list">
          <button 
            className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {filteredGenerators.length > 0 ? (
        <div className="generators-grid">
          {filteredGenerators.map(gen => (
            <GeneratorCard key={gen.id} generator={gen} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>No tools found</h2>
          <p>Try adjusting your search or filter criteria.</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
