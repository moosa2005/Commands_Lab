import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { GeneratorConfig } from '../types/generator';
import { categories } from '../data/categories';
import './GeneratorCard.css';

interface GeneratorCardProps {
  generator: GeneratorConfig;
}

export default function GeneratorCard({ generator }: GeneratorCardProps) {
  const category = categories.find(c => c.id === generator.categoryId);
  
  // Dynamically get the Lucide icon component
  const IconComponent = category ? (Icons[category.iconName as keyof typeof Icons] as React.ElementType) : Icons.Terminal;

  return (
    <Link to={`/generators/${generator.id}`} className="generator-card">
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
