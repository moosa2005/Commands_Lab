import type { GeneratorConfig } from '../../types/generator';

export const nmapGenerator: GeneratorConfig = {
  id: 'nmap',
  name: 'Nmap Scanner',
  description: 'Generate Nmap commands for network discovery and security auditing.',
  categoryId: 'network-scanning',
  exampleUsage: 'nmap -sV -p 1-65535 -T4 target.com',
  explanation: 'Nmap is a free and open-source utility for network discovery and security auditing. It uses raw IP packets in novel ways to determine what hosts are available on the network, what services they are offering, what operating systems they are running, and more.',
  fields: [
    {
      id: 'target',
      label: 'Target',
      type: 'text',
      placeholder: 'e.g. 192.168.1.1, example.com, 10.0.0.0/24',
      required: true,
      defaultValue: '',
      description: 'The IP, range, or hostname to scan.'
    },
    {
      id: 'scanType',
      label: 'Scan Type',
      type: 'select',
      options: [
        { label: 'TCP SYN Scan (Default/Stealth)', value: '-sS' },
        { label: 'TCP Connect Scan', value: '-sT' },
        { label: 'UDP Scan', value: '-sU' },
        { label: 'Ping Scan (Host Discovery)', value: '-sn' }
      ],
      defaultValue: '-sS'
    },
    {
      id: 'ports',
      label: 'Ports to Scan',
      type: 'text',
      placeholder: 'e.g. 80,443 or 1-65535',
      defaultValue: '',
      description: 'Leave blank to scan top 1000 ports.'
    },
    {
      id: 'serviceVersions',
      label: 'Detect Service/Version',
      type: 'checkbox',
      defaultValue: false,
      description: 'Probe open ports to determine service/version info (-sV)'
    },
    {
      id: 'osDetection',
      label: 'OS Detection',
      type: 'checkbox',
      defaultValue: false,
      description: 'Enable OS detection (-O)'
    },
    {
      id: 'timing',
      label: 'Timing Template',
      type: 'select',
      options: [
        { label: 'T2 (Polite)', value: '-T2' },
        { label: 'T3 (Normal)', value: '-T3' },
        { label: 'T4 (Aggressive)', value: '-T4' },
        { label: 'T5 (Insane)', value: '-T5' }
      ],
      defaultValue: '-T4'
    },
    {
      id: 'scripts',
      label: 'Nmap Scripts',
      type: 'select',
      options: [
        { label: 'None', value: '' },
        { label: 'Default Scripts (-sC)', value: '-sC' },
        { label: 'Vulnerability Scripts', value: '--script vuln' },
        { label: 'Safe Scripts', value: '--script safe' }
      ],
      defaultValue: ''
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['nmap'];
    
    if (values.scanType) parts.push(String(values.scanType));
    if (values.ports) parts.push(`-p ${values.ports}`);
    if (values.serviceVersions) parts.push('-sV');
    if (values.osDetection) parts.push('-O');
    if (values.timing) parts.push(String(values.timing));
    if (values.scripts) parts.push(String(values.scripts));
    
    parts.push(String(values.target || '<target>'));
    
    return parts.join(' ');
  },
  seo: {
    title: 'Nmap Command Generator - Network Scanner & Security Auditor',
    description: 'Create custom Nmap commands for host discovery, port scanning, and OS detection. The most advanced online Nmap GUI/CLI generator.',
    keywords: ['nmap command generator', 'nmap port scan', 'nmap host discovery', 'nmap script engine', 'nmap vulnerability scan', 'network mapper']
  },
  additionalContent: [
    {
      title: 'Common Nmap Scan Types',
      content: 'Nmap supports several scan techniques. The TCP SYN scan (-sS) is the most popular because it is fast and relatively unobtrusive. If SYN scanning is not possible (due to user privileges), Nmap defaults to the TCP Connect scan (-sT).'
    },
    {
      title: 'Using Nmap Scripting Engine (NSE)',
      content: 'The Nmap Scripting Engine (NSE) allows you to automate a wide variety of networking tasks including vulnerability detection and advanced discovery. Use --script followed by the script name or category (e.g., vuln, default, discovery).'
    }
  ]
};
