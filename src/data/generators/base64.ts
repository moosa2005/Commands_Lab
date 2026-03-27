import type { GeneratorConfig } from '../../types/generator';

export const base64Generator: GeneratorConfig = {
  id: 'base64',
  name: 'Base64 Encode/Decode',
  description: 'Quickly generate base64 encoding or decoding commands.',
  categoryId: 'utilities',
  exampleUsage: 'echo "string" | base64',
  explanation: 'Base64 is a binary-to-text encoding scheme. Using the base64 command line tool allows for quick encoding and decoding operations.',
  fields: [
    {
      id: 'operation',
      label: 'Operation',
      type: 'select',
      options: [
        { label: 'Encode String', value: 'encode' },
        { label: 'Decode String', value: 'decode' },
        { label: 'Encode File', value: 'encodeFiles' },
        { label: 'Decode to File', value: 'decodeFile' }
      ],
      defaultValue: 'encode'
    },
    {
      id: 'input',
      label: 'Input (String or Filename)',
      type: 'text',
      placeholder: 'Text to encode/decode, or filename.txt',
      required: true,
      defaultValue: ''
    },
    {
      id: 'output',
      label: 'Output File (Optional)',
      type: 'text',
      placeholder: 'output.txt',
      defaultValue: '',
      description: 'Save output to this filename.'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const input = values.input || '<input>';
    let cmd = '';
    
    switch (values.operation) {
      case 'encode':
        cmd = `echo -n "${input}" | base64`;
        break;
      case 'decode':
        cmd = `echo -n "${input}" | base64 -d`;
        break;
      case 'encodeFiles':
        cmd = `base64 "${input}"`;
        break;
      case 'decodeFile':
        cmd = `base64 -d "${input}"`;
        break;
      default:
        cmd = `echo -n "${input}" | base64`;
    }
    
    if (values.output) {
      cmd += ` > ${values.output}`;
    }
    
    return cmd;
  }
};
