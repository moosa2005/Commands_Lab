import type { GeneratorConfig } from '../../types/generator';

export const medusaGenerator: GeneratorConfig = {
  id: 'medusa',
  name: 'Medusa',
  description: 'Fast, parallel, modular, login brute-forcer.',
  categoryId: 'password-attacks',
  exampleUsage: 'medusa -h 192.168.1.1 -u admin -P passwords.txt -M ssh',
  explanation: 'Medusa is intended to be a speedy, parallel, and modular log-in brute-forcer. It supports many protocols like SSH, HTTP-form, FTP, and more.',
  fields: [
    {
      id: 'target',
      label: 'Target IP/Host',
      type: 'text',
      placeholder: 'e.g. 192.168.1.1',
      required: true,
      defaultValue: ''
    },
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'e.g. admin',
      defaultValue: 'admin'
    },
    {
      id: 'passlist',
      label: 'Password List',
      type: 'text',
      placeholder: 'e.g. /path/to/passwords.txt',
      required: true,
      defaultValue: ''
    },
    {
      id: 'module',
      label: 'Module',
      type: 'select',
      options: [
        { label: 'SSH', value: 'ssh' },
        { label: 'FTP', value: 'ftp' },
        { label: 'HTTP', value: 'http' },
        { label: 'Telnet', value: 'telnet' },
        { label: 'MSSQL', value: 'mssql' }
      ],
      defaultValue: 'ssh'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['medusa'];
    if (values.target) parts.push(`-h ${values.target}`);
    if (values.username) parts.push(`-u ${values.username}`);
    if (values.passlist) parts.push(`-P ${values.passlist}`);
    if (values.module) parts.push(`-M ${values.module}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Medusa Command Generator - Parallel Network Login Cracker',
    description: 'Create Medusa commands for fast, parallel login brute forcing. modular design supports many protocols including SSH, HTTP, and FTP.',
    keywords: ['medusa generator', 'login brute force', 'parallel cracker', 'medusa syntax', 'network security auditing']
  },
  additionalContent: [
    {
      title: 'About Medusa',
      content: `Medusa is a speedy, parallel, and modular login brute-forcer. It's often compared to Hydra as they both achieve similar goals but with different underlying architectures and module systems.`
    }
  ]
};
