import type { GeneratorConfig } from '../../types/generator';

export const routersploitGenerator: GeneratorConfig = {
  id: 'routersploit',
  name: 'RouterSploit',
  description: 'Exploitation Framework for Embedded Devices.',
  categoryId: 'exploitation',
  exampleUsage: 'rsf.py; use scanners/autopwn; set target 192.168.1.1; run',
  explanation: 'The RouterSploit Framework is an open-source exploitation framework dedicated to embedded devices.',
  fields: [
    {
      id: 'target',
      label: 'Target IP',
      type: 'text',
      placeholder: 'e.g. 192.168.1.1',
      required: true,
      defaultValue: ''
    },
    {
      id: 'module',
      label: 'Module',
      type: 'select',
      options: [
        { label: 'Autopwn Scanner', value: 'scanners/autopwn' },
        { label: 'D-Link Exploit', value: 'exploits/routers/dlink/dir_300_600_rce' },
        { label: 'TP-Link Exploit', value: 'exploits/routers/tplink/wdr740nd_wdr740n_path_traversal' }
      ],
      defaultValue: 'scanners/autopwn'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['rsf.py'];
    if (values.module) parts.push(`-m ${values.module}`);
    if (values.target) parts.push(`-t ${values.target}`);
    return parts.join(' ');
  },
  seo: {
    title: 'RouterSploit Command Generator - Embedded Device Exploitation',
    description: 'Create RouterSploit commands to test and exploit vulnerabilities in routers and embedded devices. The Metasploit for IoT.',
    keywords: ['routersploit generator', 'embedded device hacking', 'router exploitation', 'iot security', 'routersploit syntax']
  },
  additionalContent: [
    {
      title: 'About RouterSploit',
      content: `The RouterSploit Framework is an open-source exploitation framework dedicated to embedded devices. It includes modules for exploitation, scanning, and payload delivery specifically for routers and IoT devices.`
    }
  ]
};
