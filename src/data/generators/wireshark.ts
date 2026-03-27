import type { GeneratorConfig } from '../../types/generator';

export const wiresharkGenerator: GeneratorConfig = {
  id: 'wireshark',
  name: 'Wireshark (Tshark)',
  description: 'Network protocol analyzer (CLI version).',
  categoryId: 'networking-sniffing',
  exampleUsage: 'tshark -i eth0 -f "tcp port 80"',
  explanation: 'Tshark is a network protocol analyzer. It lets you capture packet data from a live network, or read packets from a previously saved capture file.',
  fields: [
    {
      id: 'interface',
      label: 'Interface',
      type: 'text',
      placeholder: 'e.g. eth0, wlan0',
      required: true,
      defaultValue: 'eth0'
    },
    {
      id: 'filter',
      label: 'Capture Filter',
      type: 'text',
      placeholder: 'e.g. tcp port 80',
      defaultValue: '',
      description: 'Filter packets based on protocol, port, etc.'
    },
    {
      id: 'output',
      label: 'Output File',
      type: 'text',
      placeholder: 'capture.pcap',
      defaultValue: '',
      description: 'Write to file (-w)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['tshark'];
    if (values.interface) parts.push(`-i ${values.interface}`);
    if (values.filter) parts.push(`-Y "${values.filter}"`);
    if (values.count) parts.push(`-c ${values.count}`);
    if (values.outputFile) parts.push(`-w ${values.outputFile}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Wireshark/Tshark Command Generator - Command Line Packet Analysis',
    description: 'Create Tshark commands for powerful command-line network protocol analysis. The CLI version of Wireshark for headless packet capture and inspection.',
    keywords: ['tshark generator', 'wireshark cli', 'packet analysis', 'network sniffing', 'tshark syntax']
  },
  additionalContent: [
    {
      title: 'About Tshark',
      content: `Tshark is a network protocol analyzer. It lets you capture packet data from a live network, or read packets from a previously saved capture file, either printing a decoded form of those packets to the standard output or writing the packets to a file.`
    }
  ]
};
