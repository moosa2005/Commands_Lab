import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';
import FormEngine from '../components/FormEngine';
import { allGenerators } from '../data/generators';
import { categories } from '../data/categories';
import { useSEO } from '../hooks/useSEO';
import './GeneratorDetail.css';

export default function GeneratorDetail() {
  const { id } = useParams<{ id: string }>();
  
  const generator = allGenerators.find(g => g.id === id);

  useSEO(
    generator ? generator.name : 'Tool Not Found',
    generator ? generator.description : 'The command generator you are looking for does not exist.'
  );

  if (!generator) {
    return (
      <div className="not-found-container">
        <h2>Tool Not Found</h2>
        <p>The command generator you are looking for does not exist.</p>
        <Link to="/generators" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Directory
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === generator.categoryId);
  const IconComponent = category ? (Icons[category.iconName as keyof typeof Icons] as React.ElementType) : Icons.Terminal;

  return (
    <div className="detail-container">
      <Link to="/generators" className="back-link">
        <ArrowLeft size={16} /> Back to Directory
      </Link>

      <div className="detail-header">
        <div className="detail-title-row">
          <div className="detail-icon-wrapper">
            {IconComponent && <IconComponent size={28} className="detail-icon" />}
          </div>
          <h1 className="detail-title">{generator.name}</h1>
        </div>
        <div className="detail-tags">
          <span className="tag text-neon">{category?.name}</span>
        </div>
      </div>

      <p className="detail-description">{generator.description}</p>

      <div className="usage-instructions">
        <Icons.Info size={18} className="info-icon" />
        <p>
          Customize the parameters below to generate your target command. 
          Use the preview box to verify syntax and click the clipboard icon to copy.
        </p>
      </div>

      <div className="tool-content">
        <FormEngine generator={generator} />
      </div>
    </div>
  );
}
