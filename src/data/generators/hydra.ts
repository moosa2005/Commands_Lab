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
  generateCommand: (values: any) => {
    const parts = ['hydra'];
    if (values.usernameType && values.username) parts.push(`${values.usernameType} ${values.username}`);
    if (values.passwordType && values.password) parts.push(`${values.passwordType} ${values.password}`);
    if (values.threads && values.threads !== 16) parts.push(`-t ${values.threads}`);
    
    if (values.service && values.target) {
      parts.push(`${values.service}://${values.target}`);
    }
    
    return parts.join(' ');
  }
};
