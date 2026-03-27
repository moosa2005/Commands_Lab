import type { GeneratorConfig } from '../../types/generator';

export const sqlmapGenerator: GeneratorConfig = {
  id: 'sqlmap',
  name: 'SQLmap',
  description: 'Automate detecting and exploiting SQL injection flaws.',
  categoryId: 'web-testing',
  exampleUsage: 'sqlmap -u "http://example.com/id=1" --dbs --batch',
  explanation: 'sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'http://example.com/page.php?id=1',
      required: true,
      defaultValue: '',
      description: 'The target URL containing the vulnerable parameter.'
    },
    {
      id: 'level',
      label: 'Level',
      type: 'select',
      options: [
        { label: '1 (Default)', value: '--level=1' },
        { label: '2', value: '--level=2' },
        { label: '3', value: '--level=3' },
        { label: '4', value: '--level=4' },
        { label: '5 (Highest)', value: '--level=5' }
      ],
      defaultValue: '--level=1'
    },
    {
      id: 'risk',
      label: 'Risk',
      type: 'select',
      options: [
        { label: '1 (Default)', value: '--risk=1' },
        { label: '2', value: '--risk=2' },
        { label: '3 (Highest)', value: '--risk=3' }
      ],
      defaultValue: '--risk=1'
    },
    {
      id: 'action',
      label: 'Action',
      type: 'select',
      options: [
        { label: 'Enumerate Databases', value: '--dbs' },
        { label: 'Enumerate Tables', value: '--tables' },
        { label: 'Dump Data', value: '--dump' },
        { label: 'OS Shell', value: '--os-shell' }
      ],
      defaultValue: '--dbs'
    },
    {
      id: 'batch',
      label: 'Batch Mode',
      type: 'checkbox',
      defaultValue: true,
      description: 'Never ask for user input, use the default behavior.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['sqlmap'];
    if (values.url) parts.push(`-u "${values.url}"`);
    if (values.risk) parts.push(`--risk ${values.risk}`);
    if (values.level) parts.push(`--level ${values.level}`);
    if (values.batch) parts.push('--batch');
    if (values.currentDb) parts.push('--current-db');
    if (values.dump) parts.push('--dump');
    return parts.join(' ');
  },
  seo: {
    title: 'SQLmap Command Generator - Automated SQL Injection Tool',
    description: 'Create powerful SQLmap commands to detect and exploit SQL injection vulnerabilities automatically. Fast, customizable, and thorough.',
    keywords: ['sqlmap generator', 'sql injection tool', 'database exploitation', 'automated sqli scannner', 'sqlmap syntax']
  },
  additionalContent: [
    {
      title: 'Warning: Use Responsibly',
      content: `SQLmap is an extremely powerful tool that should only be used on systems you own or have explicit permission to test. Unauthorized use is illegal and unethical.`
    },
    {
      title: 'Risk and Level Settings',
      content: `--level (1-5) increases the number of tests/payloads. --risk (1-3) increases the risk of damaging the database or causing data loss. Level 5 and Risk 3 are the most thorough but most aggressive.`
    }
  ]
};
