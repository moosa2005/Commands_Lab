import type { GeneratorConfig } from '../../types/generator';

export const spiderfootGenerator: GeneratorConfig = {
  id: 'spiderfoot',
  name: 'SpiderFoot',
  description: 'OSINT automation tool.',
  categoryId: 'osint',
  exampleUsage: 'sf.py -l 127.0.0.1:5001',
  explanation: 'SpiderFoot is an open source intelligence (OSINT) automation tool. Its goal is to automate the process of gathering intelligence about a given target, such as an IP address, domain name, hostname, network subnet, and more.',
  fields: [
    {
      id: 'listen',
      label: 'Listen Address',
      type: 'text',
      placeholder: 'e.g. 127.0.0.1:5001',
      defaultValue: '127.0.0.1:5001'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['sf.py'];
    if (values.target) parts.push(`-t ${values.target}`);
    if (values.module) parts.push(`-m ${values.module}`);
    return parts.join(' ');
  },
  seo: {
    title: 'SpiderFoot Command Generator - Automated OSINT Gathering',
    description: 'Generate SpiderFoot commands for automated open-source intelligence gathering. Modular and extremely thorough recon for any target.',
    keywords: ['spiderfoot generator', 'automated osint', 'reconnaissance automation', 'spiderfoot syntax', 'threat intelligence']
  },
  additionalContent: [
    {
      title: 'Automated Intelligence',
      content: `SpiderFoot is an automation tool for OSINT. It integrates with over 100 public data sources and automates the process of gathering intelligence for a given target, whether its an IP, domain, or person.`
    }
  ]
};
