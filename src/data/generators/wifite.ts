import type { GeneratorConfig } from '../../types/generator';

export const wifiteGenerator: GeneratorConfig = {
  id: 'wifite',
  name: 'Wifite',
  description: 'Automated wireless attack tool.',
  categoryId: 'wireless-attacks',
  exampleUsage: 'wifite --kill --all',
  explanation: 'Wifite is a tool to audit wireless networks. It is designed to be automated, customizable, and easy to use.',
  fields: [
    {
      id: 'kill',
      label: 'Kill conflicting processes',
      type: 'checkbox',
      defaultValue: true,
      description: 'Kill processes that might interfere with monitor mode (--kill)'
    },
    {
      id: 'all',
      label: 'Attack all targets',
      type: 'checkbox',
      defaultValue: false,
      description: 'Attack all access points in range (--all)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['wifite'];
    if (values.interface) parts.push(`-i ${values.interface}`);
    if (values.all) parts.push('--all');
    if (values.kill) parts.push('--kill');
    return parts.join(' ');
  },
  seo: {
    title: 'Wifite Command Generator - Automated Wireless Auditor',
    description: 'Generate Wifite commands for automated wireless network auditing. The easiest way to test multiple WiFi networks for common vulnerabilities.',
    keywords: ['wifite generator', 'automated wifi hacking', 'wireless auditor', 'wifite syntax', 'wifi security suite']
  },
  additionalContent: [
    {
      title: 'Automated WiFi Auditing',
      content: `Wifite is a tool to audit WEP or WPA encrypted wireless networks. It's designed to use all known methods for retrieving the password of a wireless access point automatically with minimal user interaction.`
    }
  ]
};
