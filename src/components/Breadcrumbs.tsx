"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname || pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          return (
            <li key={href} className="breadcrumb-item">
              <ChevronRight size={14} className="breadcrumb-separator" />
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">{title}</span>
              ) : (
                <Link href={href} className="breadcrumb-link">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <style jsx>{`
        .breadcrumbs-nav {
          padding: 1rem 0;
          margin-bottom: 1rem;
        }
        .breadcrumbs-list {
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
        }
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-link:hover {
          color: #ffffff;
        }
        .breadcrumb-separator {
          margin: 0 0.5rem;
          color: #4b5563;
        }
        .breadcrumb-current {
          color: #3b82f6;
          font-weight: 500;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </nav>
  );
}
