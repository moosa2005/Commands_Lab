import type { GeneratorConfig } from '../../types/generator';

export const bashGenerator: GeneratorConfig = {
  id: 'bash-oneliner',
  name: 'Bash One-Liner Tools',
  description: 'Generate useful bash one-liners for quick system tasks.',
  categoryId: 'utilities',
  exampleUsage: 'find . -type f -name "*.txt" -exec rm {} \\;',
  explanation: 'Bash one-liners combine multiple commands or utility features into a single robust line of code for rapid administration and hacking.',
  fields: [
    {
      id: 'task',
      label: 'Task Type',
      type: 'select',
      options: [
        { label: 'Find & Delete Files', value: 'find-delete' },
        { label: 'Find & Execute', value: 'find-exec' },
        { label: 'Extract Strings', value: 'strings' },
        { label: 'HTTP Server', value: 'http-server' }
      ],
      defaultValue: 'find-delete'
    },
    {
      id: 'target',
      label: 'Target / Argument',
      type: 'text',
      placeholder: '*.txt or 8080',
      required: true,
      defaultValue: ''
    }
  ],
  generateCommand: (values: any) => {
    const target = values.target || '<target>';
    
    switch (values.task) {
      case 'find-delete':
        return `find . -type f -name "${target}" -exec rm -f {} \\;`;
      case 'find-exec':
        return `find . -type f -name "${target}" -exec cat {} \\;`;
      case 'strings':
        return `strings "${target}" | grep -i password`;
      case 'http-server':
        return `python3 -m http.server ${target}`;
      default:
        return `echo "Select a task strategy"`;
    }
  }
};
