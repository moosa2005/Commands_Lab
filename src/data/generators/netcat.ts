import type { GeneratorConfig } from '../../types/generator';

export const netcatGenerator: GeneratorConfig = {
  id: 'netcat',
  name: 'Netcat (nc)',
  description: 'The TCP/IP Swiss Army Knife.',
  categoryId: 'networking-sniffing',
  exampleUsage: 'nc -lvnp 4444',
  explanation: 'Netcat is a featured networking utility which reads and writes data across network connections, using the TCP/IP protocol.',
  fields: [
    {
      id: 'mode',
      label: 'Mode',
      type: 'select',
      options: [
        { label: 'Listen (-l)', value: 'listen' },
        { label: 'Connect (client)', value: 'connect' }
      ],
      defaultValue: 'listen'
    },
    {
      id: 'ip',
      label: 'IP Address (for connect mode)',
      type: 'text',
      placeholder: 'e.g. 192.168.1.1',
      defaultValue: ''
    },
    {
      id: 'port',
      label: 'Port',
      type: 'number',
      defaultValue: 4444
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['nc'];
    if (values.listen) parts.push('-l');
    if (values.port) parts.push(`-p ${values.port}`);
    if (values.verbose) parts.push('-v');
    if (values.target) parts.push(values.target);
    if (!values.listen && values.port) parts.push(values.port);
    return parts.join(' ');
  },
  seo: {
    title: 'Netcat Command Generator - The TCP/IP Swiss Army Knife',
    description: 'Generate Netcat (nc) commands for network connections, port listening, and file transfers. simple but incredibly versatile networking tool.',
    keywords: ['netcat generator', 'nc command', 'port listener', 'network connection tool', 'netcat syntax']
  },
  additionalContent: [
    {
      title: 'Networking Versatility',
      content: `Netcat is a featured networking utility which reads and writes data across network connections, using the TCP or UDP protocol. It's often used for port scanning, file transfers, and creating backdoors for testing purposes.`
    }
  ]
};
