import type { GeneratorConfig } from '../../types/generator';

export const niktoGenerator: GeneratorConfig = {
  id: 'nikto',
  name: 'Nikto',
  description: 'Web server security scanner.',
  categoryId: 'web-testing',
  exampleUsage: 'nikto -h target.com -o nikto.html -Format htm',
  explanation: 'Nikto is a free software command-line vulnerability scanner that scans web servers for dangerous files/CGIs, outdated server software and other problems.',
  fields: [
    {
      id: 'host',
      label: 'Host',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'port',
      label: 'Port',
      type: 'number',
      defaultValue: 80
    },
    {
      id: 'ssl',
      label: 'Use SSL',
      type: 'checkbox',
      defaultValue: false,
      description: 'Enable SSL (-ssl)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['nikto'];
    if (values.host) parts.push(`-h ${values.host}`);
    if (values.port) parts.push(`-p ${values.port}`);
    if (values.ssl) parts.push('-ssl');
    return parts.join(' ');
  },
  seo: {
    title: 'Nikto Command Generator - Web Server Vulnerability Scanner',
    description: 'Create Nikto commands to scan web servers for over 6700 potentially dangerous files and programs. Comprehensive security auditing.',
    keywords: ['nikto generator', 'web server scanner', 'vulnerability scan', 'nikto syntax', 'server auditing']
  },
  additionalContent: [
    {
      title: 'Comprehensive Scanning',
      content: `Nikto is an classic but powerful scanner that checks for server misconfigurations, outdated software, and common vulnerabilities. It is highly recommended to run it as part of any web assessment.`
    }
  ]
};
