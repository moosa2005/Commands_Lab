import type { GeneratorConfig } from '../../types/generator';

export const airodumpNgGenerator: GeneratorConfig = {
  id: 'airodump-ng',
  name: 'Airodump-ng',
  description: 'Packet capture tool for aircrack-ng.',
  categoryId: 'wireless-attacks',
  exampleUsage: 'airodump-ng --bssid 00:11:22:33:44:55 -c 6 -w capture eth0',
  explanation: 'Airodump-ng is used for packet capturing of raw 802.11 frames and is particularly suitable for collecting WEP IVs or WPA handshakes.',
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
      defaultValue: ''
    },
    {
      id: 'channel',
      label: 'Channel',
      type: 'number',
      defaultValue: 6
    },
    {
      id: 'write',
      label: 'Write Prefix',
      type: 'text',
      placeholder: 'capture',
      defaultValue: 'capture',
      description: 'Prefix for capture files (-w)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['airodump-ng'];
    if (values.interface) parts.push(String(values.interface));
    if (values.channel) parts.push(`-c ${values.channel}`);
    if (values.bssid) parts.push(`--bssid ${values.bssid}`);
    if (values.write) parts.push(`-w ${values.write}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Airodump-ng Command Generator - Wireless Packet Capture',
    description: 'Generate Airodump-ng commands for 802.11 packet capture and wireless network discovery. identify APs and clients in range.',
    keywords: ['airodump-ng generator', 'wifi sniffing', 'wireless packet capture', 'airodump syntax', 'wifi network discovery']
  },
  additionalContent: [
    {
      title: 'Packet Capturing',
      content: `Airodump-ng is used for packet capturing of raw 802.11 frames and is particularly suitable for collecting WEP IVs (Initialization Vectors) or WPA handshakes for the intent of using them with aircrack-ng.`
    }
  ]
};
