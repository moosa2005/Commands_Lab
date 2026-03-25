import type { GeneratorConfig } from '../../types/generator';

export const dalfoxGenerator: GeneratorConfig = {
  id: 'dalfox',
  name: 'Dalfox',
  description: 'Parameter Analysis and XSS Scanning tool.',
  categoryId: 'web-testing',
  exampleUsage: 'dalfox url http://target.com/page?q=1',
  explanation: 'DalFox is a fast, parameter-based XSS scanner and utility focused on automation.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'e.g. http://target.com/search?q=test',
      required: true,
      defaultValue: ''
    },
    {
      id: 'blind',
      label: 'Blind XSS URL',
      type: 'text',
      placeholder: 'e.g. https://yourname.xss.ht',
      defaultValue: '',
      description: 'Add blind XSS payload'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['dalfox url', values.url || '<url>'];
    if (values.blind) parts.push(`-b ${values.blind}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Dalfox Command Generator - XSS Scanning & Analysis',
    description: 'Generate Dalfox commands for automated XSS vulnerability scanning. highly customizable and focused on finding reflected and blind XSS.',
    keywords: ['dalfox generator', 'xss scanner', 'blind xss tool', 'vulnerability research', 'dalfox tutorial']
  },
  additionalContent: [
    {
      title: 'Reflected vs Blind XSS',
      content: `Reflected XSS occurs when a script is reflected off a web application to the user's browser. Blind XSS is more dangerous as it's stored on the server and executed when an administrator views a specific page.`
    }
  ]
};
