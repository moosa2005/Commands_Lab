import type { GeneratorConfig } from '../../types/generator';

export const aircrackNgGenerator: GeneratorConfig = {
  id: 'aircrack-ng',
  name: 'Aircrack-ng',
  description: 'WiFi security auditing tool suite.',
  categoryId: 'wireless-attacks',
  exampleUsage: 'aircrack-ng -w wordlist.txt capture.cap',
  explanation: 'Aircrack-ng is a complete suite of tools to assess WiFi network security. It focuses on different areas of WiFi security: monitoring, attacking, testing and cracking.',
  fields: [
    {
      id: 'captureFile',
      label: 'Capture File (.cap)',
      type: 'text',
      placeholder: 'e.g. capture-01.cap',
      required: true,
      defaultValue: ''
    },
    {
      id: 'wordlist',
      label: 'Wordlist',
      type: 'text',
      placeholder: 'e.g. rockyou.txt',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['aircrack-ng'];
    if (values.captureFile) parts.push(String(values.captureFile));
    if (values.wordlist) parts.push(`-w ${String(values.wordlist)}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Aircrack-ng Command Generator - Wireless WEP/WPA Passphrase Cracker',
    description: 'Create Aircrack-ng commands to crack wireless passwords from captured packet files. supports WEP and WPA/WPA2-PSK security.',
    keywords: ['aircrack-ng generator', 'wifi cracking', 'wireless security', 'crack wpa password', 'aircrack syntax']
  },
  additionalContent: [
    {
      title: 'WiFi Security Auditing',
      content: `Aircrack-ng is a complete suite of tools to assess WiFi network security. It focuses on different areas of WiFi security: Monitoring, Attacking, Testing, and Cracking.`
    }
  ]
};
