import type { GeneratorConfig } from '../../types/generator';

export const pythonHttpGenerator: GeneratorConfig = {
  id: 'python-http',
  name: 'Python HTTP Server',
  description: 'Simple HTTP server command using Python.',
  categoryId: 'utilities',
  exampleUsage: 'python3 -m http.server 8080',
  explanation: 'The http.server module is a simple HTTP server that can be used to serve files from a directory.',
  fields: [
    {
      id: 'port',
      label: 'Port',
      type: 'number',
      defaultValue: 8080
    },
    {
      id: 'directory',
      label: 'Directory',
      type: 'text',
      placeholder: 'e.g. /home/user/files',
      defaultValue: '.',
      description: 'The directory to serve (-d)'
    }
  ],
  generateCommand: (values: any) => {
    const version = values.pythonVersion || '3';
    const port = values.port || 8080;
    const directory = values.directory;

    if (version === '3') {
      const parts = [`python3 -m http.server ${port}`];
      if (directory && directory !== '.') {
        parts.push(`-d ${directory}`);
      }
      return parts.join(' ');
    } else {
      const parts = [`python -m SimpleHTTPServer ${port}`];
      // Python 2 SimpleHTTPServer does not have a -d option
      // It always serves from the current working directory.
      // If a directory is specified, the user should cd into it first.
      // We'll just ignore the directory field for Python 2 for simplicity in the command.
      return parts.join(' ');
    }
  },
  seo: {
    title: 'Python HTTP Server Command Generator - Quick Web Server',
    description: 'Generate one-liner commands to start a simple HTTP server using Python. Perfect for quick file sharing and local development.',
    keywords: ['python http server', 'simplehttpserver command', 'python web server one-liner', 'share files python', 'local dev server']
  },
  additionalContent: [
    {
      title: 'Quick File Sharing',
      content: `Python's built-in HTTP server is the fastest way to share files over a local network. Just run the command in the directory you want to serve, and it will be accessible at http://[your-ip]:[port].`
    }
  ]
};
