import { useEffect } from 'react';

export function useSEO(title: string, description?: string) {
  useEffect(() => {
    // Update the title
    document.title = title ? `${title} | CommandsLab` : 'CommandsLab - Generate Developer Commands Instantly';
    
    // Helper function to update meta tags safely
    const updateMetaTag = (selector: string, content: string) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    if (description) {
      updateMetaTag('meta[name="description"]', description);
      updateMetaTag('meta[property="og:description"]', description);
      updateMetaTag('meta[property="twitter:description"]', description);
    }
  }, [title, description]);
}
