import type { GeneratorConfig } from '../../types/generator';

export const bettercapGenerator: GeneratorConfig = {
  id: 'bettercap',
  name: 'Bettercap',
  description: 'The Swiss Army knife for networking.',
  categoryId: 'networking-sniffing',
  exampleUsage: 'bettercap -iface eth0 -eval "net.probe on; net.show"',
  explanation: 'Bettercap is a powerful, flexible and easily extensible tool, written in Go, which aims to provide to security researchers, red teamers and reverse engineers an all-in-one solution for all their needs.',
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
      id: 'command',
      label: 'Startup Commands',
      type: 'text',
      placeholder: 'e.g. net.probe on; net.sniff on',
      defaultValue: 'net.probe on; net.show',
      description: 'Commands to run on startup (-eval)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['bettercap'];
    if (values.interface) parts.push(`-iface ${values.interface}`);
    if (values.command) parts.push(`-eval "${values.command}"`);
    return parts.join(' ');
  },
  seo: {
    title: 'Bettercap Command Generator - All-in-one Network Recon Tool',
    description: 'Generate Bettercap commands for advanced network reconnaissance and MITM attacks. The Swiss Army knife for 802.11, BLE, and Ethernet networks.',
    keywords: ['bettercap generator', 'network recon', 'mitm tool', 'bettercap syntax', 'packet manipulation']
  },
  additionalContent: [
    {
      title: 'Advanced Network Analysis',
      content: `Bettercap is a powerful, flexible and portable tool for network security professionals and enthusiasts. It's designed to perform various types of attacks like MITM, sniffing, and asset discovery across different network protocols.`
    }
  ]
};
