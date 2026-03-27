import type { GeneratorConfig } from '../../types/generator';

export const johnGenerator: GeneratorConfig = {
  id: 'john-the-ripper',
  name: 'John the Ripper',
  description: 'Fast password cracker, currently available for many flavors of Unix.',
  categoryId: 'password-attacks',
  exampleUsage: 'john --wordlist=rockyou.txt --format=NT hashes.txt',
  explanation: 'John the Ripper is a fast password cracker. Its primary purpose is to detect weak Unix passwords. Besides several crypt(3) password hash types most commonly found on various Unix systems, supported out of the box are Windows LM hashes, plus lots of other hashes and ciphers in the community-enhanced version.',
  fields: [
    {
      id: 'hashFile',
      label: 'Hash File',
      type: 'text',
      placeholder: 'hashes.txt',
      required: true,
      defaultValue: '',
      description: 'Path to the file containing the hashes to crack.'
    },
    {
      id: 'wordlist',
      label: 'Wordlist',
      type: 'text',
      placeholder: '/usr/share/wordlists/rockyou.txt',
      defaultValue: '',
      description: 'Path to the wordlist file (--wordlist).'
    },
    {
      id: 'format',
      label: 'Format',
      type: 'text',
      placeholder: 'e.g. NT, raw-md5, descrypt',
      defaultValue: '',
      description: 'Force a specific hash format (--format).'
    },
    {
      id: 'show',
      label: 'Show Cracked',
      type: 'checkbox',
      defaultValue: false,
      description: 'Show cracked passwords only (--show)'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const parts = ['john'];
    
    if (values.show) {
      parts.push('--show');
      if (values.format) parts.push(`--format=${values.format}`);
      if (values.hashFile) parts.push(String(values.hashFile));
      return parts.join(' ');
    }
    
    if (values.wordlist) parts.push(`--wordlist=${values.wordlist}`);
    if (values.format) parts.push(`--format=${values.format}`);
    if (values.hashFile) parts.push(String(values.hashFile));
    
    return parts.join(' ');
  }
};
