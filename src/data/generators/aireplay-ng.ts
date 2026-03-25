import type { GeneratorConfig } from '../../types/generator';

export const aireplayNgGenerator: GeneratorConfig = {
  id: 'aireplay-ng',
  name: 'Aireplay-ng',
  description: 'Packet injection tool for aircrack-ng.',
  categoryId: 'wireless-attacks',
  exampleUsage: 'aireplay-ng --deauth 10 -a 00:11:22:33:44:55 wlan0mon',
  explanation: 'Aireplay-ng is used to inject frames. Its main function is to generate traffic for the later use in aircrack-ng for cracking the WEP and WPA-PSK keys.',
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
      id: 'attackType',
      label: 'Attack Type',
      type: 'select',
      options: [
        { label: 'Deauthentication (--deauth)', value: '--deauth' },
        { label: 'Fake Authentication (--fakeauth)', value: '--fakeauth' },
        { label: 'ARP Request Replay (--arpreplay)', value: '--arpreplay' }
      ],
      defaultValue: '--deauth'
    },
    {
      id: 'count',
      label: 'Count',
      type: 'number',
      defaultValue: 10,
      description: 'Number of packets to send'
    },
    {
      id: 'bssid',
      label: 'Target BSSID (-a)',
      type: 'text',
      placeholder: 'e.g. 00:11:22:33:44:55',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['aireplay-ng'];
    if (values.attackType) parts.push(values.attackType);
    if (values.bssid) parts.push(`-a ${values.bssid}`);
    if (values.client) parts.push(`-c ${values.client}`);
    if (values.interface) parts.push(values.interface);
    return parts.join(' ');
  },
  seo: {
    title: 'Aireplay-ng Command Generator - Wireless Injection Tool',
    description: 'Generate Aireplay-ng commands for wireless frame injection. perform deauthentication attacks, fake authentication, and more.',
    keywords: ['aireplay-ng generator', 'wireless injection', 'deauth attack', 'aireplay syntax', 'wifi security testing']
  },
  additionalContent: [
    {
      title: 'Wireless Injection',
      content: `Aireplay-ng is used to inject frames into a wireless network. Its primary function is to generate traffic for the later use in aircrack-ng for cracking the WEP and WPA-PSK keys.`
    }
  ]
};
