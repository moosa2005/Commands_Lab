import type { GeneratorConfig } from '../../types/generator';

export const wpscanGenerator: GeneratorConfig = {
  id: 'wpscan',
  name: 'WPScan',
  description: 'WordPress security scanner to find vulnerabilities and misconfigurations.',
  categoryId: 'web-testing',
  exampleUsage: 'wpscan --url http://example.com --enumerate vp,vt',
  explanation: 'WPScan is a free, for non-commercial use, black box WordPress security scanner written for security professionals and blog maintainers to test the security of their sites.',
  fields: [
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'http://example.com',
      required: true,
      defaultValue: '',
      description: 'The URL of the WordPress site to scan.'
    },
    {
      id: 'enumerate',
      label: 'Enumerate',
      type: 'select',
      options: [
        { label: 'Vulnerable Plugins (vp)', value: 'vp' },
        { label: 'Vulnerable Themes (vt)', value: 'vt' },
        { label: 'All Users (u)', value: 'u' },
        { label: 'Everything', value: 'vp,vt,u' }
      ],
      defaultValue: 'vp,vt'
    },
    {
      id: 'apiToken',
      label: 'WPVulnDB API Token (Optional)',
      type: 'text',
      placeholder: 'Your API Token',
      defaultValue: '',
      description: 'Required for vulnerability database lookups.'
    },
    {
      id: 'stealth',
      label: 'Stealth Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Aggressive vs. Stealthy scanning templates.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['wpscan', '--url', `"${values.url || 'http://target.com'}"`];
    if (values.enumerate) parts.push('--enumerate', String(values.enumerate));
    if (values.apiToken) parts.push('--api-token', String(values.apiToken));
    if (values.stealth) parts.push('--stealthy');
    return parts.join(' ');
  },
  seo: {
    title: 'WPScan Command Generator - WordPress Security Scanner Builder',
    description: 'Easily generate WPScan commands. Find vulnerable WordPress plugins, themes, and users. Automated security auditing for WP sites.',
    keywords: ['wpscan generator', 'wordpress scanner', 'enumerate wordpress users', 'find vulnerable plugins', 'wpscan syntax']
  }
};
