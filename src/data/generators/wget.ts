import type { GeneratorConfig } from '../../types/generator';

export const wgetGenerator: GeneratorConfig = {
  id: 'wget',
  name: 'Wget',
  description: 'Non-interactive network downloader.',
  categoryId: 'utilities',
  exampleUsage: 'wget -O file.zip http://target.com/file.zip',
  explanation: 'GNU Wget is a free software package for retrieving content from web servers. It is part of the GNU Project.',
  fields: [
    {
      id: 'url',
      label: 'URL',
      type: 'text',
      placeholder: 'e.g. http://example.com/file.zip',
      required: true,
      defaultValue: ''
    },
    {
      id: 'output',
      label: 'Output File',
      type: 'text',
      placeholder: 'e.g. filename.zip',
      defaultValue: '',
      description: 'The filename to save as (-O)'
    },
    {
      id: 'background',
      label: 'Background',
      type: 'checkbox',
      defaultValue: false,
      description: 'Run in background (-b)'
    },
    {
      id: 'recursive',
      label: 'Recursive',
      type: 'checkbox',
      defaultValue: false,
      description: 'Turn on recursive retrieving (-r)'
    },
    {
      id: 'noParent',
      label: 'No Parent',
      type: 'checkbox',
      defaultValue: false,
      description: 'Do not ascend to the parent directory (-np)'
    }
  ],
  generateCommand: (values: any) => {
    const parts = ['wget'];
    if (values.recursive) parts.push('-r');
    if (values.noParent) parts.push('-np');
    if (values.output) parts.push(`-O ${values.output}`);
    if (values.background) parts.push('-b');
    if (values.url) parts.push(values.url);
    return parts.join(' ');
  },
  seo: {
    title: 'Wget Command Generator - Non-interactive Network Downloader',
    description: 'Generate Wget commands for retrieving content from web servers. supports recursive downloads, background execution, and complex mirroring.',
    keywords: ['wget generator', 'downloader cli', 'website mirroring', 'wget syntax', 'file retrieval tool']
  },
  additionalContent: [
    {
      title: 'Robust Downloading',
      content: `GNU Wget is a free software package for retrieving files using HTTP, HTTPS, FTP and FTPS, the most widely used Internet protocols. It is a non-interactive commandline tool, so it may easily be called from scripts and cron jobs.`
    }
  ]
};
