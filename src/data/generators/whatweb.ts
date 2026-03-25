import type { GeneratorConfig } from '../../types/generator';

export const whatwebGenerator: GeneratorConfig = {
  id: 'whatweb',
  name: 'WhatWeb',
  description: 'Next generation web scanner.',
  categoryId: 'web-testing',
  exampleUsage: 'whatweb target.com',
  explanation: 'WhatWeb identifies websites. Its goal is to answer the question, "What is that Website?". WhatWeb recognises web technologies including content management systems (CMS), blogging platforms, statistic/analytics packages and more.',
  fields: [
    {
      id: 'url',
      label: 'Target URL/IP',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'aggression',
      label: 'Aggression Level',
      type: 'select',
      options: [
        { label: 'Stealthy (1)', value: '1' },
        { label: 'Normal (3)', value: '3' },
        { label: 'Aggressive (4)', value: '4' }
      ],
      defaultValue: '1'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['whatweb'];
    if (values.aggression) parts.push(`-a ${values.aggression}`);
    if (values.url) parts.push(values.url);
    return parts.join(' ');
  },
  seo: {
    title: 'WhatWeb Command Generator - Website Identity Scanner',
    description: 'Generate WhatWeb commands to identify web technologies like CMS, blogging platforms, and analytics packages. The next-gen web scanner.',
    keywords: ['whatweb generator', 'website fingerprinting', 'cms detection', 'whatweb syntax', 'web technology scanner']
  },
  additionalContent: [
    {
      title: 'Aggression Levels',
      content: `Level 1 (Stealthy) is the quietest, making only a single HTTP request. Level 3 (Aggressive) is much more thorough and makes multiple requests to identify even well-hidden technologies.`
    }
  ]
};
