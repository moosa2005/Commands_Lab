import type { GeneratorConfig } from '../../types/generator';

export const assetfinderGenerator: GeneratorConfig = {
  id: 'assetfinder',
  name: 'Assetfinder',
  description: 'Find domains and subdomains related to a given domain.',
  categoryId: 'network-scanning',
  exampleUsage: 'assetfinder --subs-only target.com',
  explanation: 'Assetfinder is a simple tool to find domains and subdomains related to a given domain by searching various sources like crt.sh, hackertarget, etc.',
  fields: [
    {
      id: 'domain',
      label: 'Domain',
      type: 'text',
      placeholder: 'e.g. target.com',
      required: true,
      defaultValue: ''
    },
    {
      id: 'subsOnly',
      label: 'Subdomains Only',
      type: 'checkbox',
      defaultValue: true,
      description: 'Only search for subdomains (--subs-only)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['assetfinder'];
    if (values.subsOnly) parts.push('--subs-only');
    if (values.domain) parts.push(values.domain);
    return parts.join(' ');
  },
  seo: {
    title: 'Assetfinder Command Generator - Related Domain Discovery',
    description: 'Generate Assetfinder commands to find subdomains and related assets for any target domain. simple, fast, and effective for initial recon.',
    keywords: ['assetfinder generator', 'reconnaissance', 'find subdomains', 'tomnomnom tools', 'linux recon']
  },
  additionalContent: [
    {
      title: 'About Assetfinder',
      content: `Assetfinder searches various sources like crt.sh, hackertarget, and virusTotal to find domains and subdomains associated with your target. It's a staple in any bug hunter's toolkit.`
    }
  ]
};
