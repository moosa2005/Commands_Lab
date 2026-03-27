"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import GeneratorCard from '../components/GeneratorCard';
import { allGenerators } from '../data/generators';
import { categories } from '../data/categories';



export default function GeneratorsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const setSearchParams = (params: URLSearchParams, options?: { replace?: boolean }) => {
    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ''}`;
    if (options?.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };
  
  // URL as source of truth
  const searchQueryURL = searchParams?.get('q') || '';
  const selectedCategory = searchParams?.get('cat') || 'all';
  
  // Local state for input responsiveness
  const [searchInput, setSearchInput] = useState(searchQueryURL);

  // Sync input when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setSearchInput(searchQueryURL);
  }, [searchQueryURL]);

  // Update URL on search change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchQueryURL) {
        const newParams = new URLSearchParams(searchParams?.toString() || '');
        if (searchInput) {
          newParams.set('q', searchInput);
        } else {
          newParams.delete('q');
        }
        setSearchParams(newParams, { replace: true });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, searchQueryURL, setSearchParams, searchParams]);

  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(searchParams?.toString() || '');
    if (catId === 'all') {
      newParams.delete('cat');
    } else {
      newParams.set('cat', catId);
    }
    setSearchParams(newParams);
  };

  const filteredGenerators = useMemo(() => {
    return allGenerators.filter(gen => {
      const matchSearch = gen.name.toLowerCase().includes(searchInput.toLowerCase()) || 
                          gen.description.toLowerCase().includes(searchInput.toLowerCase());
      const matchCategory = selectedCategory === 'all' || gen.categoryId === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchInput, selectedCategory]);

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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories-list">
          <button 
            className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
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
            onClick={() => { setSearchInput(''); handleCategoryChange('all'); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
