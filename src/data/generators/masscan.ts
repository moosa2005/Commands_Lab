import type { GeneratorConfig } from '../../types/generator';

export const masscanGenerator: GeneratorConfig = {
  id: 'masscan',
  name: 'Masscan',
  description: 'Generate TCP port scanner commands, the fastest Internet port scanner.',
  categoryId: 'network-scanning',
  exampleUsage: 'masscan -p1-65535 10.0.0.0/8 --rate 100000',
  explanation: 'Masscan is an Internet-scale port scanner. It can scan the entire Internet in under 6 minutes, transmitting 10 million packets per second.',
  fields: [
    {
      id: 'target',
      label: 'Target IP / Range',
      type: 'text',
      placeholder: 'e.g. 10.0.0.0/8 or 192.168.1.1',
      required: true,
      defaultValue: '',
      description: 'The IP addresses to scan.'
    },
    {
      id: 'ports',
      label: 'Ports',
      type: 'text',
      placeholder: 'e.g. 80,443 or 1-65535',
      required: true,
      defaultValue: '',
      description: 'Ports to scan. Example: 80,443 or 1-65535'
    },
    {
      id: 'rate',
      label: 'Packet Rate',
      type: 'number',
      placeholder: 'e.g. 1000',
      defaultValue: 1000,
      description: 'Transmit rate (packets per second).'
    },
    {
      id: 'ping',
      label: 'Ping Disable',
      type: 'checkbox',
      defaultValue: true,
      description: 'Disable pinging hosts prior to scanning (--ping=false)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['masscan'];
    
    if (values.ports) parts.push(`-p${values.ports}`);
    if (values.target) parts.push(values.target);
    if (values.rate) parts.push(`--rate ${values.rate}`);
    // Masscan disables pinging by default in many scenarios, but explicitly added for clarity if checked.
    if (values.ping) parts.push('--ping=false');
    
    return parts.join(' ');
  }
};
