import type { GeneratorConfig } from '../../types/generator';

export const curlGenerator: GeneratorConfig = {
  id: 'curl',
  name: 'cURL Request Generator',
  description: 'Generate advanced cURL commands for API testing or web requests.',
  categoryId: 'utilities',
  exampleUsage: 'curl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' http://example.com',
  explanation: 'cURL is a command-line tool for transferring data specified with URL syntax. It supports various protocols like HTTP, HTTPS, FTP, etc.',
  fields: [
    {
      id: 'method',
      label: 'HTTP Method (-X)',
      type: 'select',
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'OPTIONS', value: 'OPTIONS' }
      ],
      defaultValue: 'GET'
    },
    {
      id: 'url',
      label: 'Target URL',
      type: 'text',
      placeholder: 'http://example.com/api/test',
      required: true,
      defaultValue: ''
    },
    {
      id: 'headers',
      label: 'Custom Headers',
      type: 'text',
      placeholder: 'Authorization: Bearer token123',
      defaultValue: '',
      description: 'Multiple headers should be separated by commas (e.g. Header1: Val1, Header2: Val2).'
    },
    {
      id: 'data',
      label: 'Data / Body (-d)',
      type: 'text',
      placeholder: '{"key":"value"}',
      defaultValue: '',
      description: 'Data to send with POST/PUT requests.'
    },
    {
      id: 'verbose',
      label: 'Verbose Mode',
      type: 'checkbox',
      defaultValue: false,
      description: 'Make the operation more talkative (-v).'
    },
    {
      id: 'includeHeaders',
      label: 'Include Response Headers',
      type: 'checkbox',
      defaultValue: false,
      description: 'Include the HTTP-header in the output (-i).'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['curl'];
    
    if (values.verbose) parts.push('-v');
    if (values.includeHeaders) parts.push('-i');
    
    if (values.method && values.method !== 'GET') {
      parts.push(`-X ${values.method}`);
    }
    
    if (values.headers) {
      const headersArr = String(values.headers).split(',').map((h: string) => h.trim());
      headersArr.forEach((h: string) => {
        parts.push(`-H "${h}"`);
      });
    }
    
    if (values.data) {
      parts.push(`-d '${values.data}'`);
    }
    
    if (values.url) parts.push(`"${values.url}"`);
    
    return parts.join(' ');
  }
};
