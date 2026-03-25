import type { GeneratorConfig } from '../../types/generator';

export const maltegoGenerator: GeneratorConfig = {
  id: 'maltego',
  name: 'Maltego',
  description: 'Interactive data mining and analysis tool.',
  categoryId: 'osint',
  exampleUsage: 'maltego --client-type casefile',
  explanation: 'Maltego is an interactive data mining tool that renders directed graphs for link analysis. The tool is used in online investigations for finding relationships between pieces of information from various sources on the Internet.',
  fields: [
    {
      id: 'clientType',
      label: 'Client Type',
      type: 'select',
      options: [
        { label: 'Classic', value: 'classic' },
        { label: 'XL', value: 'xl' },
        { label: 'CaseFile', value: 'casefile' }
      ],
      defaultValue: 'classic'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['maltego'];
    if (values.target) parts.push(values.target);
    return parts.join(' ');
  },
  seo: {
    title: 'Maltego Command Generator - Visual Link Analysis & OSINT',
    description: 'Create Maltego commands for visual link analysis and data mining. Graph-based investigations for complex cybersecurity research.',
    keywords: ['maltego generator', 'link analysis', 'data mining tool', 'osint visualization', 'maltego syntax']
  },
  additionalContent: [
    {
      title: 'Visual Investigations',
      content: `Maltego is an interactive data mining tool that renders directed graphs for link analysis. The tool is used in online investigations for finding relationships between pieces of information from various sources on the Internet.`
    }
  ]
};
