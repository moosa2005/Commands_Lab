import type { GeneratorConfig } from '../../types/generator';

export const sqlmapGenerator: GeneratorConfig = {
  id: 'sqlmap',
  name: 'SQLmap',
  description: 'Automate detecting and exploiting SQL injection flaws.',
  categoryId: 'web-testing',
  exampleUsage: 'sqlmap -u "http://example.com/page?id=1" --dbs --batch',
  explanation: 'SQLmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers.',
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
  generateCommand: (values: any) => {
    const parts = ['sqlmap'];
    if (values.url) parts.push(`-u "${values.url}"`);
    if (values.level && values.level !== '--level=1') parts.push(values.level);
    if (values.risk && values.risk !== '--risk=1') parts.push(values.risk);
    if (values.action) parts.push(values.action);
    if (values.batch) parts.push('--batch');
    return parts.join(' ');
  }
};
