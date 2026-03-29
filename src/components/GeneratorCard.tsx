import Link from 'next/link';
import { 
  Network, 
  Globe, 
  Key, 
  TerminalSquare, 
  Wrench, 
  BookText, 
  Search, 
  Wifi, 
  Activity,
  Terminal
} from 'lucide-react';
import type { GeneratorConfig } from '../types/generator';
import { categories } from '../data/categories';
import './GeneratorCard.css';

const iconMap: Record<string, React.ElementType> = {
  Network,
  Globe,
  Key,
  TerminalSquare,
  Wrench,
  BookText,
  Search,
  Wifi,
  Activity
};

interface GeneratorCardProps {
  generator: GeneratorConfig;
}

export default function GeneratorCard({ generator }: GeneratorCardProps) {
  const category = categories.find(c => c.id === generator.categoryId);
  
  // Dynamically get the Lucide icon component from the map
  const IconComponent = category ? (iconMap[category.iconName] || Terminal) : Terminal;

  return (
    <Link href={`/generators/${generator.id}`} className="generator-card">
      <div className="card-header">
        <div className="card-icon-wrapper">
          {IconComponent && <IconComponent size={24} className="card-icon" />}
        </div>
        <h3 className="card-title">{generator.name}</h3>
      </div>
      <p className="card-description">{generator.description}</p>
      <div className="card-footer">
        <span className="card-category">{category?.name || 'Tool'}</span>
        <span className="card-action">Use Tool &rarr;</span>
      </div>
    </Link>
  );
}
