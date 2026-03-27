import type { GeneratorConfig } from '../../types/generator';

export const hydraGenerator: GeneratorConfig = {
  id: 'hydra',
  name: 'Hydra',
  description: 'Network logon cracker supporting multiple services.',
  categoryId: 'password-attacks',
  exampleUsage: 'hydra -l admin -P passwords.txt ssh://192.168.1.1',
  explanation: 'Hydra is a parallelized login cracker which supports numerous protocols to attack. It is very fast and flexible.',
  fields: [
    {
      id: 'target',
      label: 'Target IP / Host',
      type: 'text',
      placeholder: '192.168.1.1',
      required: true,
      defaultValue: '',
      description: 'The target server to attack.'
    },
    {
      id: 'service',
      label: 'Protocol / Service',
      type: 'select',
      options: [
        { label: 'SSH', value: 'ssh' },
        { label: 'FTP', value: 'ftp' },
        { label: 'HTTP-GET', value: 'http-get' },
        { label: 'HTTP-POST-FORM', value: 'http-post-form' },
        { label: 'RDP', value: 'rdp' }
      ],
      defaultValue: 'ssh'
    },
    {
      id: 'usernameType',
      label: 'Username Input Type',
      type: 'select',
      options: [
        { label: 'Single Username (-l)', value: '-l' },
        { label: 'Username List (-L)', value: '-L' }
      ],
      defaultValue: '-l'
    },
    {
      id: 'username',
      label: 'Username / List Path',
      type: 'text',
      placeholder: 'admin OR users.txt',
      required: true,
      defaultValue: 'admin'
    },
    {
      id: 'passwordType',
      label: 'Password Input Type',
      type: 'select',
      options: [
        { label: 'Single Password (-p)', value: '-p' },
        { label: 'Password List (-P)', value: '-P' }
      ],
      defaultValue: '-P'
    },
    {
      id: 'password',
      label: 'Password / List Path',
      type: 'text',
      placeholder: 'passwords.txt',
      required: true,
      defaultValue: ''
    },
    {
      id: 'threads',
      label: 'Threads (-t)',
      type: 'number',
      placeholder: '4',
      defaultValue: 4,
      description: 'Number of parallel connects per target.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['hydra'];
    if (values.login) parts.push(`-l ${String(values.login)}`);
    if (values.password) parts.push(`-p ${String(values.password)}`);
    if (values.loginList) parts.push(`-L ${String(values.loginList)}`);
    if (values.passwordList) parts.push(`-P ${String(values.passwordList)}`);
    if (values.threads) parts.push(`-t ${String(values.threads)}`);
    if (values.target) parts.push(String(values.target));
    if (values.service) parts.push(String(values.service));
    return parts.join(' ');
  },
  seo: {
    title: 'Hydra Command Generator - Fast Network Login Cracker',
    description: 'Generate Hydra commands for parallelized login brute forcing. Supports SSH, FTP, HTTP, Telnet, and many more protocols.',
    keywords: ['hydra generator', 'network login cracker', 'brute force ssh', 'hydra syntax', 'parallelized cracker']
  },
  additionalContent: [
    {
      title: 'Hydra Performance',
      content: `Hydra is incredibly fast because it performs parallelized login attempts. Use the -t flag carefully; too many threads might cause the target service to become unresponsive or block your IP.`
    }
  ]
};
