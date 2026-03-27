import type { GeneratorConfig } from '../../types/generator';

export const commixGenerator: GeneratorConfig = {
  id: 'commix',
  name: 'Commix',
  description: 'Automated Command Injection exploitation tool.',
  categoryId: 'exploitation',
  exampleUsage: 'commix --url="http://example.com/id=INJECT_HERE"',
  explanation: 'Commix (short for [comm]and [i]njection [e]xploiter) is an open source penetration testing tool that automates the detection and exploitation of command injection vulnerabilities.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'http://example.com/vuln.php?id=1',
      required: true,
      defaultValue: '',
      description: 'The target URL with the (potentially) vulnerable parameter.'
    },
    {
      id: 'level',
      label: 'Level',
      type: 'select',
      options: [
        { label: '1 (Default)', value: '1' },
        { label: '2', value: '2' },
        { label: '3 (Thorough)', value: '3' }
      ],
      defaultValue: '1'
    },
    {
      id: 'batch',
      label: 'Batch Mode',
      type: 'checkbox',
      defaultValue: true,
      description: 'Never ask for user input, use default behavior.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['commix', `--url="${values.url || 'http://target.com'}"`];
    if (values.level !== '1') parts.push(`--level=${values.level}`);
    if (values.batch) parts.push('--batch');
    return parts.join(' ');
  },
  seo: {
    title: 'Commix Command Generator - Automated Command Injection Tool',
    description: 'Build Commix commands to exploit command injection vulnerabilities. automated detection and exploitation of OS command injection.',
    keywords: ['commix generator', 'command injection tool', 'exploit command injection', 'commix syntax', 'automated rce scanner']
  }
};
