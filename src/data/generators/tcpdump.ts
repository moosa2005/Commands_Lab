import type { GeneratorConfig } from '../../types/generator';

export const tcpdumpGenerator: GeneratorConfig = {
  id: 'tcpdump',
  name: 'Tcpdump',
  description: 'Command-line packet analyzer.',
  categoryId: 'networking-sniffing',
  exampleUsage: 'tcpdump -i eth0 -n -v',
  explanation: 'Tcpdump is a data-network packet analyzer computer program that runs under a command-line interface. It allows the user to display TCP/IP and other packets being transmitted or received over a network to which the computer is attached.',
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
      id: 'verbose',
      label: 'Verbose Output',
      type: 'checkbox',
      defaultValue: true,
      description: 'Increase output detail (-v, -vv)'
    },
    {
      id: 'resolve',
      label: 'Resolve Names',
      type: 'checkbox',
      defaultValue: false,
      description: 'Don\'t resolve names (-n)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['tcpdump'];
    if (values.interface) parts.push(`-i ${values.interface}`);
    if (values.filter) parts.push(`"${values.filter}"`);
    if (values.count) parts.push(`-c ${values.count}`);
    if (values.outputFile) parts.push(`-w ${values.outputFile}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Tcpdump Command Generator - Network Packet Sniffer',
    description: 'Generate Tcpdump commands for lightweight and powerful network packet capturing. The standard tool for network troubleshooting and security analysis.',
    keywords: ['tcpdump generator', 'packet sniffer', 'network capture', 'tcpdump syntax', 'network troubleshooting']
  },
  additionalContent: [
    {
      title: 'Lightweight Packet Capturing',
      content: `Tcpdump is a common packet analyzer that runs under the command line. It allows the user to display TCP/IP and other packets being transmitted or received over a network to which the computer is attached.`
    }
  ]
};
