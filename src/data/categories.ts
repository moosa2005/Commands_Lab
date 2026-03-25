import type { Category } from '../types/generator';

export const categories: Category[] = [
  {
    id: 'network-scanning',
    name: 'Network Scanning',
    description: 'Discover hosts, open ports, and services on a network.',
    iconName: 'Network'
  },
  {
    id: 'web-testing',
    name: 'Web Testing',
    description: 'Tools for vulnerability scanning, directory busting, and more.',
    iconName: 'Globe'
  },
  {
    id: 'password-attacks',
    name: 'Password Attacks',
    description: 'Online and offline password cracking tools.',
    iconName: 'Key'
  },
  {
    id: 'exploitation',
    name: 'Exploitation',
    description: 'Payload generation, reverse shells, and exploit frameworks.',
    iconName: 'TerminalSquare'
  },
  {
    id: 'utilities',
    name: 'Utilities',
    description: 'General purpose tools like Curl, encoding, and baselining.',
    iconName: 'Wrench'
  },
  {
    id: 'wordlist-generation',
    name: 'Wordlist Generation',
    description: 'Create custom wordlists and dictionaries for brute force and password attacks.',
    iconName: 'BookText'
  },
  {
    id: 'osint',
    name: 'OSINT',
    description: 'Open-source intelligence tools for reconnaissance and information gathering.',
    iconName: 'Search'
  },
  {
    id: 'wireless-attacks',
    name: 'Wireless Attacks',
    description: 'Tools for auditing and attacking WiFi networks and wireless protocols.',
    iconName: 'Wifi'
  },
  {
    id: 'networking-sniffing',
    name: 'Networking & Sniffing',
    description: 'Analyze network traffic, capture packets, and perform MITM attacks.',
    iconName: 'Activity'
  }
];
