import type { GeneratorConfig } from '../../types/generator';

export const ettercapGenerator: GeneratorConfig = {
  id: 'ettercap',
  name: 'Ettercap',
  description: 'Comprehensive suite for man-in-the-middle attacks.',
  categoryId: 'networking-sniffing',
  exampleUsage: 'ettercap -T -q -i eth0 -M arp:remote /192.168.1.1// /192.168.1.10//',
  explanation: 'Ettercap is a comprehensive suite for man in the middle attacks. It features sniffing of live connections, content filtering on the fly and many other interesting tricks.',
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
      id: 'target1',
      label: 'Target 1',
      type: 'text',
      placeholder: 'e.g. /192.168.1.1//',
      required: true,
      defaultValue: ''
    },
    {
      id: 'target2',
      label: 'Target 2',
      type: 'text',
      placeholder: 'e.g. /192.168.1.10//',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['ettercap'];
    if (values.textOnly) parts.push('-T');
    if (values.quiet) parts.push('-q');
    if (values.mitmMethod) parts.push(`-M ${values.mitmMethod}`);
    if (values.interface) parts.push(`-i ${values.interface}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Ettercap Command Generator - MITM Attack Suite',
    description: 'Create Ettercap commands for man-in-the-middle attacks, sniffing, and protocol analysis. supports active and passive dissection of many protocols.',
    keywords: ['ettercap generator', 'mitm attack tool', 'network sniffing', 'ettercap syntax', 'arp poisoning']
  },
  additionalContent: [
    {
      title: 'About Ettercap',
      content: `Ettercap is a comprehensive suite for man in the middle attacks. It features sniffing of live connections, content filtering on the fly and many other interesting tricks. It supports active and passive dissection of many protocols.`
    }
  ]
};
