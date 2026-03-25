import type { GeneratorConfig } from '../../types/generator';

export const hashcatGenerator: GeneratorConfig = {
  id: 'hashcat',
  name: 'Hashcat',
  description: 'World\'s fastest and most advanced password recovery utility.',
  categoryId: 'password-attacks',
  exampleUsage: 'hashcat -m 0 -a 0 hashes.txt rockyou.txt',
  explanation: 'Hashcat is an advanced password recovery utility, supporting five unique modes of attack for over 300 highly-optimized hashing algorithms.',
  fields: [
    {
      id: 'attackMode',
      label: 'Attack Mode (-a)',
      type: 'select',
      options: [
        { label: 'Straight (Dictionary)', value: '0' },
        { label: 'Combination', value: '1' },
        { label: 'Brute-force / Mask', value: '3' },
        { label: 'Hybrid Wordlist + Mask', value: '6' },
        { label: 'Hybrid Mask + Wordlist', value: '7' }
      ],
      defaultValue: '0'
    },
    {
      id: 'hashType',
      label: 'Hash Type (-m)',
      type: 'select',
      options: [
        { label: 'MD5', value: '0' },
        { label: 'SHA1', value: '100' },
        { label: 'NTLM', value: '1000' },
        { label: 'SHA256', value: '1400' },
        { label: 'bcrypt', value: '3200' },
        { label: 'WPA/WPA2', value: '22000' }
      ],
      defaultValue: '0'
    },
    {
      id: 'hashFile',
      label: 'Hash File',
      type: 'text',
      placeholder: 'hashes.txt',
      required: true,
      defaultValue: '',
      description: 'Path to the file containing the hashes.'
    },
    {
      id: 'wordlist',
      label: 'Wordlist / Mask',
      type: 'text',
      placeholder: '/usr/share/wordlists/rockyou.txt or ?a?a?a?a',
      required: true,
      defaultValue: '',
      description: 'Path to wordlist for dictionary attacks or mask pattern for brute-force.'
    },
    {
      id: 'force',
      label: 'Force OpenCL',
      type: 'checkbox',
      defaultValue: true,
      description: 'Ignore warnings (--force)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['hashcat'];
    if (values.hashType) parts.push(`-m ${values.hashType}`);
    if (values.attackMode) parts.push(`-a ${values.attackMode}`);
    if (values.hashFile) parts.push(values.hashFile);
    if (values.wordlist) parts.push(values.wordlist);
    return parts.join(' ');
  },
  seo: {
    title: 'Hashcat Command Generator - Worlds Fastest Password Cracker',
    description: 'Generate Hashcat commands for high-performance password cracking. Supports thousands of hash types and advanced attack modes.',
    keywords: ['hashcat generator', 'password cracking', 'gpu cracking', 'hashcat syntax', 'crack hashes tool']
  },
  additionalContent: [
    {
      title: 'Attack Modes',
      content: `Mode 0 (Straight) uses a wordlist directly. Mode 3 (Brute-force) tests all combinations based on a mask. hashcat supports many more complex modes like hybrid and rules-based attacks.`
    }
  ]
};
