import type { GeneratorConfig } from '../../types/generator';

export const wordlistGenerator: GeneratorConfig = {
  id: 'wordlist',
  name: 'Wordlist Generator (Crunch)',
  description: 'Generate custom wordlists for brute force attacks using Crunch. Create targeted password lists with specific character sets, patterns, and length ranges.',
  categoryId: 'wordlist-generation',
  exampleUsage: 'crunch 8 12 abcdefghijklmnopqrstuvwxyz0123456789 -o wordlist.txt',
  explanation: 'Crunch is a Kali Linux wordlist generator that creates custom wordlists based on criteria you specify. You can define the minimum and maximum length, character sets, specific patterns, and output files. Crunch is essential for targeted brute force attacks when you have partial knowledge of a password\'s format, such as knowing it starts with certain characters or follows a specific pattern like a date or phone number.',
  fields: [
    {
      id: 'minLength',
      label: 'Minimum Length',
      type: 'number',
      placeholder: '6',
      required: true,
      defaultValue: 6,
      description: 'Minimum number of characters in each word.'
    },
    {
      id: 'maxLength',
      label: 'Maximum Length',
      type: 'number',
      placeholder: '8',
      required: true,
      defaultValue: 8,
      description: 'Maximum number of characters in each word.'
    },
    {
      id: 'charset',
      label: 'Character Set',
      type: 'select',
      options: [
        { label: 'Lowercase (abc...z)', value: 'abcdefghijklmnopqrstuvwxyz' },
        { label: 'Uppercase (ABC...Z)', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { label: 'Numbers (0-9)', value: '0123456789' },
        { label: 'Lowercase + Numbers', value: 'abcdefghijklmnopqrstuvwxyz0123456789' },
        { label: 'Uppercase + Numbers', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
        { label: 'All Letters', value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { label: 'All Letters + Numbers', value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
        { label: 'All + Special (!@#$%)', value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*' },
        { label: 'Custom (type below)', value: 'custom' }
      ],
      defaultValue: 'abcdefghijklmnopqrstuvwxyz0123456789',
      description: 'Characters to use when generating the wordlist.'
    },
    {
      id: 'customCharset',
      label: 'Custom Characters',
      type: 'text',
      placeholder: 'abc123!@#',
      defaultValue: '',
      description: 'Only used if "Custom" is selected above. Enter your own character set.'
    },
    {
      id: 'pattern',
      label: 'Pattern (-t)',
      type: 'text',
      placeholder: '@@@@%%##',
      defaultValue: '',
      description: 'Use pattern: @ = lowercase, , = uppercase, % = number, ^ = special char. Example: @@@@%%## generates 4 lowercase + 2 numbers + 2 numbers.'
    },
    {
      id: 'outputFile',
      label: 'Output File (-o)',
      type: 'text',
      placeholder: 'wordlist.txt',
      defaultValue: 'wordlist.txt',
      description: 'File path to save the generated wordlist.'
    },
    {
      id: 'startString',
      label: 'Start String (-s)',
      type: 'text',
      placeholder: 'aaa',
      defaultValue: '',
      description: 'Resume or start generating from a specific string.'
    },
    {
      id: 'maxSize',
      label: 'Max File Size (-b)',
      type: 'text',
      placeholder: '10mb',
      defaultValue: '',
      description: 'Split output into files of this size (e.g., 10mb, 1gb). Used with -o START.'
    },
    {
      id: 'compress',
      label: 'Compress Output (-z)',
      type: 'select',
      options: [
        { label: 'No Compression', value: '' },
        { label: 'gzip', value: 'gzip' },
        { label: 'bzip2', value: 'bzip2' },
        { label: 'lzma', value: 'lzma' }
      ],
      defaultValue: '',
      description: 'Compress the output wordlist file.'
    },
    {
      id: 'invert',
      label: 'Invert Output (-i)',
      type: 'checkbox',
      defaultValue: false,
      description: 'Reverse the order of characters in each generated word.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['crunch'];

    // Min and Max length
    parts.push(String(values.minLength || '6'));
    parts.push(String(values.maxLength || '8'));

    // Character set (if no pattern is used)
    if (!values.pattern) {
      const charset = values.charset === 'custom' ? (values.customCharset || '') : (values.charset || '');
      if (charset) parts.push(String(charset));
    }

    // Pattern
    if (values.pattern) {
      parts.push(`-t ${values.pattern}`);
    }

    // Output file
    if (values.outputFile) {
      parts.push(`-o ${values.outputFile}`);
    }

    // Start string
    if (values.startString) {
      parts.push(`-s ${values.startString}`);
    }

    // Max file size
    if (values.maxSize) {
      parts.push(`-b ${values.maxSize}`);
    }

    // Compression
    if (values.compress) {
      parts.push(`-z ${values.compress}`);
    }

    // Invert
    if (values.invert) {
      parts.push('-i');
    }

    return parts.join(' ');
  }
};
