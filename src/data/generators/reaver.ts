import type { GeneratorConfig } from '../../types/generator';

export const reaverGenerator: GeneratorConfig = {
  id: 'reaver',
  name: 'Reaver',
  description: 'Brute force attack against WiFi Protected Setup (WPS).',
  categoryId: 'wireless-attacks',
  exampleUsage: 'reaver -i wlan0mon -b 00:11:22:33:44:55 -vv',
  explanation: 'Reaver performs a brute force attack against WiFi Protected Setup (WPS) registrar PINs in order to recover WPA/WPA2 passphrases.',
  fields: [
    {
      id: 'interface',
      label: 'Monitor Mode Interface',
      type: 'text',
      placeholder: 'e.g. wlan0mon',
      required: true,
      defaultValue: 'wlan0mon'
    },
    {
      id: 'bssid',
      label: 'Target BSSID',
      type: 'text',
      placeholder: 'e.g. 00:11:22:33:44:55',
      required: true,
      defaultValue: ''
    },
    {
      id: 'verbose',
      label: 'Verbose Output',
      type: 'checkbox',
      defaultValue: true,
      description: 'Display extra information (-vv)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['reaver'];
    if (values.interface) parts.push(`-i ${values.interface}`);
    if (values.bssid) parts.push(`-b ${values.bssid}`);
    if (values.channel) parts.push(`-c ${values.channel}`);
    if (values.verbose) parts.push('-vv');
    return parts.join(' ');
  },
  seo: {
    title: 'Reaver Command Generator - WPS Brute Force Tool',
    description: 'Create Reaver commands to perform brute force attacks against WiFi Protected Setup (WPS) registrar PINs. recover WPA/WPA2 passphrases.',
    keywords: ['reaver generator', 'wps brute force', 'wifi hacking', 'reaver syntax', 'recover wifi password']
  },
  additionalContent: [
    {
      title: 'WPS Vulnerability',
      content: `Reaver performs a brute force attack against an Access Point's WiFi Protected Setup (WPS) registrar PIN. Once the WPS PIN is found, the WPA/WPA2 passphrase can be recovered, and often the AP's wireless settings can be reconfigured.`
    }
  ]
};
