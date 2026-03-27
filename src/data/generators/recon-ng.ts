import type { GeneratorConfig } from '../../types/generator';

export const reconNgGenerator: GeneratorConfig = {
  id: 'recon-ng',
  name: 'Recon-ng',
  description: 'Full-featured reconnaissance framework.',
  categoryId: 'osint',
  exampleUsage: 'recon-ng -w workspace_name',
  explanation: 'Recon-ng is a full-featured reconnaissance framework designed with the goal of providing a powerful environment to conduct open source reconnaissance quickly and thoroughly.',
  fields: [
    {
      id: 'workspace',
      label: 'Workspace',
      type: 'text',
      placeholder: 'e.g. my_project',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['recon-ng'];
    if (values.workspace) parts.push(`-w ${values.workspace}`);
    if (values.runModule) parts.push(`-m ${values.runModule} -x "run"`);
    return parts.join(' ');
  },
  seo: {
    title: 'Recon-ng Command Generator - Web-based OSINT Framework',
    description: 'Create Recon-ng commands for powerful open-source intelligence gathering. Modular framework similar to Metasploit but for reconnaissance.',
    keywords: ['recon-ng generator', 'osint framework', 'reconnaissance automation', 'recon-ng syntax', 'web-based recon']
  },
  additionalContent: [
    {
      title: 'Modular OSINT',
      content: `Recon-ng is a full-featured Web Reconnaissance Framework written in Python. It provides a powerful environment to conduct open source web reconnaissance quickly and thoroughly.`
    }
  ]
};
